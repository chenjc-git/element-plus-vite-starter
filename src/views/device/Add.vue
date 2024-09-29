<!--<template>-->
<!--  <pro-form-->
<!--    ref="form"-->
<!--    class="main"-->
<!--    :type="type"-->
<!--    :title="title"-->
<!--    :search="formConfig"-->
<!--  >-->

<!--  </pro-form>-->
<!--</template>-->
<!--<script>-->
<!--import {defineComponent, reactive, ref, toRefs} from 'vue'-->

<!--export default defineComponent({-->
<!--  name: 'AddDevice',-->
<!--  setup() {-->
<!--    const state = reactive({-->
<!--      title: '新增设备',-->
<!--      type: 'add',-->
<!--      formConfig: {-->
<!--        labelWidth: '120px',-->
<!--        inputWidth: '300px',-->
<!--        fields: [-->
<!--          {-->
<!--            type: 'text',-->
<!--            label: '编号',-->
<!--            name: 'no',-->
<!--            defaultValue: '',-->
<!--            placeholder: '',-->
<!--            clearable: false,-->
<!--            disabled: false,-->
<!--            style: {},-->
<!--          },-->
<!--          {-->
<!--            type: 'text',-->
<!--            label: '设备编号',-->
<!--            name: 'device_no',-->
<!--          },-->
<!--          {-->
<!--            type: 'text',-->
<!--            label: '设备名称',-->
<!--            name: 'device_name',-->
<!--          },-->
<!--          {-->
<!--            type: 'text',-->
<!--            label: '简称',-->
<!--            name: 'device_short_name',-->
<!--          },-->
<!--          {-->
<!--            type: 'text',-->
<!--            label: '设备类型',-->
<!--            name: 'device_type',-->
<!--          },-->
<!--          {-->
<!--            type: 'text',-->
<!--            label: '设备型号',-->
<!--            name: 'device_model',-->
<!--          },-->
<!--          {-->
<!--            type: 'text',-->
<!--            label: '地址',-->
<!--            name: 'address',-->
<!--          },-->
<!--          {-->
<!--            type: 'text',-->
<!--            label: '厂商',-->
<!--            name: 'manufacturer',-->
<!--          },-->
<!--          {-->
<!--            type: 'relative',-->
<!--            label: '经纬度',-->
<!--            label1: '经度',-->
<!--            name1: 'lng',-->
<!--            label2: '纬度',-->
<!--            name2: 'lat',-->
<!--          },-->
<!--          {-->
<!--            type: 'text',-->
<!--            label: '海拔高度',-->
<!--            name: 'altitude',-->
<!--          },-->
<!--          {-->
<!--            type: 'text',-->
<!--            label: '气压海拔高度',-->
<!--            name: 'height',-->
<!--          },-->
<!--          {-->
<!--            type: 'text',-->
<!--            label: '数据路径',-->
<!--            name: 'data_path',-->
<!--          },-->
<!--          {-->
<!--            type: 'text',-->
<!--            label: '颜色',-->
<!--            name: 'color',-->
<!--          },-->
<!--          {-->
<!--            type: 'number',-->
<!--            label: '风速',-->
<!--            name: 'speed',-->
<!--          },-->
<!--          {-->
<!--            type: 'number',-->
<!--            label: '风向',-->
<!--            name: 'orientation',-->
<!--          },-->
<!--          {-->
<!--            type: 'switch',-->
<!--            label: '是否隐藏',-->
<!--            name: 'hide',-->
<!--          },-->
<!--          {-->
<!--            type: 'text',-->
<!--            label: '数据超时时长(s)',-->
<!--            name: 'data_overtime',-->
<!--          },-->
<!--          {-->
<!--            type: 'select',-->
<!--            label: '设备数据状态',-->
<!--            name: 'status',-->
<!--          },-->
<!--        ]-->
<!--      }-->
<!--    })-->

<!--    const form = ref(null)-->

<!--    return {-->
<!--      ...toRefs(state),-->
<!--      form,-->
<!--    }-->
<!--  }-->
<!--})-->
<!--</script>-->
