<template>
  <div>
    <div ref="chart" class="device-status-pie-chart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      trafficWay: [
        {
          name: "正常",
          value: 14294,
        },
        {
          name: "报警",
          value: 3140,
        },
        {
          name: "离线",
          value: 5137,
        },
        {
          name: "故障",
          value: 2450,
        },
      ],
      color: [
        "#00ffff",
        "#409B5C",
        "#006ced",
        "#ffe000",
        "#ffa800",
        "#ff5b00",
        "#ff3000",
      ],
    };
  },
  mounted() {
    const chartDom = this.$refs.chart;
    const myChart = echarts.init(chartDom);
    const seriesOption = this.generateSeriesOption();

    const option = {
      // backgroundColor: "#0b2249",
      color: this.color,
      title: {
        text: "设备状态",
        subtext: "397个",
        top: "41%",
        textAlign: "center",
        left: "44%",
        textStyle: {
          color: "#fff",
          fontSize: 22,
          fontWeight: "400",
          fontWeight: "bold",
        },
        subtextStyle: {
          color: "#00ffff",
          fontSize: 20,
          fontWeight: "normal",
          align: "center",
          fontWeight: "bold",
        },
      },
      graphic: {
        elements: [
          {
            type: "image",
            z: 3,
            style: {
              image: "imageURL", // replace with your image URL
              width: 178,
              height: 178,
            },
            left: "center",
            top: "center",
            position: [100, 100],
          },
        ],
      },
      tooltip: {
        show: false,
      },
      legend: {
        bottom: "20",
        left: "18%",
        icon: "circle",
        orient: "horizontal",
        data: this.trafficWay.map((item) => item.name),
        align: "right",
        textStyle: {
          color: "#fff",
        },
        itemGap: 20,
      },
      toolbox: {
        show: false,
      },
      series: seriesOption,
    };

    myChart.setOption(option);
  },
  methods: {
    generateSeriesOption() {
      const data = [];
      for (let i = 0; i < this.trafficWay.length; i++) {
        data.push(
          {
            value: this.trafficWay[i].value,
            name: this.trafficWay[i].name,
            itemStyle: {
              normal: {
                borderWidth: 5,
                shadowBlur: 20,
                borderColor: this.color[i],
                shadowColor: this.color[i],
              },
            },
          },
          {
            value: 2,
            name: "",
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                  length: 2,
                },
                color: "rgba(0, 0, 0, 0)",
                borderColor: "rgba(0, 0, 0, 0)",
                borderWidth: 0,
              },
            },
          }
        );
      }

      return [
        {
          name: "",
          type: "pie",
          clockWise: false,
          radius: [105, 109],
          hoverAnimation: false,
          left: "-10%", // 将图表整体左移
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: "outside",
                color: "#ddd",
                formatter: (params) => {
                  let percent = 0;
                  let total = 0;
                  for (let i = 0; i < this.trafficWay.length; i++) {
                    total += this.trafficWay[i].value;
                  }
                  percent = ((params.value / total) * 100).toFixed(0);
                  if (params.name !== "") {
                    return (
                      "设备状态：" +
                      params.name +
                      "\n" +
                      "\n" +
                      "占百分比：" +
                      percent +
                      "%"
                    );
                  } else {
                    return "";
                  }
                },
              },
              labelLine: {
                length: 28,
                length2: 40,
                show: true,
                color: "#00ffff",
              },
            },
          },
          data: data,
        },
      ];
    },
  },
};
</script>

<style scoped>
/* 添加样式以适应您的设计 */
.device-status-pie-chart {
  width: 600px;
  height: 400px;
}
</style>
