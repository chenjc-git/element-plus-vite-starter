<template>
  <pro-table
    ref="table"
    class="main"
    title="设备列表"
    :request="getTableList"
    :columns="columns"
    :search="searchConfig"
    @selectionChange="handleSelectionChange"
  >
    <!-- 工具栏 -->
    <template #toolbar>
      <el-button
        type="primary"
        icon="Plus"
        @click="$router.push('/cq/system/device/add')"
      >
        新增
      </el-button>
<!--      <el-button type="info" icon="Search" @click="view" >
        查看
      </el-button>-->
      <el-button type="danger" icon="Delete" @click="batchDelete">
        批量删除
      </el-button>
      <el-button type="primary" icon="Refresh" @click="refresh">
        刷新
      </el-button>
    </template>
    <template #status="{row}">
      <el-tag :type="row.status === 1 ? 'success' : 'error'">
        {{ row.status === 1 ? '正常' : row.status === 2 ? '延迟' : row.status === 3 ? '缺失' : '未知' }}
      </el-tag>
    </template>
    <template #operate="scope">
      <el-button
        size="small"
        type="primary"
        icon="Edit"
        @click="$router.push(`/cq/system/device/edit/${scope.row.id}`)"
      >
        编辑
      </el-button>
      <el-button
        size="small"
        type="danger"
        icon="Delete"
        @click="handleDelete(scope.row)"
      >
        删除
      </el-button>
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
import { defineComponent, reactive, ref, toRefs, onBeforeMount, watch } from 'vue'
import { getDeviceList, del as deleteDevice, batchDel as batchDeleteDevice } from '~/api/network/device'
import { ElMessage } from "element-plus";
import { getCurrentInstance } from "vue-demi";
export default defineComponent({
  name: 'Device',
  setup() {
    const { proxy } = getCurrentInstance()

    const state = reactive({

      // 表格列配置，大部分属性跟el-table-column配置一样
      columns: [
        { type: 'selection', width: 50 },
        { label: '序号', type: 'index', width: 80 },
        { label: '编号', prop: 'no', sortable: true, width: 180, },
        { label: '设备编号', prop: 'device_no', width: 180, },
        { label: '设备名称', prop: 'device_name', width: 180, },
        { label: '简称', prop: 'device_short_name', minWidth: 200, },
        { label: '设备类型', prop: 'device_type', width: 180, },
        { label: '设备型号', prop: 'device_model', width: 180, },
        { label: '地址', prop: 'address', width: 180, },
        { label: '厂商', prop: 'manufacturer', width: 180, },
        { label: '经度', prop: 'lng', width: 180, },
        { label: '纬度', prop: 'lat', width: 180, },
        { label: '海拔高度', prop: 'altitude', width: 180, },
        { label: '气压海拔高度', prop: 'height', width: 180, },
        { label: '数据路径', prop: 'data_path', width: 180, },
        { label: '风速', prop: 'speed', width: 180, },
        { label: '风向', prop: 'orientation', width: 180, },
        { label: '数据超时时长(S)', prop: 'data_overtime', width: 180, },
        { label: '状态', tdSlot: 'status', width: 180, },
        { label: '操作', width: 200, align: 'center', tdSlot: 'operate', fixed: 'right' }, // fixed:固定列位置
      ],
      // 搜索配置
      searchConfig: {
        labelWidth: '90px', // 必须带上单位
        inputWidth: '250px', // 必须带上单位
        fields: [
          {
            type: 'text',
            label: '编号',
            name: 'no',
            defaultValue: '',
          },
          {
            type: 'text',
            label: '设备名称',
            name: 'device_name',
            defaultValue: '',
          },
          {
            label: '状态',
            name: 'status',
            type: 'select',
            style: {
              width: '100px'
            },
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
      async confirmDelete(params) {
        await deleteDevice(params)
        state.dialog.visible = false;
        table.value.refresh()
      },
      async confirmBatchDelete(items) {
        let ids_arr = []
        items.forEach(item => {
          ids_arr.push(item.id)
        })
        await batchDeleteDevice({'ids': ids_arr})
        state.dialog.visible = false;
        table.value.refresh()
      },
      handleDelete(params) {
        state.dialog.type = 'delete'
        state.dialog.title = '删除设备'
        state.dialog.tip = '确认要删除该设备吗?'
        state.deleteScope = params
        state.dialog.visible = true;  // 显示对话框
      },
      batchDelete() {
        if (state.selectedItems.length === 0) {
          ElMessage({
            message: '请选择要删除的设备！',
            type: "error",
          });
        } else {
          state.dialog.type = 'batchDelete'
          state.dialog.title = '批量删除设备'
          state.dialog.tip = '确认要删除选中的设备吗?'
          state.dialog.visible = true;  // 显示对话框
        }
      },

      view() {
        if (state.selectedItems.length !== 0) {
          let item = state.selectedItems[0]
          proxy.$router.push(`/cq/system/device/edit/${item.id}`)
        } else {
          ElMessage({
            message: '请选择要查看的记录！',
            type: "error",
            showClose: true,
          });
        }
      },
      // 选择
      handleSelectionChange(arr) {
        state.selectedItems = arr
      },
      // 请求函数
      async getTableList(params) {
        // params是从组件接收的，包含分页和搜索字段。
        const { data } = await getDeviceList(params)

        // 必须要返回一个对象，包含data数组和total总数
        return {
          data: data.data.data_list,
          total: +data.data.page.total,
        }
      },
    })
    const table = ref(null)
    const refresh = () => {
      table.value.refresh()
    }

    onBeforeMount(() => {
      // state.router = router
    })

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