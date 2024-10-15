<template>
  <pro-table
    ref="table"
    class="main"
    title="设备状态列表"
    :request="getTableList"
    :columns="columns"
    :search="searchConfig"
    @selectionChange="handleSelectionChange"
  >
    <!-- 工具栏 -->
    <template #toolbar>
      <el-button type="primary" icon="Refresh" @click="refresh">
        刷新
      </el-button>
    </template>
    <template #device_no="{row}">
      <router-link :to="generateRoutePath(row)" target="_self" style="text-decoration: none; color: #409eff" >
        {{ row.device_no }}
      </router-link>
<!--      <span @click="toCharts(row)" style="text-decoration: none; color: #409eff">
        {{ row.device_no }}
      </span>-->
    </template>
    <template #device_data_status="{row}">
      <el-tag :type="row.device_data_status === 1 ? 'success' : 'error'">
        {{ row.device_data_status === 1 ? '正常' : row.device_data_status === 2 ? '延迟' : row.device_data_status === 3 ? '缺失' : '未知' }}
      </el-tag>
    </template>
  </pro-table>
  <el-dialog
    :title="dialog.title"
    v-model="dialog.visible"
    @close="handleCloseDialog"
    width="500"
  >
    <span>{{ dialog.tip }}</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialog.callConfirm">
          确 定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import {defineComponent, reactive, ref, toRefs, onBeforeMount, watch} from 'vue'
import { getDeviceStatusList } from '~/api/network/device_status'
import {getCurrentInstance} from "vue-demi";
export default defineComponent({
  name: 'DeviceStatus',
  components: {},
  setup() {
    const { proxy } = getCurrentInstance()

    const state = reactive({

      // 表格列配置，大部分属性跟el-table-column配置一样
      columns: [
        { type: 'selection', width: 50 },
        { label: '序号', type: 'index', width: 80 },
        { label: '设备编号', prop: 'device_no', tdSlot: 'device_no', sortable: true, width: 180, },
        { label: '设备数据状态', prop: 'device_data_status', tdSlot: 'device_data_status', width: 180, },
        { label: '状态时间', prop: 'status_time', width: 180, },
      ],
      // 搜索配置
      searchConfig: {
        labelWidth: '90px', // 必须带上单位
        inputWidth: '250px', // 必须带上单位
        fields: [
          {
            type: 'text',
            label: '设备编号',
            name: 'device_no',
            defaultValue: '',
          },
          {
            label: '设备数据状态',
            name: 'device_data_status',
            type: 'select',
            style: {
              width: '150px'
            },
            width: '120px',
            options: [
              {
                name: '未知',
                value: 0,
              },
              {
                name: '正常',
                value: 1,
              },
              {
                name: '延迟',
                value: 2,
              },
              {
                name: '缺失',
                value: 3,
              },
            ],
          },
        ],
      },
      selectedItems: [],
      isDisabled: false,
      dialog: {
        type: null,
        title: null,
        tip: null,
        visible: false,
        callConfirm: () => {
          if (state.dialog.type === 'delete') {
            state.confirmDelete(state.deleteScope)
          } else if (state.dialog.type === 'batchDelete') {
            state.confirmBatchDelete(state.selectedItems)
          }
        }
      },
      deleteScope: null,

      handleCloseDialog() {
        state.dialog.visible = false;
      },
      // 选择
      handleSelectionChange(arr) {
        state.selectedItems = arr
      },
      // 请求函数
      async getTableList(params) {
        // params是从组件接收的，包含分页和搜索字段。
        const { data } = await getDeviceStatusList(params)

        // 必须要返回一个对象，包含data数组和total总数
        return {
          data: data.data.data_list,
          total: +data.data.page.total,
        }
      },
      generateRoutePath(row) {
        return `device_status/charts/${row.device_no}`
      },
    })
    const table = ref(null)
    const refresh = () => {
      table.value.refresh()
    }

    // 监听路由参数变化
    watch(() => proxy.$route.params, (newParams) => {
      if (JSON.stringify(newParams) === '{}') {
        table.value.refreshAll()
      }
    });

    return { ...toRefs(state), refresh, table }
  },
})
</script>
<style lang="scss" scoped>
</style>