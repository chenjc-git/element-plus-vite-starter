<template>
  <div class="page-box">
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      :inline="false"
      label-position="right"
      label-width="120px"
    >
      <div class="head">
        <slot name="title">
          <span class="title">编辑用户: {{ formData.username }}</span>
        </slot>
      </div>
      <div class="form-row-btn" style="padding-right: 50px;">
        <el-form-item class="search-btn" style="width: 100%;">
          <el-button type="primary" icon="ArrowLeft" style="margin-left: auto;" @click="back">返回</el-button>
          <el-button type="primary" icon="Edit" style="margin-left: 20px;" @click="save">保存</el-button>
          <el-button type="primary" icon="RefreshRight" style="margin-left: 20px;" @click="refresh">刷新</el-button>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
          key="username"
          label="用户名："
          prop="username"
          label-position="left"
        >
          <el-input
            type="text"
            clearable
            v-model="formData.username"
            placeholder="用户名"
            style="width: 250px;"
          ></el-input>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
          key="nickname"
          label="昵称："
          prop="nickname"
          label-position="left"
        >
          <el-input
            type="text"
            clearable
            v-model="formData.nickname"
            placeholder="昵称"
            style="width: 250px;"
          ></el-input>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
          key="password"
          label="密码："
          prop="password"
          label-position="left"
        >
          <span>密码原文未存储在系统中，因此无法看到该用户的密码。</span>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
          key="email"
          label="邮箱："
          prop="email"
          label-position="left"
        >
          <el-input
            type="text"
            clearable
            v-model="formData.email"
            placeholder="邮箱"
            style="width: 250px;"
          ></el-input>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
          key="login_type"
          label="登录类型："
          prop="login_type"
          label-position="left"
        >
          <el-input
            type="text"
            clearable
            v-model="formData.login_type"
            placeholder="登录类型"
            style="width: 250px;"
          ></el-input>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
          key="introduction"
          label="描述："
          prop="introduction"
          label-position="left"
        >
          <el-input
            type="textarea"
            clearable
            v-model="formData.introduction"
            rows="3"
            placeholder="描述"
            style="width: 600px;"
          ></el-input>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
          key="is_active"
          label="状态："
          prop="is_active"
          label-position="left"
        >
          <el-switch
            v-model="formData.is_active"
            inline-prompt
            active-text="启用"
            inactive-text="禁用"
          />
        </el-form-item>
      </div>
    </el-form>

    <el-dialog
      title="确认修改"
      v-model="dialogVisible"
      @close="handleCloseDialog"
      width="500"
    >
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmSave()">
            确 定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { defineComponent, onBeforeMount, onMounted, reactive, ref, toRefs, computed, watch} from 'vue'
import useCloseTag from "~/hooks/useCloseTag";
import { edit as editUser, save as saveUser } from "~/api/network/user";
import { getCurrentInstance } from "vue-demi";

export default defineComponent({
  name: 'EditUser',
  setup() {
    const { proxy } = getCurrentInstance()
    const { closeTag } = useCloseTag()
    const state = reactive({
      form: ref(null),
      closeTag: null,
      formData: {
        id: null,
        uuid: null,
        username: null,
        nickname: null,
        email: null,
        login_type: null,
        introduction: null,
        is_active: 1,
      },
      formRules: {
        username: [
          { required: true, message: '请输入用户名！', trigger: 'blur' }
        ],
      },
      dialogVisible: false,

      // 返回（关闭）
      back() {
        state.closeTag()
      },

      // 刷新
      refresh() {
        state.editForm(proxy.$route.params)
      },
      // 保存
      save() {
        state.form.validate(async valid => {
          if (valid) {
            state.dialogVisible = true;  // 显示对话框
          }
        })
      },

      // 请求函数
      async editForm(params) {
        // params是从组件接收的，包含分页和搜索字段。
        const { data } = await editUser(params)

        // 必须要返回一个对象，包含data数据
        // state.formData = data.data
        state.formData = data.data
      },

      handleCloseDialog() {
        state.dialogVisible = false;
      },

      async confirmSave() {
        const { data } = await saveUser(state.formData)
        if (data.code === 200) {
          state.handleCloseDialog()
          state.closeTag()
        }
      },
    })

    onBeforeMount(() => {
      state.closeTag = closeTag
    })

    onMounted(async () => {
      await state.editForm(proxy.$route.params)
    })

    // 监听路由参数变化
    watch(() => proxy.$route.params, (newParams) => {
      if (JSON.stringify(newParams) !== '{}') {
        state.editForm(newParams)  // 当路由参数变化时重新加载数据
      }
    });

    return {
      closeTag,
      ...toRefs(state),
    }
  }
})
</script>
<style lang="scss" scoped>
.page-box {
  width: 100%;
  min-height: 100%;
  position: absolute;
  padding-bottom: 50px;
  background-color: #fff;
  .search {
    padding: 20px 10px 0;
    flex-wrap: wrap;
    display: flex;
    box-sizing: border-box; /* 这是关键：width100%+padding宽度不会超过容器宽度 */
    min-height: 100px;
    :deep(.el-input-number .el-input__inner) {
      text-align: left;
    }
    :deep(.el-range-editor.el-input__wrapper) {
      box-sizing: border-box;
    }
  }

  .head {
    height: 40px;
    flex-wrap: wrap;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px 0;
    margin-top: 20px;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
  }

  .form-row-btn {
    flex-wrap: wrap;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    padding: 0 40px 10px 0;
  }

  .form-row {
    flex-wrap: wrap;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    padding: 0 40px;
    .color-picker {
      margin-right: 16px;
    }
  }
}
.dark .page-box {
  background-color: #111;
}
</style>
