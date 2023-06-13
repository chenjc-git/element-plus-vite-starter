const vertex = new Float32Array([
    // float3 position, float2 uv
    // face1
    +1, -1, +1,    1, 1,
    -1, -1, +1,    0, 1,
    -1, -1, -1,    0, 0,
    +1, -1, -1,    1, 0,
    +1, -1, +1,    1, 1,
    -1, -1, -1,    0, 0,
    // face2
    +1, +1, +1,    1, 1,
    +1, -1, +1,    0, 1,
    +1, -1, -1,    0, 0,
    +1, +1, -1,    1, 0,
    +1, +1, +1,    1, 1,
    +1, -1, -1,    0, 0,
    // face3
    -1, +1, +1,    1, 1,
    +1, +1, +1,    0, 1,
    +1, +1, -1,    0, 0,
    -1, +1, -1,    1, 0,
    -1, +1, +1,    1, 1,
    +1, +1, -1,    0, 0,
    // face4
    -1, -1, +1,    1, 1,
    -1, +1, +1,    0, 1,
    -1, +1, -1,    0, 0,
    -1, -1, -1,    1, 0,
    -1, -1, +1,    1, 1,
    -1, +1, -1,    0, 0,
    // face5
    +1, +1, +1,    1, 1,
    -1, +1, +1,    0, 1,
    -1, -1, +1,    0, 0,
    -1, -1, +1,    0, 0,
    +1, -1, +1,    1, 0,
    +1, +1, +1,    1, 1,
    // face6
    +1, -1, -1,    1, 1,
    -1, -1, -1,    0, 1,
    -1, +1, -1,    0, 0,
    +1, +1, -1,    1, 0,
    +1, -1, -1,    1, 1,
    -1, +1, -1,    0, 0


    // +1, +1, +1,    1, 0,
    // -1, +1, +1,    0, 0,
    // -1, -1, +1,    0, 1,
    // -1, -1, +1,    0, 1,
    // +1, -1, +1,    1, 1,
    // +1, +1, +1,    1, 0,

    // -1, +1, +1,    0, 0,
    // +1, +1, +1,    1, 0,
    // -1, -1, +1,    0, 1,
    // +1, -1, +1,    1, 1,
])

const vertexCount = 36
// const vertexCount = 4

export {vertex, vertexCount}