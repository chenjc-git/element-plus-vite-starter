import basicInstanced from './shaders/basic.instanced.vert.wgsl?raw'
import positionFrag from './shaders/position.frag.wgsl?raw'
import * as cube from './util/cube'
import { getMvpMatrix } from './util/math'
import positionVert from './shaders/position.vert.wgsl?raw'
import colorFrag from './shaders/color.frag.wgsl?raw'
import * as triangle from './util/triangle'
import { mat4, vec3 } from '~/tools/gl-matrix'
import textureUrl from '../assets/aircraft.png?url'
// import textureUrl from '/texture.webp?url'
let aid:number
let N = 360*30
// initialize webgpu device & config canvas context
async function initWebGPU(canvas: HTMLCanvasElement) {
    if(!navigator.gpu)
        throw new Error('Not Support WebGPU')
    const adapter = await navigator.gpu.requestAdapter()
    if (!adapter)
        throw new Error('No Adapter Found')
    const device = await adapter.requestDevice()
    const context = canvas.getContext('webgpu') as GPUCanvasContext
    const format = navigator.gpu.getPreferredCanvasFormat()
    const devicePixelRatio = window.devicePixelRatio || 1
    canvas.width = canvas.clientWidth * devicePixelRatio
    canvas.height = canvas.clientHeight * devicePixelRatio
    const size = {width: canvas.width, height: canvas.height}
    context.configure({
        device, format,
        // prevent chrome warning after v102
        alphaMode: 'premultiplied'
    })
    return {device, context, format, size}
}

// create pipiline & buffers
async function initPipeline(device: GPUDevice, format: GPUTextureFormat, size:{width:number, height:number}) {

    const trianglePipeline = await device.createRenderPipelineAsync({
        label: 'Basic Pipline',
        layout: 'auto',
        vertex: {
            module: device.createShaderModule({
                code: positionVert,
            }),
            entryPoint: 'main',
            buffers: [{
                arrayStride: 7 * 4, // 7 float32,
                attributes: [
                    {
                        // position xyz
                        shaderLocation: 0,
                        offset: 0,
                        format: 'float32x3',
                    },
                    {
                        // position rgba
                        shaderLocation: 1,
                        offset: 3 * 4,
                        format: 'float32x4',
                    }
                ]
            }]
        },
        fragment: {
            module: device.createShaderModule({
                code: colorFrag,
            }),
            entryPoint: 'main',
            targets: [
                {
                    format: format,
                    // blend: {
                    //     color: {
                    //         srcFactor: 'src-alpha',
                    //         dstFactor: 'one-minus-src-alpha',
                    //         operation: 'add',
                    //     },
                    //     alpha: {
                    //         srcFactor: 'src-alpha',
                    //         dstFactor: 'one-minus-src-alpha',
                    //         operation: 'add',
                    //     }
                    // }
                }
            ]
        },
        primitive: {
            topology: 'triangle-strip' // try point-list, line-list, line-strip, triangle-strip?
        },
        depthStencil: {
            depthWriteEnabled: false,
            depthCompare: 'less',
            format: 'depth24plus',
        }
    } as GPURenderPipelineDescriptor)
    // create vertex buffer
    const triangleBuffer = device.createBuffer({
        label: 'GPUBuffer store vertex',
        size: triangle.vertex.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        //mappedAtCreation: true
    })
    device.queue.writeBuffer(triangleBuffer, 0, triangle.vertex)

    const pipeline = await device.createRenderPipelineAsync({
        label: 'Basic Pipline',
        layout: 'auto',
        vertex: {
            module: device.createShaderModule({
                code: basicInstanced,
            }),
            entryPoint: 'main',
            buffers: [
                {
                    arrayStride: 5 * 4, // 3 position 2 uv,
                    attributes: [
                        {
                            // position
                            shaderLocation: 0,
                            offset: 0,
                            format: 'float32x3',
                        },
                        {
                            // uv
                            shaderLocation: 1,
                            offset: 3 * 4,
                            format: 'float32x2',
                        }
                    ]
                }
            ]
        },
        fragment: {
            module: device.createShaderModule({
                code: positionFrag,
            }),
            entryPoint: 'main',
            targets: [
                {
                    format: format,
                    blend: {
                        color: {
                            srcFactor:'src-alpha',
                            dstFactor:'one-minus-src-alpha',
                            operation:'add'
                        },
                        alpha: {
                            srcFactor: 'src-alpha',
                            dstFactor: 'one-minus-src-alpha',
                            operation: 'add',
                        }
                    }
                }
            ]
        },
        primitive: {
            topology: 'triangle-list',
            // Culling backfaces pointing away from the camera
            cullMode: 'none',
        },
        // Enable depth testing since we have z-level positions
        // Fragment closest to the camera is rendered in front
        depthStencil: {
            depthWriteEnabled: false,
            depthCompare: 'less',
            format: 'depth24plus',
        },
    } as GPURenderPipelineDescriptor)
    // create depthTexture for renderPass
    const depthTexture = device.createTexture({
        size, format: 'depth24plus',
        usage: GPUTextureUsage.RENDER_ATTACHMENT,
    })
    const depthView = depthTexture.createView()

    // create vertex buffer
    const vertexBuffer = device.createBuffer({
        label: 'GPUBuffer store vertex',
        size: cube.vertex.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    })
    device.queue.writeBuffer(vertexBuffer, 0, cube.vertex)
    // create a 4x4xNUM STORAGE buffer to store matrix
    const mvpBuffer = device.createBuffer({
        label: 'GPUBuffer store n*4x4 matrix',
        size: 4 * 4 * 4 * NUM, // 4 x 4 x float32 x NUM
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
    })
    // create a uniform group for Matrix
    const group = device.createBindGroup({
        label: 'Uniform Group with matrix',
        layout: pipeline.getBindGroupLayout(0),
        entries: [
            {
                binding: 0,
                resource: {
                    buffer: mvpBuffer
                }
            }
        ]
    })
    const mvpBufferTriangle = device.createBuffer({
        label: 'GPUBuffer store n*4x4 matrix',
        size: 4 * 4 * 4 * N * 4, // 4 x 4 x float32 x NUM
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
    })
    // create a uniform group for Matrix
    const groupTriangle = device.createBindGroup({
        label: 'Uniform Group with matrix',
        layout: trianglePipeline.getBindGroupLayout(0),
        entries: [
            {
                binding: 0,
                resource: {
                    buffer: mvpBufferTriangle
                }
            }
        ]
    })
    // return all vars
    return {pipeline, vertexBuffer, mvpBuffer, group, depthTexture, depthView,trianglePipeline,triangleBuffer,mvpBufferTriangle,groupTriangle}
}

// create & submit device commands
function draw(
    device: GPUDevice, 
    context: GPUCanvasContext,
    pipelineObj: {
        pipeline: GPURenderPipeline,
        vertexBuffer: GPUBuffer,
        mvpBuffer: GPUBuffer,
        group: GPUBindGroup,
        depthView: GPUTextureView,
        trianglePipeline: GPURenderPipeline,
        triangleBuffer: GPUBuffer,
        groupTriangle: GPUBindGroup
    },
    textureGroup: GPUBindGroup
) {
    const commandEncoder = device.createCommandEncoder()
    const renderPassDescriptor: GPURenderPassDescriptor = {
        colorAttachments: [
            {
                view: context.getCurrentTexture().createView(),
                clearValue: { r: 0, g: 0, b: 0, a: 0 },
                loadOp: 'load',
                storeOp: 'store'
            }
        ],
        depthStencilAttachment: {
            view: pipelineObj.depthView,
            depthClearValue: 1.0,
            depthLoadOp: 'clear',
            depthStoreOp: 'store',
        }
    }
    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor)
    {
        passEncoder.setPipeline(pipelineObj.trianglePipeline)
        passEncoder.setVertexBuffer(0, pipelineObj.triangleBuffer)
        passEncoder.setBindGroup(0, pipelineObj.groupTriangle)
        passEncoder.draw(triangle.vertexCount,N)

        passEncoder.setPipeline(pipelineObj.pipeline)
        passEncoder.setVertexBuffer(0, pipelineObj.vertexBuffer)
        passEncoder.setBindGroup(0, pipelineObj.group)
        passEncoder.setBindGroup(1, textureGroup)
        passEncoder.draw(cube.vertexCount, NUM)
    }
    passEncoder.end()
    // webgpu run in a separate process, all the commands will be executed after submit
    device.queue.submit([commandEncoder.finish()])
}
export function cancel(){
    window.cancelAnimationFrame(aid)
}
// total objects
const NUM = 10000
export default async function run(canvas:HTMLCanvasElement){
    if (!canvas)
        throw new Error('No Canvas')
    const {device, context, format, size} = await initWebGPU(canvas)
    const pipelineObj = await initPipeline(device, format, size)
    // create objects
    const scene:any[] = []
    const mvpBuffer = new Float32Array(NUM * 4 * 4)
    for(let i = 0; i < NUM; i++){
        // craete simple object
        const rotation = {x: 0, y: 0, z: 0}
        const scale = {x:1.0, y:1.0, z: 1.0}
        const position = {a: Math.random(), b: Math.random(), z: 1}
        scene.push({position, rotation, scale})
    }



    // fetch an image and upload to GPUTexture
    const res = await fetch(textureUrl)
    const img = await res.blob()
    // const img = document.createElement('img')
    // img.src = textureUrl
    // await img.decode()
    const bitmap = await createImageBitmap(img)
    const textureSize = [bitmap.width, bitmap.height]
    // create empty texture
    const texture = device.createTexture({
        size: textureSize,
        format: 'rgba8unorm',
        usage:
            GPUTextureUsage.TEXTURE_BINDING |
            GPUTextureUsage.COPY_DST |
            GPUTextureUsage.RENDER_ATTACHMENT
    })
    // update image to GPUTexture
    device.queue.copyExternalImageToTexture(
        { source: bitmap },
        { texture: texture },
        textureSize
    )
    // Create a sampler with linear filtering for smooth interpolation.
    const sampler = device.createSampler({
        // addressModeU: 'repeat',
        // addressModeV: 'repeat',
        magFilter: 'linear',
        minFilter: 'linear'
    })
    const textureGroup = device.createBindGroup({
        label: 'Texture Group with Texture/Sampler',
        layout: pipelineObj.pipeline.getBindGroupLayout(1),
        entries: [
            {
                binding: 0,
                resource: sampler
            },
            {
                binding: 1,
                resource: texture.createView(),
            }
        ]
    })
    // start loop
    function frame(){
        logic()
        draw(device, context, pipelineObj,textureGroup)
        aid = requestAnimationFrame(frame)
    }
    frame()
    function logic(){
        // device.queue.writeBuffer(pipelineObj.colorBuffer, 0, new Float32Array([Math.random(), Math.random(), Math.random(), .9]))
        // update rotation for each object
        for(let i = 0; i < scene.length; i++){
            const obj = scene[i]
            const now = performance.now() / 1000
            // obj.rotation.x = Math.sin(now + i)
            // obj.rotation.y = Math.cos(now + i)
            obj.rotation.z = Math.cos(now + i)
            const mvpMatrix = getMvpMatrix(size, obj.position, obj.rotation, obj.scale)
            // update buffer based on offset
            // device.queue.writeBuffer(
            //     pipelineObj.mvpBuffer,
            //     i * 4 * 4 * 4, // offset for each object, no need to 256-byte aligned
            //     mvpMatrix
            // )
            // or save to mvpBuffer first
            mvpBuffer.set(mvpMatrix, i * 4 * 4)
        }
        // the better way is update buffer in one write after loop
        device.queue.writeBuffer(pipelineObj.mvpBuffer, 0, mvpBuffer)
        const mvpBufferTriangle = new Float32Array(N*4*16)
        for(let j=0;j<1;j++){
            let I = 10
            for(let i=0;i<I;i++){
                let θ = 2.0/180*Math.PI
                let pt1 = mat4.create()
                mat4.translate(pt1,pt1,vec3.fromValues(+1,-1,0))
                mat4.translate(pt1,pt1,vec3.fromValues(-0.1*(i+1)*Math.tan(θ),-0.1*(i+1),0))
                mat4.rotateZ(pt1,pt1,2*j/180*Math.PI)
                let pt2 = mat4.create()
                mat4.translate(pt2,pt2,vec3.fromValues(-1,-1,0))
                mat4.translate(pt2,pt2,vec3.fromValues(+0.1*(i+1)*Math.tan(θ),-0.1*(i+1),0))
                mat4.rotateZ(pt2,pt2,2*j/180*Math.PI)
                let pt3 = mat4.create()
                mat4.translate(pt3,pt3,vec3.fromValues(+1,+1,0))
                mat4.translate(pt3,pt3,vec3.fromValues(-0.1*(i+2)*Math.tan(θ),-0.1*(i+2),0))
                mat4.rotateZ(pt3,pt3,2*j/180*Math.PI)
                let pt4 = mat4.create()
                mat4.translate(pt4,pt4,vec3.fromValues(-1,+1,0))
                mat4.translate(pt4,pt4,vec3.fromValues(+0.1*(i+2)*Math.tan(θ),-0.1*(i+2),0))
                mat4.rotateZ(pt4,pt4,2*j/180*Math.PI)
                mvpBufferTriangle.set(Float32Array.from([
                    ...(pt1 as Float32Array),
                    ...(pt2 as Float32Array),
                    ...(pt3 as Float32Array),
                    ...(pt4 as Float32Array),
                ]), (j*I+i) * 4 * 4 * 4)
            }
        }
        device.queue.writeBuffer(pipelineObj.mvpBufferTriangle, 0, mvpBufferTriangle)
    }

    new ResizeObserver(()=>{
        let rect = canvas.getBoundingClientRect()
        if(rect.width==0||rect.height==0)return
        size.width = canvas.width = rect.width * devicePixelRatio
        size.height = canvas.height = rect.height * devicePixelRatio
        // don't need to recall context.configure() after v104
        // re-create depth texture
        pipelineObj.depthTexture.destroy()
        pipelineObj.depthTexture = device.createTexture({
            size, format: 'depth24plus',
            usage: GPUTextureUsage.RENDER_ATTACHMENT,
        })
        pipelineObj.depthView = pipelineObj.depthTexture.createView()

        for(let i = 0; i < scene.length; i++){
            let position = scene[i].position
            let scale = scene[i].scale
            let pos = getGPUcoord(position.a*size.width,position.b*size.height,size)
            position.x = pos.x
            position.y = pos.y
            let fovy=90/180*Math.PI
            // let w=size.width
            // let h=size.height
            let w=32
            let h=34
            scale.x=devicePixelRatio*w/size.height/(1*Math.tan(fovy/2))
            scale.y=devicePixelRatio*h/size.height/(1*Math.tan(fovy/2))
            scale.z=devicePixelRatio*h/size.height/(1*Math.tan(fovy/2))
        }
        logic()
        draw(device, context, pipelineObj,textureGroup)
    }).observe(canvas)
    function getGPUcoord(x:number,y:number,size:{width:number,height:number}){
        return {
            x:(x-size.width/2)/(size.width/2)*size.width/size.height,
            y:-(y-size.height/2)/(size.height/2)
        }
    }
}