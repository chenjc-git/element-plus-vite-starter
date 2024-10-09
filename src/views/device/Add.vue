<template>
  <div class="page-box">
    <el-form
        ref="form"
        :model="formData"
        :inline="false"
        label-position="right"
        label-width="120px"
    >
      <div class="head">
        <slot name="title">
          <span class="title">编辑设备: {{ formData.no }}</span>
        </slot>
      </div>
      <div class="form-row-btn" style="padding-right: 50px;">
        <el-form-item class="search-btn" style="width: 100%;">
          <el-button type="primary" icon="ArrowLeft" style="margin-left: auto;" @click="back">返回</el-button>
          <el-button type="primary" icon="Edit" style="margin-left: 20px;" @click="save">保存</el-button>
          <el-button type="primary" icon="Refresh" style="margin-left: 20px;" @click="handleReset">重置</el-button>
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
      <div class="form-row">
        <el-form-item
            key="address"
            label="地址："
            prop="address"
            label-position="left"
        >
          <el-input
              type="text"
              clearable
              v-model="formData.address"
              placeholder="地址"
              style="width: 250px;"
          ></el-input>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
            key="manufacturer"
            label="厂商："
            prop="manufacturer"
            label-position="left"
        >
          <el-input
              type="text"
              clearable
              v-model="formData.manufacturer"
              placeholder="厂商"
              style="width: 250px;"
          ></el-input>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
            key="lng"
            label="经度："
            prop="lng"
            label-position="left"
        >
          <el-input
              type="text"
              clearable
              v-model="formData.lng"
              placeholder="经度"
              style="width: 250px;"
          ></el-input>
        </el-form-item>
        <el-form-item
            key="lat"
            label="纬度："
            prop="lat"
            label-position="left"
            style="margin-left: 50px"
        >
          <el-input
              type="text"
              clearable
              v-model="formData.lat"
              placeholder="纬度"
              style="width: 250px;"
          ></el-input>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
            key="altitude"
            label="海拔高度："
            prop="altitude"
            label-position="left"
        >
          <el-input
              type="text"
              clearable
              v-model="formData.altitude"
              placeholder="海拔高度"
              style="width: 250px;"
          ></el-input>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
            key="height"
            label="气压海拔高度："
            prop="height"
            label-position="left"
        >
          <el-input
              type="text"
              clearable
              v-model="formData.height"
              placeholder="气压海拔高度"
              style="width: 250px;"
          ></el-input>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
            key="data_path"
            label="数据路径："
            prop="data_path"
            label-position="left"
        >
          <el-input
              type="text"
              clearable
              v-model="formData.data_path"
              placeholder="数据路径"
              style="width: 250px;"
          ></el-input>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
            key="color"
            label="颜色："
            prop="color"
            label-position="left"
        >
          <!--          <span class="color-picker">颜色</span>-->
          <el-color-picker v-model="formData.color" />
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
            key="speed"
            label="风速："
            prop="speed"
            label-position="left"
        >
          <el-input-number
              clearable
              v-model="formData.speed"
              :precision="2"
              :step="0.1"
              style="width: 250px;"
          ></el-input-number>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
            key="orientation"
            label="风向："
            prop="orientation"
            label-position="left"
        >
          <el-input-number
              clearable
              v-model="formData.orientation"
              :precision="1"
              :step="0.1"
              style="width: 250px;"
          ></el-input-number>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
            key="hide"
            label="是否隐藏："
            prop="hide"
            label-position="left"
        >
          <el-switch
              v-model="formData.hide"
              inline-prompt
              active-text="是"
              inactive-text="否"
          />
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
            key="data_overtime"
            label="数据超时时长："
            prop="data_overtime"
            label-position="left"
        >
          <el-input-number
              clearable
              v-model="formData.data_overtime"
              :min="0"
              style="width: 210px;"
          ></el-input-number>
          <span style="margin-left: 20px;">s</span>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item
            key="status"
            label="状态："
            prop="status"
            label-position="left"
        >
          <el-select
              v-model="formData.status"
              placeholder="状态"
              style="width: 100px;"
          >
            <el-option
                v-for="option of statusOptions"
                :key="option.value"
                :label="option.name"
                :value="option.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>

    <el-dialog
      title="确认新增"
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
import {computed, defineComponent, onBeforeMount, onMounted, reactive, ref, toRefs, watch} from 'vue'
import useCloseTag from "~/hooks/useCloseTag";
import { save as saveDevice } from "~/api/network/device";
import { getCurrentInstance } from "vue-demi";

export default defineComponent({
  name: 'AddDevice',
  setup() {
    const { proxy } = getCurrentInstance()
    const { closeTag } = useCloseTag()
    const state = reactive({
      form: ref(null),
      closeTag: null,
      formData: {
        id: null,
        uuid: null,
        no: null,
        device_no: null,
        device_name: null,
        device_short_name: null,
        device_type: null,
        device_model: null,
        address: null,
        manufacturer: null,
        lng: null,
        lat: null,
        altitude: null,
        height: null,
        data_path: null,
        color: null,
        speed: null,
        orientation: null,
        hide: null,
        data_overtime: null,
        status: null,
        create_time: null,
      },
      statusOptions: [
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
      // 重置
      handleReset() {
        if (JSON.stringify(state.searchModel) === '{}') {
          return
        }
        state.formData={}
      },

      handleCloseDialog() {
        state.dialogVisible = false;
      },

      async confirmSave() {
        const { data } = await saveDevice(state.formData)
        if (data.code === 200) {
          state.handleCloseDialog()
          state.closeTag()
        }
      },
    })

    const computedStatus = computed({
      get() {
        return Number(state.status) || 0; // 如果state.status不是数值，则返回0
      },
      set(value) {
        if (typeof value === 'number') {
          state.status = value;
        } else {
          console.warn('非法值，已忽略');
          // 可以选择在这里将state.status设置为一个默认值或保留原样
        }
      }
    });

    onBeforeMount(() => {
      state.closeTag = closeTag
    })

    onMounted(async () => {
    })

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
