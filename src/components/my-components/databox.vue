<template>
  <!-- 数据盒子 -- 放在首页显示主要信息 -->
  <div id="databox"  :style="{height: '100%', flex: 1,backgroundColor:color,borderRadius:'10px'}">
    <div class="title">
          <i :class="icon" style="font-size: 20px;"></i>
          {{title}}
    </div>
    <div class="number">
      {{number}}
      <!-- 判断是增加或者减少 -->
      <i :class="status?'el-icon-top':'el-icon-bottom'" style="font-size: 34px;font-weight: bold;"></i>
    </div>
    <div class="chart" style="width: 265px;height:100px;font-size: 13px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'SewagecontrolDatabox',

  data() {
    return {
      list:[
        // 设置一个百分比配置标志
        {
          title:'新增问题',
          data_arr:["23", "24", "27", "23", "22", "20", "21"]
        },
        {
          title:'新增用户',
          data_arr:["2", "6", "0", "5", "3", "2", "1"]
        },
        {
          title:"待处理问题",
          data_arr:["2", "13", "7", "13", "2", "0", "13"]
        },
        {
          title:'水质合格率',
          data_arr:["23", "24", "27", "23", "22", "16", "20"],
          isPercent:true
        }
      ]
    };
  },

  mounted() {
   this.initBoxChart()
  },

  methods: {
    initBoxChart(){
     
let Chart = document.getElementsByClassName("chart")
for(let i = 0;i<this.list.length;i++){
  let singleChart = echarts.init(Chart[i])
  const option = {
   backgroundColor: "transparent",
   textStyle: {
      color: 'rgba(255,255,255,0.78)',
   },
   grid: {
      top: '50px',
      right: '0px',
      bottom: '0px',
      left: '0px',
   },
   tooltip: {
      trigger: 'axis',
      padding: [0, 0, 0, 0],
      backgroundColor: '#021D1F',
      borderColor: '#006871',
      width: 20,
      position: 'top',
      axisPointer: {
         type: 'line',
         lineStyle: {
            type: 'dotted',
            width: 0.5,
            color: 'rgba(255,255,255,0.78)',
            cap: 'none',
         },
      },
      textStyle: {
         color: 'rgba(255,255,255,0.78)',
         fontSize: 13,
      },
   },
   legend: {
      right: 0,
      top: '4',
      icon: 'rect',
      itemWidth: 13,
      itemHeight: 4,
      textStyle: {
         color: 'rgba(255,255,255,0.7)'
      },
   },
   dataZoom: [{
      type: 'inside', //1平移 缩放
      throttle: '50', //设置触发视图刷新的频率。单位为毫秒（ms）。
      minValueSpan: 6, //用于限制窗口大小的最小值,在类目轴上可以设置为 5 表示 5 个类目
      start: 1, //数据窗口范围的起始百分比 范围是：0 ~ 100。表示 0% ~ 100%。
      end: 10, //数据窗口范围的结束百分比。范围是：0 ~ 100。
      zoomLock: true, //如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放。
   }],
   xAxis: {
      type: 'category',
      data: ["3.18", "3.19", "3.20", "3.21", "3.22", "3.23", "3.24"],
      axisPointer: {
         show: true,
      },
      axisTick: {
         show: false,
         alignWithLabel: true,
      },
      axisLine: {
         lineStyle: {
            color: 'rgba(255,255,255,0.25)',
         }
      },
      axisLabel: {
         fontFamily: 'DIN Alternate-Bold, DIN Alternate',
         interval: 0,
      },
   },
   yAxis: {
      type: 'value',
      splitLine: {
         show: false
      },
      axisTick: {
         show: false,
      },
      axisLine: {
         show: false, //隐藏X轴轴线
         lineStyle: {
            color: "#163a5f",
            width: 1,
         },
      },
      axisLabel: {
         show: false,
         textStyle: {
            color: "#ccc",
            fontSize: 12,
         },
      },
   },
   series: [
      {
         name:this.list[i].title,
         type: 'line',
         data: this.list[i].data_arr,
         symbol: 'circle',
         symbolSize: 6,
         itemStyle: {
            normal: {
               color: '#fff',
               borderColor: '#00E4F7',
               borderWidth: 1,
               lineStyle: {
                  color: '#00E4F7'
               }
            },
            emphasis: {
               color: '#00E4F7',
               borderColor: '#00E4F7',
               borderWidth: 2,
            }
         },
         label: {
            show: true,
            position: "top",
            distance: 0,
            color: "#fff",
            formatter: this.list[i].isPercent?"{c}%":'{c}',
         },
         areaStyle: {
            origin: 'start',
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
               {
                  offset: 0,
                  color: 'rgba(0,228,247,0.1)'
               },
               {
                  offset: 1,
                  color: 'rgba(0,228,247,0.5)'
               },
            ]),
         },
      },
   ],
};
singleChart.setOption(option)
}
   

    }
  },
  props:{
    icon:{
      required:true,
      type:String
    },
    title:{
      required:true,
      type:String
    },
    number:{
      required:true,
      type:String
    },
    color:{
      required:true,
      type:String
    },
    status:{
      required:true,
      type:Number
    }
  }
};
</script>
<style scoped lang="less">
#databox{
   box-sizing: border-box;
      padding: 15px 15px 0;
      display: flex;
      flex-direction: column;
      color: #fff;
      &:hover{
        filter: brightness(0.9);
      }
      .title{
         box-sizing: border-box;
        font-size: 20px;
        margin-bottom: 8px;
      }
      .number{
         box-sizing: border-box;
        font-size: 36px;
        font-weight: bold;
        text-align: center;
        margin-bottom: -15px;
      }
}
</style>