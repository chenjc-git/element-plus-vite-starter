export default function DBS() {
  var option = null
  var feathers = [
    'M7.5,12.5A2.5,2.5,0,1,0,10,15,2.5,2.5,0,0,0,7.5,12.5Zm0,4A1.5,1.5,0,1,1,9,15,1.5,1.5,0,0,1,7.5,16.5Z', // 0
    'M1,30H0V0H1Z', // 1
    'M0,0,0,30,1,30,1,1,8,1,8,0,0,0Z', // 2
    'M15,1H1V30H0V0H15Z', // 4
    'M1,1V5H8V6H1V30H0V0H15V1Z', // 6
    'M1,1V5H15V6H1V30H0V0H15V1Z', // 8
    'M1,1V5H15V6H1v4H8v1H1V30H0V0H15V1Z', // 10
    'M1,1V5H15V6H1v4H15v1H1V30H0V0H15V1Z', // 12
    'M1,1V5H15V6H1v4H15v1H1v4H8v1H1V30H0V0H15V1Z', // 14
    'M1,1V5H15V6H1v4H15v1H1v4H15v1H1V30H0V0H15V1Z', // 16
    'M1,1V5H15V6H1v4H15v1H1v4H15v1H1v4H8v1H1v9H0V0H15V1Z', // 18
    'M14.5,0H0V30H1V5.85L14.67,1A.5.5,0,0,0,15,.41.49.49,0,0,0,14.5,0ZM1,4.79V1H11.61Z', // 20
    'M14.5,0H0V30H1V6H8V5H3.39L14.67,1A.5.5,0,0,0,15,.41.49.49,0,0,0,14.5,0ZM1,4.79V1H11.61Z', // 22
    'M15,5H3.39L14.67,1A.5.5,0,0,0,15,.41.49.49,0,0,0,14.5,0H0V30H1V6H15ZM1,1H11.61L1,4.79Z', // 24
    'M15,6V5H3.39L14.67,1A.5.5,0,0,0,15,.41.49.49,0,0,0,14.5,0H0V30H1V11H8V10H1V6ZM1,1H11.61L1,4.79Z', // 26
    'M15,6V5H3.39L14.67,1A.5.5,0,0,0,15,.41.49.49,0,0,0,14.5,0H0V30H1V11H15V10H1V6ZM1,1H11.61L1,4.79Z', // 28
    'M15,6V5H3.39L14.67,1A.5.5,0,0,0,15,.41.49.49,0,0,0,14.5,0H0V30H1V16H8V15H1V11H15V10H1V6ZM1,1H11.61L1,4.79Z', // 30
    'M15,6V5H3.39L14.67,1A.5.5,0,0,0,15,.41.49.49,0,0,0,14.5,0H0V30H1V16H15V15H1V11H15V10H1V6ZM1,1H11.61L1,4.79Z', // 32
    'M15,6V5H3.39L14.67,1A.5.5,0,0,0,15,.41.49.49,0,0,0,14.5,0H0V30H1V21H8V20H1V16H15V15H1V11H15V10H1V6ZM1,1H11.61L1,4.79Z', // 34
    'M15,6V5H3.39L14.67,1A.5.5,0,0,0,15,.41.49.49,0,0,0,14.5,0H0V30H1V21H15V20H1V16H15V15H1V11H15V10H1V6ZM1,1H11.61L1,4.79Z', // 36
    'M15,6V5H3.39L14.67,1A.5.5,0,0,0,15,.41.49.49,0,0,0,14.5,0H0V30H1V26H8V25H1V21H15V20H1V16H15V15H1V11H15V10H1V6ZM1,1H11.61L1,4.79Z', // 38
    'M14.5,5H3.39L14.67,1A.5.5,0,0,0,15,.41.49.49,0,0,0,14.5,0H0V30H1V10.85L14.67,6A.5.5,0,0,0,15,5.41.49.49,0,0,0,14.5,5ZM1,1H11.61L1,4.79ZM1,9.79V6H11.61Z', // 40
    'M14.5,5H3.39L14.67,1A.5.5,0,0,0,15,.41.49.49,0,0,0,14.5,0H0V30H1V11H8V10H3.39L14.67,6A.5.5,0,0,0,15,5.41.49.49,0,0,0,14.5,5ZM1,1H11.61L1,4.79ZM1,9.79V6H11.61Z', // 42
    'M15,10H3.39L14.67,6A.5.5,0,0,0,15,5.41.49.49,0,0,0,14.5,5H3.39L14.67,1A.5.5,0,0,0,15,.41.49.49,0,0,0,14.5,0H0V30H1V11H15ZM1,9.79V6H11.61ZM1,1H11.61L1,4.79Z', // 44
    'M15,11V10H3.39L14.67,6A.5.5,0,0,0,15,5.41.49.49,0,0,0,14.5,5H3.39L14.67,1A.5.5,0,0,0,15,.41.49.49,0,0,0,14.5,0H0V30H1V15H8V14H1V11ZM1,9.79V6H11.61ZM1,1H11.61L1,4.79Z', // 46
    'M15,11V10H3.39L14.67,6A.5.5,0,0,0,15,5.41.49.49,0,0,0,14.5,5H3.39L14.67,1A.5.5,0,0,0,15,.41.49.49,0,0,0,14.5,0H0V30H1V15H15V14H1V11ZM1,9.79V6H11.61ZM1,1H11.61L1,4.79Z', // 48
    'M15,.41a.5.5,0,0,1-.32.56L1,5.85V30H0V0H14.5A.49.49,0,0,1,15,.41Z', // 50
    'M15,.41a.5.5,0,0,1-.32.56L3.39,5H8V6H1V30H0V0H14.5A.49.49,0,0,1,15,.41Z', // 52
    'M15,6H1V30H0V0H14.5A.49.49,0,0,1,15,.42a.49.49,0,0,1-.32.55L3.39,5H15Z', // 54
    'M1,6v4H8v1H1V30H0V0H14.5A.49.49,0,0,1,15,.42a.49.49,0,0,1-.32.55L3.39,5H15V6Z', // 56
    'M1,6v4H15v1H1V30H0V0H14.5A.49.49,0,0,1,15,.42a.49.49,0,0,1-.32.55L3.39,5H15V6Z', // 58
    'M1,6v4H15v1H1v4H8v1H1V30H0V0H14.5A.49.49,0,0,1,15,.42a.49.49,0,0,1-.32.55L3.39,5H15V6Z' // 60
  ]

  function getFeatherColor(speed) {
    return speed <= 4 ? '#0000ff' : speed <= 8 ? '#002aff' : speed <= 12 ? '#0054ff' : speed <= 16 ? '#007eff' : speed <= 20 ? '#00a8ff' : speed <= 24 ? '#00d2ff' : speed <= 28 ? '#14d474' : speed <= 32 ? '#a6dd00' : speed <= 36 ? '#ffe600' : speed <= 40 ? '#ffb300' : speed <= 44 ? '#ff8000' : speed <= 48 ? '#ff4d00' : speed <= 52 ? '#ff1a00' : speed <= 56 ? '#e60000' : '#b30000'
  }
  var getFeather = v => v <= 0 ? 0 : v <= 1 ? 1 : v <= 2 ? 2 : v <= 4 ? 3 : v <= 6 ? 4 : v <= 8 ? 5 : v <= 10 ? 6 : v <= 12 ? 7 : v <= 14 ? 8 : v <= 16 ? 9 : v <= 18 ? 10 : v <= 20 ? 11 : v <= 22 ? 12 : v <= 24 ? 13 : v <= 26 ? 14 : v <= 28 ? 15 : v <= 30 ? 16 : v <= 32 ? 17 : v <= 34 ? 18 : v <= 36 ? 19 : v <= 38 ? 20 : v <= 40 ? 21 : v <= 42 ? 22 : v <= 44 ? 23 : v <= 46 ? 24 : v <= 48 ? 25 : v <= 50 ? 26 : v <= 52 ? 27 : v <= 54 ? 28 : v <= 56 ? 29 : v <= 58 ? 30 : 31
  let data = []
  var hours = [
    '0', '1', '2', '3', '4', '5'
  ]
  option = {
    backgroundColor:'transparent',
    animation: false,
    tooltip: {
      hideDelay:0,
      position: 'top',
      // trigger: 'item',
      formatter: function(params) {
        return [
          '时间：' + params.value[2].time,
          '高度：' + params.value[1] + 'm',
          '风向：' + Number(params.value[2].fHAngle).toFixed(2) + '°',
          '风速：' + Number(params.value[2].fHSpeed).toFixed(2) + 'm/s',
          '垂直气流：' + Number(params.value[2].fVSpeed).toFixed(2) + 'm/s'
        ].join('<br />')
      }
    },
    grid: {
      bottom: '20px',
      left: '110px',
      right: '40px'
    },
    xAxis: {
      type: 'category',
      inverse:false,
      boundaryGap: 1,
      // type: 'time',
      // boundaryGap:true,
      // minInterval:5000,
      // maxInterval:5000,
      // interval:5000,
      // inverse:true,
      // min: function(value) {
      // 	return value.min - 1000;
      // },
      // max: function(value) {
      // 	return value.max + 1000;
      // },
      // splitLine: {
      // 	show: true,
      // 	lineStyle: {
      // 		color: '#ddd'
      // 	},
      // 	interval:'5000'
      // },
      data: hours,
      axisLabel: {
        rotate: 360,
        // color: 'black'
        // formatter: function(value, index){
        // 	return echarts.format.formatTime('hh:mm:ss', new Date(value));
        // }
      },
      splitLine:{
        show:true,
      },
      splitArea:{
        show:true
      }
    },
    // yAxis: {
    //   type: 'category',
    //   data: days,
    //   splitArea: {
    //     show: true
    //   }
    // },
    yAxis: [{
      name: '高度（米）',
      type: 'category',
      boundaryGap:true,
      nameLocation: 'end',
      splitLine: {
        show:true,
      },
      splitArea: {
        show: true
      }
    }],
    visualMap: {
      seriesIndex: [1000],
      type: 'piecewise',
      show: true,
      orient: 'vertical',
      bottom: 'center',
      left: 10,
      itemGap: -2,
      itemWidth: 20,
      itemHeight: 20,
      itemSymbol: 'rect',
      pieces: [{
        gte: 0,
        lt: 4,
        color: getFeatherColor(4),
        label: '4'
      },
      {
        gte: 4,
        lt: 8,
        color: getFeatherColor(8),
        label: '8'
      },
      {
        gte: 8,
        lt: 12,
        color: getFeatherColor(12),
        label: '12'
      },
      {
        gte: 12,
        lt: 16,
        color: getFeatherColor(16),
        label: '16'
      },
      {
        gte: 16,
        lt: 20,
        color: getFeatherColor(20),
        label: '20'
      },
      {
        gte: 20,
        lt: 24,
        color: getFeatherColor(24),
        label: '24'
      },
      {
        gte: 24,
        lt: 28,
        color: getFeatherColor(28),
        label: '28'
      },
      {
        gte: 28,
        lt: 32,
        color: getFeatherColor(32),
        label: '32'
      },
      {
        gte: 32,
        lt: 36,
        color: getFeatherColor(36),
        label: '36'
      },
      {
        gte: 36,
        lt: 40,
        color: getFeatherColor(40),
        label: '40'
      },
      {
        gte: 40,
        lt: 44,
        color: getFeatherColor(44),
        label: '44'
      },
      {
        gte: 44,
        lt: 48,
        color: getFeatherColor(48),
        label: '48'
      },
      {
        gte: 48,
        lt: 52,
        color: getFeatherColor(52),
        label: '52'
      },
      {
        gte: 52,
        lt: 56,
        color: getFeatherColor(56),
        label: '56'
      },
      {
        gte: 52,
        lt: 60,
        color: getFeatherColor(60),
        label: '60'
      }
      ],
      textStyle: {}
    },
    series: [{
      type: 'scatter',
      data: data,
      label: {
        show: true
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      symbol: function(value) {
        const obj = value[2]
        if(obj){
          return 'path://' + feathers[getFeather(Number(obj.fHSpeed))]
        }else{
          return 'path://'
        }
      },
      symbolSize(value) {
        const obj = value[2]
        if (getFeather(Number(obj.fHSpeed)) === 0) {
          return [10, 10]
        } else if (getFeather(Number(obj.fHSpeed)) === 1) {
          return [1, 30]
        } else if (getFeather(Number(obj.fHSpeed)) === 2) {
          return [10, 30]
        } else {
          return [15, 30]
        }
      },
      symbolOffset: function(value) {
        const obj = value[2]
        const symbolRotate = -Number(obj.fHAngle)
        const cos = Math.cos(symbolRotate / 180 * Math.PI)
        const sin = Math.sin(symbolRotate / 180 * Math.PI)
        if (getFeather(Number(obj.fHSpeed) <= 0)) {
          return [0, 0]
        } else if (getFeather(Number(obj.fHSpeed)) === 1) {
          return [0.5 * cos - 15 * sin, -0.5 * sin - 15 * cos]
        } else if (getFeather(Number(obj.fHSpeed)) === 2) {
          return [5 * cos - 15 * sin, -5 * sin - 15 * cos]
        } else {
          return [7.5 * cos - 15 * sin, -7.5 * sin - 15 * cos]
        }
      },
      symbolRotate: function(value) {
        const obj = value[2]
        return - Number(obj.fHAngle)
      },
      itemStyle: {
        color: function(params) {
          const obj = params.value[2]
          return getFeatherColor(Number(obj.fHSpeed))
        }
      }
    }],
    dataZoom: [
      // {
      // type: 'inside',
      // xAxisIndex: 0,
      // minSpan: 5
      // },
      // {
      // 	type: 'slider',
      // 	xAxisIndex: 0,
      // 	minSpan: 5,
      // 	height: 20,
      // 	bottom: 50,
      // 	handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      // 	handleSize: '120%'
      // },
      {
        type: 'inside',
        yAxisIndex: [0, 1],
        minSpan: 1
      },
      {
        type: 'slider',
        right: 10,
        yAxisIndex: [0, 1]
      }
    ]
  }
  this.setTitle = function(arg) {
    arg.text
    arg.subtext
    if (myChart) {
      option.title = arg
      myChart.setOption(option, false, true);
    }
  }
  // this.process = function(fData) {
  //   option.series[0].data = []
  //   for (let index = 0; index < fData.data.length; index++) {
  //     fData.data[index].time = fData.timestamp
  //     var fHei = fData.data[index].fHei
  //     // var fHorChange = fData[index].fHorChange
  //     // var fHAngle = fData.data[index].fHAngle
  //     var fHSpeed = fData.data[index].fHSpeed
  //     // var fSDev = fData.data[index].fSDev
  //     var fVSpeed = fData.data[index].fVSpeed
  //     // var fVerChange = fData.data[index].fVerChange
  //     // var iBelieveable = fData.data[index].iBelieveable
  //     if (Number(fHSpeed) === 999) continue
  //     // option.series[1].data.push([1, fHei, fVSpeed, fData.data[index]])
  //     option.series[0].data.push([0, fHei,fData.data[index]])
  //     option.xAxis.data[0] = fData.timestamp.substr(11,8)
  //   }
  //   if (myChart) {
  //     option.series = option.series;
  //     option.xAxis = option.xAxis;
  //     myChart.setOption(option, false, true);
  //   }
  // }
  let arr = []
  this.clear = function(){
    arr.length = 0
    option.series[0].data=[]
    option.xAxis.data.map((v,k)=>{
      option.xAxis.data[k]=''
    })
    myChart.setOption(option,false,true)
  }
  this.process = function(fData) {
    if(!Array.isArray(fData)){
      fData = [fData]
    }
    fData.forEach(item=>{
      arr.unshift(item)
    })
    option.series[0].data=[]
    myChart.setOption(option,false,true)
    while(arr.length>6)arr.pop()
    arr.map((v,k)=>{
      for (let index = 0; index < v.data.length; index++) {
        v.data[index].time = v.timestamp
        var fHei = v.data[index].fHei
        // var fHorChange = v.data[index].fHorChange
        // var fHAngle = v.data[index].fHAngle
        var fHSpeed = v.data[index].fHSpeed
        // var fSDev = v.data[index].fSDev
        var fVSpeed = v.data[index].fVSpeed
        // var fVerChange = v.data[index].fVerChange
        // var iBelieveable = v.data[index].iBelieveable
        if (Number(fHSpeed) === 999||Number(fHSpeed) === -1000) continue
        // option.series[1].data.push([1, fHei, fVSpeed, fData.data[index]])
        option.series[0].data.push([k, fHei,v.data[index]])
      }
      option.xAxis.data[k] = v.timestamp.substr(11,8)
    })
    if (myChart) {
      myChart.setOption(option,false,true)
    }
  }
  var myChart
  var resizeObserver
  this.init = function(setting) {
    // size = setting.size;
    if(setting.isDark){
      myChart = echarts.init(setting.el,"dark")
    }else{
      myChart = echarts.init(setting.el)
    }
    resizeObserver = new ResizeObserver((entries) => {
      myChart.resize();
    });
    resizeObserver.observe(setting.el);
    myChart.group = 'group'
    echarts.connect('group')
    myChart.setOption(option, false,true)
  }
  this.destroy=function(){
    resizeObserver.disconnect()
    echarts.dispose(myChart)
  }
}
