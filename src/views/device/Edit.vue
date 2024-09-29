<template>
  <div class="page-box">
    <div class="head">
      <slot name="title">
        <span class="title">编辑设备: {{ formData.no }}</span>
      </slot>
    </div>
    <el-form
      :model="formData"
      :inline="false"
      label-position="right"
      label-width="120px"
    >
      <div class="form-row-btn" style="padding-right: 50px;">
        <el-form-item class="search-btn" style="width: 100%;">
          <el-button type="primary" icon="ArrowLeft" style="margin-left: auto;" @click="back">返回</el-button>
          <el-button type="primary" icon="Edit" style="margin-left: 20px;" @click="save">保存</el-button>
          <el-button type="primary" icon="RefreshRight" style="margin-left: 20px;" @click="refresh">刷新</el-button>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
          key="no"
          label="编号："
          prop="no"
          label-position="left"
        >
          <el-input
            type="text"
            clearable
            v-model="formData.no"
            placeholder="编号"
            style="width: 250px;"
          ></el-input>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
          key="device_no"
          label="设备编号："
          prop="device_no"
          label-position="left"
        >
          <el-input
            type="text"
            clearable
            v-model="formData.device_no"
            placeholder="设备编号"
            style="width: 250px;"
          ></el-input>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
          key="device_name"
          label="设备名称："
          prop="device_name"
          label-position="left"
        >
          <el-input
            type="text"
            clearable
            v-model="formData.device_name"
            placeholder="设备名称"
            style="width: 250px;"
          ></el-input>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
          key="device_short_name"
          label="简称："
          prop="device_short_name"
          label-position="left"
        >
          <el-input
            type="text"
            clearable
            v-model="formData.device_short_name"
            placeholder="简称"
            style="width: 250px;"
          ></el-input>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
          key="device_type"
          label="设备类型："
          prop="device_type"
          label-position="left"
        >
          <el-input
            type="text"
            clearable
            v-model="formData.device_type"
            placeholder="设备类型"
            style="width: 250px;"
          ></el-input>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
          key="device_model"
          label="设备型号："
          prop="device_model"
          label-position="left"
        >
          <el-input
            type="text"
            clearable
            v-model="formData.device_model"
            placeholder="设备型号"
            style="width: 250px;"
          ></el-input>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import {defineComponent, onBeforeMount, onMounted, onUpdated, reactive, toRefs, watch} from 'vue'
import useCloseTag from "~/hooks/useCloseTag";
import { edit as editDevice } from "~/api/network/device";
import { getCurrentInstance } from "vue-demi";

export default defineComponent({
  name: 'EditDevice',
  setup() {
    const { proxy } = getCurrentInstance()
    const { closeTag } = useCloseTag()
    const state = reactive({
      closeTag: null,
      formData: {
        id: null,
        uuid: '',
        no: '',
        device_no: '',
        device_name: '',
        device_short_name: '',
        device_type: '',
        device_model: '',
        address: '',
        manufacturer: '',
        lng: '',
        lat: '',
        altitude: '',
        height: '',
        data_path: '',
        color: '',
        speed: null,
        orientation: null,
        hide: '',
        data_overtime: '',
        status: '',
        create_time: '',
      },

      // 返回（关闭）
      back() {
        state.closeTag()
      },

      // 刷新
      refresh() {
        state.formData.refresh()
      },
      // 保存
      save() {
        state.closeTag({ reload: true })
      },

      // 请求函数
      async editForm(params) {
        // params是从组件接收的，包含分页和搜索字段。
        const { data } = await editDevice(params)

        // 必须要返回一个对象，包含data数据
        // state.formData = data.data
        state.formData = data.data
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
  }
}
.dark .page-box {
  background-color: #111;
}
</style>
