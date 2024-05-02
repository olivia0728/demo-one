<template>
  <div>
    <div class="container">
      <div class="equipment-test-png">
        <div class="text">监测点1</div>
        <img src="../../assets/河流.png" alt="" />
        <!-- <div class="information">监测点1</div> -->
      </div>
      <div class="equipment-top-echarts">
        <div class="text">监测点1设备评分</div>
        <div class="top-left" ref="chartslefttop"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="first">
        <div class="text">监测点1设备每小时耗电量</div>
        <div class="bottom-left" ref="chartsbottomleft"></div>
      </div>
      <div class="second">
        <div class="text">监测点1设备维修情况</div>
        <div class="bottom-mid" ref="chartsbottommid"></div>
      </div>
      <div class="third">
        <div class="text">监测点1部分设备检测异常次数</div>
        <div class="bottom-right" ref="chartsbottomright"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      myChart: null,
    };
  },
  mounted() {
    this.chartsOne();
    this.chartsTwo();
    this.chartsThree();
    this.chartsFour();
  },
  methods: {
    chartsOne() {
      var myChart = echarts.init(this.$refs.chartslefttop);
      let value = 92;
      var option = {
        tooltip: {},
        title: [
          {
            text: value,
            left: "47%",
            top: "45%",
            textAlign: "center",
            textStyle: {
              fontSize: "50",
              fontWeight: "400",
              color: "#fff",
              textAlign: "center",
            },
          },
          {
            text: "分",
            left: "54%",
            top: "47.5%",
            textAlign: "center",
            textStyle: {
              fontSize: "25",
              fontWeight: "400",
              color: "#fff",
              textAlign: "center",
            },
          },
        ],
        radar: {
          name: {
            textStyle: {
              color: "white",
              fontSize: 15,
            },
          },
          indicator: [
            { name: "单位增加值能耗", max: 6500 },
            { name: "平均能耗", max: 6000 },
            { name: "设备异常", max: 30000 },
            { name: "设备平均在线率", max: 38000 },
            { name: "检测准确度", max: 52000 },
          ],
          axisLine: {
            lineStyle: {
              color: "rgba(53, 113, 176, 1)", // 轴线颜色
            },
          },
          splitArea: {
            show: false,
            areaStyle: {
              color: "rgba(5,31,57,1)", // Rader图背景颜色
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: "rgba(53, 113, 176, 0.8)", // 网格分割线颜色
            },
          },
        },

        series: [
          {
            name: "柔性调控评价",
            type: "radar",
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                areaStyle: {
                  color: "rgba(64, 158, 255, 0.7)",
                },
                itemStyle: {
                  normal: {
                    color: "#4c9bfd",
                    borderColor: "#3278b3",
                  },
                },
                lineStyle: {
                  color: "rgba(64, 158, 255, 0.6)",
                  width: 2,
                  shadowColor: "rgba(0, 0, 255, 0.5)",
                  shadowBlur: 10,
                },
              },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
    chartsTwo() {
      var myChart = echarts.init(this.$refs.chartsbottomleft);
      let initialDate = 1; // 初始日期设置为1号
      let displayDays = 5; // 显示的天数
      let seriesData = [
        [42, 15, 36, 9, 6], // 初始数据，之后会根据新生成的数据动态更新
      ];

      function generateAxisData(start, days) {
        // 生成横坐标数据时考虑月底的情况
        return Array.from({ length: days }, (v, k) => {
          let day = start + k;
          if (day > 24) day -= 24; // 超过30号后从1号开始
          return `${day}h`;
        });
      }

      var option = {
        backgroundColor: "",
        grid: {
          containLabel: true,
          left: 20,
          top: 25,
          bottom: 30,
          right: 30,
        },
        xAxis: {
          type: "category",
          data: generateAxisData(initialDate, displayDays),
          axisLabel: {
            color: "rgb(121, 95, 110)", // 设置横坐标字体颜色为白色
          },
          axisLine: {
            lineStyle: {
              color: "#ccc", // 设置X轴线的颜色为白色
            },
          },
        },
        yAxis: {
          axisLabel: {
            color: "rgb(121, 95, 110)", // 设置横坐标字体颜色为白色
          },
        },
        series: [
          {
            name: "流出",
            type: "line",
            data: seriesData[0],
            itemStyle: {
              normal: {
                color: "#fff",
              },
            },
            lineStyle: {
              normal: {
                color: "rgba(6, 73, 155,0.7)", // 修改线条颜色为蓝绿色
                width: 5, // 可以调整线条宽度
                shadowColor: "rgba(6, 73, 101, 0.5)", // 发光效果的颜色，这里与线条颜色相同
                shadowBlur: 10, // 发光效果的模糊大小
              },
            },
          },
        ],
      };

      myChart.setOption(option);

      setInterval(function () {
        initialDate = (initialDate % 24) + 1; // 每次递增1，到30后重新从1开始
        let newAxisData = generateAxisData(initialDate, displayDays); // 生成新的横坐标数据
        seriesData.forEach(function (series) {
          series.shift(); // 移除第一个数据点
          series.push(Math.round(Math.random() * 100)); // 添加新的随机数据点
        });

        myChart.setOption({
          xAxis: {
            data: newAxisData, // 更新横坐标数据
          },
          series: [
            {
              data: seriesData[0], // 更新系列数据
              itemStyle: {
                normal: {
                  color: "rgb(6, 73, 101)", // 节点颜色
                  borderColor: "rgba(6, 73, 101, 0.3)", // 节点边框颜色
                  borderWidth: 10, // 节点边框宽度
                  shadowColor: "rgba(0, 252, 174, 0.5)", // 发光效果的颜色
                  shadowBlur: 10, // 发光效果的模糊大小
                },
              },
              lineStyle: {
                normal: {
                  color: "rgba(6, 73, 155,0.7)", // 确保新数据也使用了更新后的颜色和发光效果
                  shadowColor: "rgba(6, 73, 101, 0.2)",
                  shadowBlur: 10,
                },
              },
            },
          ],
        });
      }, 2000);
    },
    chartsThree() {
      var myChart = echarts.init(this.$refs.chartsbottommid);
      const typeList = ['电机故障', '机械故障', '其他']; // 类型
const percentList = [45, 35, 20]

/* 数据处理 */
let data = [];
// 空格数据
const sum = percentList.reduce((per, cur) => per + cur, 0);
const gap = (1 * sum) / 100;
const gapData = {
   name: '空格',
   value: gap,
   itemStyle: {
      color: 'transparent',
   },
};
// 颜色系列
const colorList = [{
   x: 0,
   y: 0,
   x2: 0,
   y2: 1,
   colorStops: [{
      offset: 0,
      color: 'rgba(0, 178, 255, 1)' // 0% 处的颜色
   }, {
      offset: 1,
      color: 'rgba(0, 114, 255, 1)' // 100% 处的颜色
   }],
}, {
   x: 0,
   y: 0,
   x2: 0,
   y2: 1,
   colorStops: [{
      offset: 0,
      color: 'rgba(0, 180, 255, 1)' // 0% 处的颜色
   }, {
      offset: 1,
      color: 'rgba(112, 238, 254, 1)' // 100% 处的颜色
   }],
}, {
   x: 0,
   y: 0,
   x2: 0,
   y2: 1,
   colorStops: [{
      offset: 0,
      color: 'rgba(167, 125, 255, 1)' // 0% 处的颜色
   }, {
      offset: 1,
      color: 'rgba(243, 209, 255, 1)' // 100% 处的颜色
   }],
}];
// 循环添加数据
for (let i = 0; i < typeList.length; i++) {
   data.push({
      name: typeList[i],
      value: percentList[i],
      itemStyle: {
         borderRadius: "50%",
         color: colorList[i]
      },
   });
   data.push(gapData)
}

var option = {
   backgroundColor: "",
   legend: {
      type: "scroll",
      orient: 'vertical',
      height: '80%',
      left: '70%',
      top: 'center',
      icon: "roundRect", //设置为圆，删除则为矩形
      itemWidth: 2,
      itemHeight: 16,
      itemGap: 25,
      data: typeList,
      formatter: function (name) {
         console.log(name)
         for (let i = 0; i < typeList.length; i++) {
            if (name == typeList[i]) {
               return `{name|${name}}{value${i}|${percentList[i]}%}`
            }
         }
      },
      textStyle: {
         rich: {
            name: {
               fontSize: 14,
               fontWeight: 400,
               //width: 100,
               height: 16,
               verticalAlign: "top",
               padding: [4, 0, 0, 4],
               color: '#D1E5FF',
               fontFamily: 'Source Han Sans CN-Regular',
            },
            value0: {
               fontSize: 20,
               fontWeight: 500,
               height: 16,
               width: 50,
               align: 'left',
               verticalAlign: "top",
               padding: [5, 0, 0, 16],
               color: "#0090ff",
               fontFamily: 'PangMenZhengDao',
            },
            value1: {
               fontSize: 20,
               fontWeight: 500,
               height: 16,
               width: 50,
               align: 'left',
               verticalAlign: "top",
               padding: [5, 0, 0, 16],
               color: "#3de2ff",
               fontFamily: 'PangMenZhengDao',
            },
            value2: {
               fontSize: 20,
               fontWeight: 500,
               height: 16,
               width: 50,
               align: 'left',
               verticalAlign: "top",
               padding: [5, 0, 0, 16],
               color: "#cfa8ff",
               fontFamily: 'PangMenZhengDao',
            }
         }
      }
   },
   series: [{
      type: 'pie',
      radius: ['43%', '55%'],
      center: ["35%", "50%"],
      label: {
         show: false
      },
      labelLine: {
         show: false
      },
      data: data
   }]
};
      myChart.setOption(option);
    },
    chartsFour() {
      var myChart = echarts.init(this.$refs.chartsbottomright);
      var option = {
        color: [
          "#C58080",
          "#E1A4C4",
          "#C03C71",
          "#8C2487",
          "#503CD0",
          "#7768C1",
        ],

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              color: "white",
              width: 1,
              type: "solid",
            },
          },
        },

        legend: {
          top: "4%",
          textStyle: {
            color: "#FE80C8",
          },
          data: [
            "浊度计",
            "pH计",
            "COD检测仪",
            "氨氮检测仪",
            "总磷检测仪",
            "余氯检测仪",
          ],
        },

        singleAxis: {
          top: 80,
          bottom: 50,
          left: 70,
          right: 70,
          axisLine: {
            lineStyle: {
              color: "#5F4051",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#5F4051",
            },
          },
          type: "time",
          axisPointer: {
            animation: true,
            label: {
              show: true,
            },
          },
        },

        series: [
          {
            type: "themeRiver",
            label: {
              normal: {
                show: false,
                position: "left",
              },
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 20,
                shadowColor: "rgba(0, 0, 0, 0.6)",
              },
            },
            data: [
              ["2023/1", 10, "浊度计"],
              ["2023/2", 15, "浊度计"],
              ["2023/3", 35, "浊度计"],
              ["2023/4", 38, "浊度计"],
              ["2023/5", 22, "浊度计"],
              ["2023/6", 16, "浊度计"],
              ["2023/7", 7, "浊度计"],
              ["2023/8", 2, "浊度计"],
              ["2023/9", 17, "浊度计"],
              ["2023/10", 33, "浊度计"],
              ["2023/11", 40, "浊度计"],
              ["2023/12", 32, "浊度计"],
              ["2023/1", 35, "pH计"],
              ["2023/2", 36, "pH计"],
              ["2023/3", 37, "pH计"],
              ["2023/4", 22, "pH计"],
              ["2023/5", 24, "pH计"],
              ["2023/6", 26, "pH计"],
              ["2023/7", 34, "pH计"],
              ["2023/8", 21, "pH计"],
              ["2023/9", 18, "pH计"],
              ["2023/10", 45, "pH计"],
              ["2023/11", 32, "pH计"],
              ["2023/12", 35, "pH计"],
              ["2023/1", 21, "COD检测仪"],
              ["2023/2", 25, "COD检测仪"],
              ["2023/3", 27, "COD检测仪"],
              ["2023/4", 23, "COD检测仪"],
              ["2023/5", 24, "COD检测仪"],
              ["2023/6", 21, "COD检测仪"],
              ["2023/7", 35, "COD检测仪"],
              ["2023/8", 29, "COD检测仪"],
              ["2023/9", 40, "COD检测仪"],
              ["2023/10", 36, "COD检测仪"],
              ["2023/11", 33, "COD检测仪"],
              ["2023/12", 43, "COD检测仪"],
              ["2023/1", 10, "氨氮检测仪"],
              ["2023/2", 15, "氨氮检测仪"],
              ["2023/3", 35, "氨氮检测仪"],
              ["2023/4", 38, "氨氮检测仪"],
              ["2023/5", 22, "氨氮检测仪"],
              ["2023/6", 16, "氨氮检测仪"],
              ["2023/7", 7, "氨氮检测仪"],
              ["2023/8", 8, "氨氮检测仪"],
              ["2023/9", 17, "氨氮检测仪"],
              ["2023/10", 33, "氨氮检测仪"],
              ["2023/11", 40, "氨氮检测仪"],
              ["2023/12", 32, "氨氮检测仪"],
              ["2023/1", 10, "总磷检测仪"],
              ["2023/2", 15, "总磷检测仪"],
              ["2023/3", 35, "总磷检测仪"],
              ["2023/4", 38, "总磷检测仪"],
              ["2023/5", 22, "总磷检测仪"],
              ["2023/6", 16, "总磷检测仪"],
              ["2023/7", 7, "总磷检测仪"],
              ["2023/8", 12, "总磷检测仪"],
              ["2023/9", 17, "总磷检测仪"],
              ["2023/10", 33, "总磷检测仪"],
              ["2023/11", 40, "总磷检测仪"],
              ["2023/12", 32, "总磷检测仪"],
              ["2023/1", 10, "余氯检测仪"],
              ["2023/2", 15, "余氯检测仪"],
              ["2023/3", 35, "余氯检测仪"],
              ["2023/4", 38, "余氯检测仪"],
              ["2023/5", 22, "余氯检测仪"],
              ["2023/6", 16, "余氯检测仪"],
              ["2023/7", 7, "余氯检测仪"],
              ["2023/8", 2, "余氯检测仪"],
              ["2023/9", 17, "余氯检测仪"],
              ["2023/10", 33, "余氯检测仪"],
              ["2023/11", 4, "余氯检测仪"],
              ["2023/12", 32, "余氯检测仪"],
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  beforeDestroy() {
    if (this.myChart) {
      this.myChart.dispose(); // 正确清理ECharts实例
    }
  },
};
</script>

<style scoped>
/* 添加必要的样式 */
.container {
  height: 50%;
  width: 99%;
  display: flex;
  flex-direction: row;
}
.equipment-test-png {
  height: 400px;
  width: 60%;
  margin: 3px;
}
.equipment-top-echarts {
  height: 400px;
  width: 40%;
  margin: 3px;
}
.top-left {
  height: 400px;
  width: 100%;
  background-image: url("../../assets/设备.png");
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 15px;
}
img {
  width: 100%;
  height: 400px;
  border-radius: 15px;
}
.text {
  border-left: 8px solid rgb(82, 134, 132);
  color: rgb(82, 134, 132);
  padding-left: 3px;
  margin-bottom: 3px;
  font-weight: 500;
  font-size: 18px;
}
.bottom {
  display: flex;
  flex-direction: row;
  height: 450px;
}
.first {
  height: 360px;
  width: 29.5%;
  margin-top: 30px;
}
.bottom-left {
  height: 370px;
  width: 99%;
  /* background-image: url("../../assets/设备.png");
  background-repeat: no-repeat;
  background-size: cover; */
  background-color: white;
  border-radius: 15px;
  margin-left: 3px;
}
.second {
  height: 360px;
  width: 29.5%;
  margin-top: 30px;
}
.bottom-mid {
  height: 370px;
  background-image: linear-gradient(to bottom right, rgb(6, 73, 101),rgb(150, 150, 150));
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 15px;
  margin-left: 6px;
}
.third {
  height: 360px;
  width: 39.8%;
  margin-top: 30px;
}
.bottom-right {
  height: 370px;
  /* background-image: url("../../assets/设备.png");
  background-repeat: no-repeat;
  background-size: cover; */
  background-color: white;
  border-radius: 15px;
  margin-left: 6px;
}
</style>
