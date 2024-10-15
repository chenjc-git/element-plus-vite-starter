<template>
  <div class="main">
    <div class="toolbar" style="width: 100%;">
      <el-button type="primary" icon="ArrowLeft" style="margin-left: auto;" @click="back">返回</el-button>
      <el-button type="primary" icon="refresh" @click="refresh">刷新</el-button>
    </div>
    <div class="chartContainer" id="chartMain" ref="chartContainer" style="width: 1000px; height: 500px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import {onBeforeMount, onMounted, reactive, ref, toRefs, watch} from "vue";
import { getLatestDeviceStatus } from "~/api/network/device_status";
import { getCurrentInstance } from "vue-demi";
import useCloseTag from "~/hooks/useCloseTag";

export default {
  name: 'DeviceStatusChart',
  setup() {
    const { proxy } = getCurrentInstance();
    const { closeTag } = useCloseTag()
    const chartContainer = ref(null)
    const state = reactive({
      closeTag: null,
      device_no: null,
      chart: null,
      chartData: [],
      options: null,
      initChart() {
        state.chart = echarts.init(chartContainer.value);
        state.option = {
          title: {
            id: 1,
            text: '设备状态：' + state.device_no,
            subText: '设备状态',
            textStyle: {
              fontSize: '20px',
              fontStyle: 'italic',
              fontWeight: 'bold',
            },
          },
          xAxis: {
            type: 'category',
            name: '时间',
            boundaryGap: false,
            data: [],
          },
          yAxis: {
            type: 'value',
            name: '状态',
            show: true,
            data: [0,1,2,3],
            splitLine: {
              show: false
            },
            axisTick: {
              show: true,
              interval: 'auto',
            },
            axisLabel: {
              formatter: function (value) {
                let statusMap = {
                  0: '未知',
                  1: '正常',
                  2: '延迟',
                  3: '缺失'
                };
                return statusMap[value];
              }
            }
          },
          series: [
            {
              name: '数据',
              type: 'line',
              data: [],
            },
          ],
        }
        state.chart.setOption(state.option);
        state.getLatestDeviceStatus();
      },
      // 请求函数
      async getLatestDeviceStatus() {
        state.device_no = proxy.$route.params.device_no
        // params是从组件接收的，包含分页和搜索字段。
        const { data } = await getLatestDeviceStatus(proxy.$route.params)

        // 必须要返回一个对象，包含data数组和total总数
        state.chartData = data.data
        state.updateChartData()
      },
      updateChartData() {
        // 对新数据进行排序

        let xAxisData = state.chartData.map(item => item['status_time'])
        let statusData = state.chartData.map(item => item['device_data_status'])
        state.option = {
          title: {
            text: '设备状态：' + state.device_no,
          },
          xAxis: {
            data: xAxisData
          },
          yAxis: {
          },
          series: [{
            // 假设只有一个系列，且数据直接对应
            data: statusData
          }]
        };
        state.chart.setOption(state.option);
      },
      back() {
        state.closeTag()
      },
      refresh() {
        state.getLatestDeviceStatus()
      }
    })

    onMounted(() => {
      echarts.use([
        TitleComponent,
        TooltipComponent,
        GridComponent,
        LineChart,
        CanvasRenderer,
        UniversalTransition
      ]);
      state.initChart()
    })

    onBeforeMount(() => {
      state.closeTag = closeTag
    })

    // 监听路由参数变化
    watch(() => proxy.$route.params, (newParams) => {
      if (JSON.stringify(newParams) !== '{}') {
        state.getLatestDeviceStatus()  // 当路由参数变化时重新加载数据
      }
    });

    return {
      ...toRefs(state),
      chartContainer
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  min-height: 100%;
  background: #fff;
  position: absolute;
  .toolbar {
    padding: 40px 40px 0;
    width: 100%;
    flex-wrap: wrap;
    display: flex;
    box-sizing: border-box; /* 这是关键：width100%+padding宽度不会超过容器宽度 */
    overflow: hidden;
  }
  .chartContainer {
    padding: 20px 40px 0;
  }
}

.dark .main {
  background-color: #111;
}
</style>