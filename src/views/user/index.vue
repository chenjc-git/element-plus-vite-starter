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
        @click="showDialog('新增')"
      >
        新增
      </el-button>
      <el-button type="primary" icon="Delete" @click="batchDelete">
        批量删除
      </el-button>
      <el-button type="primary" icon="Refresh" @click="refresh">
        刷新
      </el-button>
    </template>
    <template #is_active="{row}">
      <el-tag :type="row.is_active === 1 ? 'success' : 'error'">
        {{ row.is_active === 1 ? '启用' : '禁用' }}
      </el-tag>
    </template>
    <template #operate="scope">
      <el-button
        size="small"
        type="primary"
        @click="showDialog('编辑', scope.row)"
      >
        编辑
      </el-button>
      <el-button size="small" type="danger">
        删除
      </el-button>
    </template>
  </pro-table>
  <el-dialog
    :title="dialogTitle"
    v-model="dialogVisible"
    width="50%"
    height="500px"
    class="edit"
    :before-close="handleCloseDialog"
  >
    <!-- 表单内容 -->
    <el-form :model="formData" ref="formRef" class="form">
      <el-form-item label="用户名" style="padding-left:15px; margin-right:50px">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="昵称" style="margin-right:50px">
        <el-input v-model="formData.nickname"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" style="margin-right:50px">
        <el-input v-model="formData.email" :disabled="isDisabled"></el-input>
      </el-form-item>
      <el-form-item label="登录类型" style="margin-right:50px">
        <el-input v-model="formData.login_type"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="formData.is_active"
          :placeholder="activeSelect.label"
          style="width: 195px;"
        >
          <el-option
            v-for="option of activeSelect.options"
            :key="option.value"
            :label="option.name"
            :value="option.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 其他表单项 -->
    </el-form>
    <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm">保存</el-button>
          </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { getUserList, edit as editUser, save as saveUser } from '~/api/network/user'
export default defineComponent({
  name: 'User',
  setup() {
    // const { proxy } = getCurrentInstance()

    const state = reactive({
      formRef: ref(null),

      // 表格列配置，大部分属性跟el-table-column配置一样
      columns: [
        { type: 'selection', width: 56 },
        { label: '序号', type: 'index', width: 80 },
        {
          label: '用户名',
          prop: 'username',
          sortable: true,
          width: 180,
        },
        {
          label: '昵称',
          prop: 'nickname',
          width: 180,
        },
        {
          label: '邮箱',
          prop: 'email',
          minWidth: 200,
        },
        {
          label: '登录类型',
          prop: 'login_type',
          width: 180,
        },
        {
          label: '状态',
          tdSlot: 'is_active',
          width: 180,
        },
        {
          label: '操作',
          width: 200,
          align: 'center',
          tdSlot: 'operate', // 自定义单元格内容的插槽名称
        },
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
          // {
          //   label: '状态',
          //   name: 'is_active',
          //   type: 'select',
          //   defaultValue: 0,
          //   options: [
          //     {
          //       name: '启用',
          //       value: 1,
          //     },
          //     {
          //       name: '禁用',
          //       value: 0,
          //     },
          //   ],
          // },
        ],
      },
      // 分页配置
      // paginationConfig: {
      //   layout: 'total, prev, pager, next, sizes', // 分页组件显示哪些功能
      //   pageSize: 10, // 每页条数
      //   pageSizes: [5, 10, 20, 50],
      //   style: { 'justify-content': 'flex-end' },
      // },
      selectedItems: [],
      dialogVisible: false,
      dialogTitle: '',
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
      batchDelete() {
        console.log(state.selectedItems)
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
      // 显示新增、编辑页面
      showDialog(type, row) {
        state.dialogVisible = true;
        state.dialogTitle = type === '新增' ? '新增记录' : '编辑记录';
        // 初始化表单数据
        if (type === '编辑') {
          // 获取编辑数据
          state.fetchEditData(row)
          state.isDisabled = true
        } else {
          state.formData = {} // 清空表单数据
          state.isDisabled = false
        }
      },
      // 关闭新增、编辑页面
      handleCloseDialog() {
        state.dialogVisible = false
        // 可选：重置表单数据
        state.formData = {};
      },
      // 接口获取选中数据
      async fetchEditData(row) {
        const params = {
          uuid: row.uuid,
        }
        const { data } = await editUser(params)
        state.formData.id = data.data.id
        state.formData.uuid = data.data.uuid
        state.formData.username = data.data.username
        state.formData.nickname = data.data.nickname
        state.formData.email = data.data.email
        state.formData.login_type = data.data.login_type
        state.formData.is_active = data.data.is_active
      },
      // 保存新增、编辑数据
      submitForm() {
        state.formRef.validate(async valid => {
          if (valid) {
            const { code, data, msg } = await saveUser(state.formData)
            if (data.code === 1) {
              state.handleCloseDialog()
              refresh()
            }
          }
        })
      },
    })
    const table = ref(null)
    const refresh = () => {
      table.value.refresh()
    }

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