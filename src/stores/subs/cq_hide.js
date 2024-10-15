export default {
  path: 'cq',
  name:'cq20fee1-5ad7-51e1-2768-5e0933011a09',
  component: '/src/container.vue',
  svg:'f7f96575383611efb04bb025aa2c9ada',
  meta:{
    label:'重庆激光雷达组网观测系统',
    roles:['admin','cq']
  },
  hide:true,
  children:[
    {
      path: 'system',
      name:'cq4619cf-ca3d-ffb1-9781-afcf73cfa623',
      svg:'7809a650d6c811ee9aafb025aa2c9ada',
      redirect:'/cq/system/person',
      meta:{
        label:'系统管理',
      },
      children:[
        {
          path: 'device/add',
          name: 'cq20fee1-5ad7-51e1-2768-5e0933011b11',
          component: '/src/views/device/Add.vue',
          svg:'91e315392d3d11ef98d8b025aa2c9ada',
          meta:{
            label: '新增设备',
          }
        },
        {
          path: 'device/edit/:id',
          name: 'cq20fee1-5ad7-51e1-2768-5e0933011b12',
          component: '/src/views/device/Edit.vue',
          svg:'91e315392d3d11ef98d8b025aa2c9ada',
          meta:{
            label: '编辑设备',
          }
        },
        {
          path: 'user/add',
          name: 'cq20fee1-5ad7-51e1-2768-5e0933011b13',
          component: '/src/views/user/Add.vue',
          svg:'91e315392d3d11ef98d8b025aa2c9ada',
          meta:{
            label: '新增用户',
          }
        },
        {
          path: 'user/edit/:id',
          name: 'cq20fee1-5ad7-51e1-2768-5e0933011b14',
          component: '/src/views/user/Edit.vue',
          svg:'91e315392d3d11ef98d8b025aa2c9ada',
          meta:{
            label: '编辑用户',
          }
        },
        {
          path: 'device_status/charts/:device_no',
          name: 'cq20fee1-5ad7-51e1-2768-5e0933011b15',
          component: '/src/views/device_status/Charts.vue',
          meta:{
            label: '设备状态图表',
          }
        },
      ]
    },
  ]
}