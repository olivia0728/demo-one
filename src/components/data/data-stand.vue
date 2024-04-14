<template>
  <div class="data-stand">
   <!-- 污水实时数据 -->
   <Header :title="'污水实时数据'"></Header>
   <div id="chart1" style="width: 100%;height:720px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'SewagecontrolDataStand',

  data() {
    return {
      
    };
  },

  mounted() {
    this.chartsOne()
  },

  methods: {
    chartsOne() {
    var myChart = echarts.init(document.getElementById('chart1'));
    let legendData =  ['水温', 'PH值','溶解氧','氨氮','总磷','总氮','电导率','高锰酸钾'];
    // 设置当前时间
    
    let xAxisData = ['1', '2', '3', '4', '5', '6', '7']
    // 设置展示数据
    let temperature = [20.2,21,23,24.5,21,20,23]
    let ph = [8.2,6.5,7.1,9.2,7.3,6.5,8.1]
    let oxygen = [9.1,8.2,6.4,7,8.3,8,9.2]
    let AmmoniaNitrogen = [0.23,0.21,0.44,0.56,0.44,0.89,0.21]
    let phosphorus = [0.22,0.34,0.54,0.11,0.34,0.75,0.26]
    let totalNitrogen = [2.1,3.4,1.2,3.2,4.4,3.6,1.3]
    let electricConductivity = [13,22,24,10,31,32,21]
    let potassiumPermanganate = [1.5,2.3,3.1,2.4,1.1,4.3,2.6]

    var option = {
      backgroundColor:"#064965",
      tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
      },
      title: {
        text: '', // 图表名称
        top: 18, // 标题的垂直位置，默认是top，其它值有middle，bottom
        left:30,
        textStyle: {
            color: '#fff', // 标题颜色
            fontSize:18,
            fontFamily: '宋体'
        }
    },
      grid: {
          top: '20%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
      },
      legend: {
          icon: 'rect',
          right: 10,
          top: 25,
          itemWidth: 7, // 设置宽度
          itemHeight: 7, // 设置高度
          itemGap: 15, // 设置间距
          textStyle: { //图例文字的样式
            color: '#89BFE5',
            fontSize: 12
          }
      },
      xAxis: {
          boundaryGap: true,
          data: xAxisData,
          axisLine: {
            lineStyle: {
                color: "rgba(117, 168, 202, 0.4)"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#fff'
          }
      },
      yAxis: [{
          // name: '单位：个',
          // type: "value",
          inverse: false,
          splitLine: {
            show: true,
            lineStyle: {
                color: 'rgba(117, 168, 202, 0.3)',
                type: 'dashed'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
                color: "#0A5C95"
            }
          },
          axisLabel: {
            // 内容格式器
            // 保留小数点后两位
     formatter:function(value,index){
        return value.toFixed(2)   
     },
            textStyle: {
                color: '#89BFE5',
                fontSize: 12
            }
          },
          nameTextStyle: {
            color: '#89BFE5',
            padding: [0, 0, 0, 15],
            fontSize: 12
          },
          axisTick: {
            show: false
          }
      }],
      series: [
          {
            name: legendData[0],
            type: "line",
            symbol: 'circle', //设定为实心点
            showAllSymbol: true,
            symbolSize: 5,
            smooth: true,
            itemStyle: {
                normal: {
                  color: `#2BDFD4`,
                  lineStyle: { //线的颜色
                      color: `#2BDFD4`,
                      width: 1.5
                  },
                  areaStyle: {

                      //新版渐变色实现
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                              offset: 0,
                              color: 'rgba(1, 180, 255, 0.2)'
                            },
                            {
                              offset: 1,
                              color: 'rgba(1, 180, 255, 0.1)'
                            }
                        ]
                      }
                  },
                }
            },
            data: temperature
          },
          {
            name: legendData[1],
            type: "line",
            symbol: 'circle', //设定为实心点
            showAllSymbol: true,
            symbolSize: 5,
            smooth: true,
            itemStyle: {
                normal: {
                  color: `#219ddf`,
                  lineStyle: { //线的颜色
                      color: `#219ddf`,
                      width: 1.5
                  },
                  areaStyle: {

                      //新版渐变色实现
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                              offset: 0,
                              color: 'rgba(89, 182, 222, 0.2)'
                            },
                            {
                              offset: 1,
                              color: 'rgba(89, 182, 222, 0.1)'
                            }
                        ]
                      }
                  },
                }
            },
            data: ph
          },
          {
            name: legendData[2],
            type: "line",
            symbol: 'circle', //设定为实心点
            showAllSymbol: true,
            symbolSize: 5,
            smooth: true,
            itemStyle: {
                normal: {
                  color: `#21df96`,
                  lineStyle: { //线的颜色
                      color: `#21df96`,
                      width: 1.5
                  },
                  areaStyle: {

                      //新版渐变色实现
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                              offset: 0,
                              color: 'rgba(82, 185, 140, 0.2)'
                            },
                            {
                              offset: 1,
                              color: 'rgba(82, 185, 140, 0.1)'
                            }
                        ]
                      }
                  },
                }
            },
            data: oxygen
          },
          {
            name: legendData[3],
            type: "line",
            symbol: 'circle', //设定为实心点
            showAllSymbol: true,
            symbolSize: 5,
            smooth: true,
            itemStyle: {
                normal: {
                  color: `#5121df`,
                  lineStyle: { //线的颜色
                      color: `#5121df`,
                      width: 1.5
                  },
                  areaStyle: {

                      //新版渐变色实现
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                              offset: 0,
                              color: 'rgba(140, 92, 199, 0.2)'
                            },
                            {
                              offset: 1,
                              color: 'rgba(140, 92, 199, 0.1)'
                            }
                        ]
                      }
                  },
                }
            },
            data: phosphorus
          },
          {
            name: legendData[4],
            type: "line",
            symbol: 'circle', //设定为实心点
            showAllSymbol: true,
            symbolSize: 5,
            smooth: true,
            itemStyle: {
                normal: {
                  color: `#df6d21`,
                  lineStyle: { //线的颜色
                      color: `#df6d21`,
                      width: 1.5
                  },
                  areaStyle: {

                      //新版渐变色实现
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                              offset: 0,
                              color: 'rgba(199, 135, 92, 0.2)'
                            },
                            {
                              offset: 1,
                              color: 'rgba(199, 135, 92, 0.1)'
                            }
                        ]
                      }
                  },
                }
            },
            data: totalNitrogen
          },
          
          {
            name: legendData[5],
            type: "line",
            symbol: 'circle', //设定为实心点
            showAllSymbol: true,
            symbolSize: 5,
            smooth: true,
            itemStyle: {
                normal: {
                  color: `#b0df21`,
                  lineStyle: { //线的颜色
                      color: `#b0df21`,
                      width: 1.5
                  },
                  areaStyle: {

                      //新版渐变色实现
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                              offset: 0,
                              color: 'rgba(177, 199, 92, 0.2)'
                            },
                            {
                              offset: 1,
                              color: 'rgba(177, 199, 92, 0.1)'
                            }
                        ]
                      }
                  },
                }
            },
            data: electricConductivity
          },
          {
            name: legendData[6],
            type: "line",
            symbol: 'circle', //设定为实心点
            showAllSymbol: true,
            symbolSize: 5,
            smooth: true,
            itemStyle: {
                normal: {
                  color: `#FFD076`,
                  lineStyle: { //线的颜色
                      color: `#FFD076`,
                      width: 1.5
                  },
                  areaStyle: {

                      //新版渐变色实现
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                              offset: 0,
                              color: 'rgba(255, 223, 4, 0.2)'
                            },
                            {
                              offset: 1,
                              color: 'rgba(255, 223, 4, 0.1)'
                            }
                        ]
                      }
                  },
                }
            },
            data: potassiumPermanganate
          },
          {
            name: legendData[7],
            type: "line",
            symbol: 'circle', //设定为实心点
            showAllSymbol: true,
            symbolSize: 5,
            smooth: true,
            itemStyle: {
                normal: {
                  color: `#df5d21`,
                  lineStyle: { //线的颜色
                      color: `#df5d21`,
                      width: 1.5
                  },
                  areaStyle: {

                      //新版渐变色实现
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                              offset: 0,
                              color: 'rgba(205, 96, 65, 0.2)'
                            },
                            {
                              offset: 1,
                              color: 'rgba(205, 96, 65, 0.1)'
                            }
                        ]
                      }
                  },
                }
            },
            data: AmmoniaNitrogen
          }
      ]
    };
    // 初始设置图表
    myChart.setOption(option);
    // 定义随机数函数
    function getRandom(min,max){
      return (Math.random() * (max - min) + min).toFixed(2);
    }
    // 定义更新图表的函数
    function updateChartData() {
        // 模拟每次新增一个月的数据
        let nextMonth = xAxisData.length + 1;
        let newMonth = `${nextMonth}`;
        xAxisData.push(newMonth);

        // 为了简化演示，这里我们假设y轴的数据是随机生成的
        let newTemperature = getRandom(15,24);
        let newPh =  getRandom(7,9);
        let newOxygen = getRandom(6,12);
        let newAmmoniaNitrogen = getRandom(0,1);
        let newPhosphorus =  getRandom(0,1);
        let newTotalNitrogen = getRandom(0,4);
        let newELectricConductivity =  getRandom(10,40);
        let newPotassiumPermanganate = getRandom(1,3);

        temperature.push(newTemperature);
        ph.push(newPh);
        oxygen.push(newOxygen);
        AmmoniaNitrogen.push(newAmmoniaNitrogen);
        phosphorus.push(newPhosphorus);
        totalNitrogen.push(newTotalNitrogen);
       electricConductivity.push(newELectricConductivity);
        potassiumPermanganate.push(newPotassiumPermanganate);

        // 确保数据数组不会无限制增长
        if (xAxisData.length >= 28) {
            xAxisData.shift(); // 移除数组的第一个元素
            temperature.shift(); // 同上
            ph.shift(); // 同上
            oxygen.shift();
            AmmoniaNitrogen.shift();
            phosphorus.shift();
            totalNitrogen.shift();
            electricConductivity.shift();
            potassiumPermanganate.shift();
        }

        myChart.setOption({
            xAxis: {
                data: xAxisData
            },
            series: [
            {
                name: legendData[0],
                data: temperature
            }, 
            {
                name: legendData[1],
                data: ph
            },
            {
                name: legendData[2],
                data: oxygen
            }, 
            {
                name: legendData[3],
                data: AmmoniaNitrogen
            },
            {
                name: legendData[4],
                data: phosphorus
            }, 
            {
                name: legendData[5],
                data: totalNitrogen
            }, 
            {
                name: legendData[6],
                data: electricConductivity
            },
            {
                name: legendData[7],
                data: potassiumPermanganate
            }
          
          ]
        });
    }

    // 每1分钟更新一次数据
    setInterval(updateChartData, 6000);
    }
  },
};
</script>
<style scoped lang="less">
</style>