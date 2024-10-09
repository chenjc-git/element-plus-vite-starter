<template>
  <pro-table
    ref="table"
    title="用户列表"
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
        @click="$router.push('/cq/system/user/add')"
      >
        新增
      </el-button>
      <el-button type="danger" icon="Delete" @click="batchDelete">
        批量删除
      </el-button>
      <el-button type="primary" icon="Refresh" @click="refresh">
        刷新
      </el-button>
    </template>
    <template #is_active="{row}">
      <el-tag :type="row.is_active === true ? 'success' : 'error'">
        {{ row.is_active === true ? '启用' : '禁用' }}
      </el-tag>
    </template>
    <template #operate="scope">
      <el-button
        size="small"
        type="primary"
        icon="Edit"
        @click="$router.push(`/cq/system/user/edit/${scope.row.id}`)"
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
import {defineComponent, reactive, ref, toRefs, watch} from 'vue'
import { getUserList, del as delUser, batchDel as batchDeleteUser } from '~/api/network/user'
import {ElMessage} from "element-plus";
import {getCurrentInstance} from "vue-demi";
export default defineComponent({
  name: 'User',
  setup() {
    const { proxy } = getCurrentInstance()

    const state = reactive({
      formRef: ref(null),

      // 表格列配置，大部分属性跟el-table-column配置一样
      columns: [
        { type: 'selection', width: 56 },
        { label: '序号', type: 'index', width: 80 },
        { label: '用户名', prop: 'username', sortable: true, width: 180, },
        { label: '昵称', prop: 'nickname', width: 180, },
        { label: '邮箱', prop: 'email', minWidth: 200, },
        { label: '登录类型', prop: 'login_type', width: 180, },
        { label: '描述', prop: 'introduction', width: 250, },
        { label: '状态', tdSlot: 'is_active', width: 180, fixed: 'right' , },
        { label: '操作', width: 200, align: 'center', tdSlot: 'operate', fixed: 'right' , },
      ],
      // 搜索配置
      searchConfig: {
        labelWidth: '90px', // 必须带上单位
        inputWidth: '400px', // 必须带上单位
        fields: [
          {
            type: 'text',
            label: '用户名',
            name: 'username',
            defaultValue: '',
          },
          {
            label: '状态',
            name: 'is_active',
            type: 'select',
            style: {
              width: '100px'
            },
            options: [
              {
                name: '启用',
                value: 1,
              },
              {
                name: '禁用',
                value: 0,
              },
            ],
          },
        ],
      },
      selectedItems: [],
      formData: {
        id: null,
        uuid: '',
        username: '',
        nickname: '',
        email: '',
        login_type: '',
        is_active: 0,
      },
      isDisabled: false,
      activeSelect: {
        label: '状态',
        name: 'is_active',
        defaultValue: 0,
        options: [
          {
            name: '启用',
            value: 1,
          },
          {
            name: '禁用',
            value: 0,
          },
        ],
      },
      dialog: {
        title: null,
        tip: null,
        type: null,
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
        await delUser(params)
        state.dialog.visible = false;
        table.value.refresh()
      },
      async confirmBatchDelete(items) {
        let ids_arr = []
        items.forEach(item => {
          ids_arr.push(item.id)
        })
        await batchDeleteUser({'ids': ids_arr})
        state.dialog.visible = false;
        table.value.refresh()
      },
      handleDelete(params) {
        state.dialog.type = 'delete'
        state.dialog.title = '删除用户'
        state.dialog.tip = '确认要删除该用户吗?'
        state.deleteScope = params
        state.dialog.visible = true;  // 显示对话框
      },

      batchDelete() {
        if (state.selectedItems.length === 0) {
          ElMessage({
            message: '请选择要删除的用户！',
            type: "error",
          });
        } else {
          state.dialog.type = 'batchDelete'
          state.dialog.title = '批量删除用户'
          state.dialog.tip = '确认要删除选中的用户吗?'
          state.dialog.visible = true;  // 显示对话框
        }
      },
      // 选择
      handleSelectionChange(arr) {
        state.selectedItems = arr
      },
      // 请求函数
      async getTableList(params) {
        // params是从组件接收的，包含分页和搜索字段。
        const { data } = await getUserList(params)

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
.form {
  padding: 20px 20px 0;
  //background: #fff;
  //margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  .ep-form-item {
    margin: 20px 20px 20px 0;
  }
  .search-btn {
    margin-left: auto;
  }
  :deep(.el-input-number .el-input__inner) {
    text-align: left;
  }
  :deep(.el-range-editor.el-input__wrapper) {
    box-sizing: border-box;
  }
}
.dark .edit {
  background: #111;
}
</style>