<template>
  <div class="warning-detail">
    <Header :title="Query.title+' - 数据详情'"></Header>
    <!-- 图表 -->
    <div id="chart" style="width: 100%;height: 675px;"></div>
  </div>
</template>

<script>
import Header from '../my-components/header';
import * as echarts from "echarts";
export default {
  name: 'SewageControlProjectWarningDetail',

  data() {
    return {
      // 接收的参数
      Query:{}
    };
  },

  mounted() {
    // 初始加载时赋值
    this.getQuery()
    // 初始化图表
    this.initChart()
  },

  methods: {
    getQuery(){
      this.Query = JSON.parse(this.$route.query.query)
      console.log(this.Query)
    },
    initChart(){
      var Chart = echarts.init(document.getElementById("chart"));
       const option = {
   backgroundColor: '#0b4057',
    tooltip: {
        trigger: 'axis',
    },
    grid: {
        top: '15%',
        right: '5%',
        left: '6%',
        bottom: '15%'
    },

    xAxis: [{
        name: '',
        type: 'category',
        axisLabel: {
            color: '#fff'
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: '#fff'
            }
        },
        axisTick: {
            show: false,
        },
        splitLine: {
            show: false,
            lineStyle: {
                color: '#2689b4',
                type: "dotted",
            }
        },
        data: ["1","2","3","4","5","6","7","8","9","10","11","12"] 
    }],
    yAxis: [
        {
            type: 'value',
            name: "",
            min: 0,
            position: 'left',
            nameTextStyle: {
                color: "#fff",
                fontSize: 11,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#fff'
                }
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#2689b4',
                    type: "dotted",
                }
            },
            axisLabel: {
                formatter: '{value}',
                textStyle: {
                    color: "#fff",
                }
            },
        }
    ],
    series: [
	{
		name:'',
		type: 'line',
		// smooth: true, //是否平滑
		showAllSymbol: true,
		// symbol: 'image://./static/images/guang-circle.png',
		symbol: 'circle',
		symbolSize: 10,
		lineStyle: {
			normal: {
				color: "#2689b4",
			},
		},
		label: {
			show: true,
			position: 'top',
			textStyle: {
				color: '#fff',
			}
		},
		itemStyle: {
			color: "#fff",
			borderColor: "#2689b4",
			borderWidth: 3,
		},
		areaStyle: {
		    normal: {
		        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                offset: 0,
		                color: 'rgba(150, 219, 248,0.5)'
		            },
		            {
		                offset: 1,
		                color: 'rgba(57, 148, 187, 0.5)'
		            }
		        ], false),
		        shadowColor: 'RGBA(80, 38, 72, 0.2)',
		        shadowBlur: 20
		    }
		},
		data:this.Query.data
	}
    ]
       };
       Chart.setOption(option)
    }
  },
  components:{
    Header
  }
};
</script>