<template>
  <div id="data-analyze">
    <!-- 数据分析 -->
    <Header :title="'历史数据分析'"></Header>
    <div class="row1-title">
      <div class="main-title">最近一周污水相关数据</div>
    </div>

    <div class="chart-row1" style="width: 100%">
      <div class="chart-col1" style="width: 60%">
        <div id="chart1" style="width: 100%; height: 400px"></div>
      </div>
      <div class="chart-col2" style="width: 40%">
        <div class="titleBox">
          <div class="singleTitle">一周污水类型占比</div>
          <div class="singleTitle">一周污水程度占比</div>
        </div>
        <div id="chart2" style="width: 100%; height: 354px"></div>
      </div>
    </div>
    <!-- 分割线 -->
    <div class="split-line" style="height: 10px"></div>
    <!-- 弹出层 -->
    <el-dialog
      title="  日数据详情 "
      :visible.sync="isDialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <div class="dialog-content">
        <div class="top-box">{{ selectedDate }}</div>
        <el-divider> </el-divider>
        <div class="middle-box">
          <div style="width: 33%">
            <el-statistic title="今日预警" :value="26" />
          </div>
          <div style="width: 33%">
            <el-statistic title="今日隐患" :value="50" />
          </div>
          <div style="width: 33%">
            <el-statistic title="今日解决" :value="68" />
          </div>
        </div>
        <el-divider> </el-divider>
        <div class="bottom-box">
          <div class="left-box" style="width: 50%">
            <div id="leftChart" style="height: 300px"></div>
          </div>
          <div class="right-box" style="width: 50%">
            <div id="rightChart" style="height: 300px"></div>
          </div>
        </div>
        <el-divider> </el-divider>

        <div class="other-box">
          <div class="left" style="width: 50%">
            <div id="map-one" style="width: 100%; height: 390px"></div>
          </div>
          <div class="right" style="width: 50%">
            <div id="heatmap" style="height: 390px"></div>
          </div>
        </div>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
         <el-button @click="handleDialogClose">关闭</el-button> 
      </span> -->
    </el-dialog>
    <!-- 成都市数据 -->
    <div class="chart-row2" style="width: 100%">
      <div class="chart-col4" style="width: 38%">
        <div class="col4-title">成都市各区污水占比分布图</div>
        <div class="map" ref="map" style="width: 100%; height: 390px"></div>
      </div>
      <div class="chart-col3" style="width: 62%">
        <div class="col3-title">
          新都区
          <span style="color: aliceblue; cursor: pointer" @click="changeAddress"
            >(定位)</span
          >
          污水占比分布图
        </div>
        <div id="chart3" style="width: 100%; height: 400px"></div>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="table">
      <div class="table-title">
        <div class="main-title">实时数据详情表格</div>
      </div>
      <el-table :data="tableData" style="width: 100%" height="600">
        <el-table-column fixed prop="province" label="省份" width="80">
        </el-table-column>
        <el-table-column prop="city" label="城市" width="90"> </el-table-column>
        <el-table-column prop="name" label="断面名称" width="125">
        </el-table-column>
        <el-table-column prop="longitude" label="经度" width="90">
        </el-table-column>
        <el-table-column prop="latitude" label="纬度" width="90">
        </el-table-column>
        <el-table-column prop="quality" label="水质类别" width="80">
        </el-table-column>
        <el-table-column prop="temperature" label="水温" width="70">
        </el-table-column>
        <el-table-column prop="ph" label="ph值" width="65"> </el-table-column>
        <el-table-column prop="oxygen" label="溶解氧" width="70">
        </el-table-column>
        <el-table-column prop="AmmoniaNitrogen" label="氨氮" width="70">
        </el-table-column>
        <el-table-column prop="phosphorus" label="总磷" width="65">
        </el-table-column>
        <el-table-column prop="totalNitrogen" label="总氮" width="65">
        </el-table-column>
        <el-table-column prop="turbidity" label="浊度" width="80">
        </el-table-column>
        <el-table-column prop="electricConductivity" label="电导率" width="70">
        </el-table-column>
        <el-table-column
          prop="potassiumPermanganate"
          label="高锰酸钾"
          width="80"
        >
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination class="pages" layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import "echarts-liquidfill";
import * as echarts from "echarts";
import mapJson from "../../../src/show_data/map.json";
// 导入表格数据
import { table_data } from "../../table-data/tableData.js";
// 导入头部
import Header from "../my-components/header";
export default {
  name: "SewagecontrolDataAnalyze",

  data() {
    return {
      chart: null,
      //日数据
      lineChart: null,
      pieChart1: null,
      pieChart2: null,
      //存储日期
      selectedDate: null,
      isDialogVisible: false,
      // 显示污染类型占比
      showChartType: [
        { value: 30, name: "工业废物" },
        { value: 30, name: "生活垃圾" },
        { value: 20, name: "天气灾害" },
        { value: 20, name: "其他类型" },
      ],
      showTypeColor: ["#146de0", "#27ef5e", "#ffc140", "#d151d8"],
      // 显示污染程度占比
      showChartLevel: [
        { value: 10, name: "重度污染" },
        { value: 20, name: "中度污染" },
        { value: 30, name: "轻度污染" },
        { value: 40, name: "微度污染" },
      ],
      showLevelColor: ["#146de0", "#27ef5e", "#ffc140", "#d151d8"],
      tableData: table_data,
    };
  },
  created() {
    // 在页面加载时从 URL 参数获取选择的日期
    const urlParams = new URLSearchParams(window.location.search);
    this.selectedDate = urlParams.get("date");

    // 如果有选择的日期，则显示弹出层
    if (this.selectedDate) {
      this.isDialogVisible = true;
    }
  },
  mounted() {
    this.initChartCol1();
    this.initChartCol2();
    this.initChartCol3();
    this.initChartCol4();
    this.$nextTick(() => {
      this.initCharts();
    });
  },

  methods: {
    //日数据
    initCharts() {
      //实时柱状图
      var heatChart = echarts.init(document.getElementById("heatmap"));
      var option = {
        title: {
          text: "各污染物实时变化数据",
          left: "center",
          top: "5%",
          textStyle: {
            color: "#fff",
            fontSize: 18,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>数值：{c}",
        },
        xAxis: {
          max: "dataMax",
          axisLabel: {
            color: "white",
          },
        },
        yAxis: {
          type: "category",
          data: ["磷", "氮", "重金属", "硫酸盐", "铀"],
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300,
          max: 5,
          axisLabel: {
            color: "white",
          },
        },
        series: [
          {
            realtimeSort: true,
            name: "实时变化",
            type: "bar",
            data: [],
            label: {
              show: true,
              position: "right",
              valueAnimation: true,
            },
          },
        ],

        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: "linear",
        animationEasingUpdate: "linear",
      };
      heatChart.setOption(option);

      // 定义更新数据的函数
      function run() {
        const randomData = [];
        for (let i = 0; i < 5; i++) {
          randomData.push(Math.round(Math.random() * 100));
        }
        // 更新 heatChart 实例中的数据
        heatChart.setOption({
          series: [
            {
              type: "bar",
              data: randomData,
            },
          ],
        });
      }
      run(); // 初始化数据
      // 设置定时器，每 3000 毫秒更新一次数据
      setInterval(run, 3000);
      //地图
      var myChart = echarts.init(document.getElementById("map-one"));
      myChart.setOption({
        title: {
          text: "成都各地区污水占比",
          left: "center",
          top: "5%",
          textStyle: {
            color: "#fff",
            fontSize: 18,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>污水占比：{c}%",
        },
        series: [
          {
            type: "map",
            map: "chengdu",
            data: [
              {
                name: "锦江区",
                value: 55,
                itemStyle: { normal: { areaColor: "#ee6666" } },
              },
              {
                name: "新都区",
                value: 12,
                itemStyle: { normal: { areaColor: "#f39c51" } },
              },
              {
                name: "双流区",
                value: 20,
                itemStyle: { normal: { areaColor: "#fac858" } },
              },
              {
                name: "青羊区",
                value: 34,
                itemStyle: { normal: { areaColor: "#f39c51" } },
              },
              {
                name: "武侯区",
                value: 11,
                itemStyle: { normal: { areaColor: "#fac858" } },
              },
              {
                name: "成华区",
                value: 17,
                itemStyle: { normal: { areaColor: "#f39c51" } },
              },
              {
                name: "金牛区",
                value: 12,
                itemStyle: { normal: { areaColor: "#91cc75" } },
              },
              {
                name: "龙泉驿区",
                value: 11,
                itemStyle: { normal: { areaColor: "#fac858" } },
              },
              {
                name: "青白江区",
                value: 20,
                itemStyle: { normal: { areaColor: "#f39c51" } },
              },
              {
                name: "温江区",
                value: 20,
                itemStyle: { normal: { areaColor: "#f39c51" } },
              },
              {
                name: "郫都区",
                value: 15,
                itemStyle: { normal: { areaColor: "#ee6666" } },
              },
              {
                name: "新津区",
                value: 11,
                itemStyle: { normal: { areaColor: "#91cc75" } },
              },
              {
                name: "大邑县",
                value: 2,
                itemStyle: { normal: { areaColor: "#f39c51" } },
              },
              {
                name: "金堂县",
                value: 5,
                itemStyle: { normal: { areaColor: "#91cc75" } },
              },
              {
                name: "蒲江县",
                value: 10,
                itemStyle: { normal: { areaColor: "#f39c51" } },
              },
            ],
            zoom: 0.9,
            itemStyle: {
              // 普通状态下的样式
              normal: {
                // 地图区域的颜色
                areaColor: "#23a5d4",
                // 地图边界线的颜色
                borderColor: "#fff",
              },
              // 高亮状态下的样式
              emphasis: {
                // 鼠标悬停时地图区域的颜色
                areaColor: "#b7d4a5",
              },
            },
          },
        ],
      });
      // 左侧图表
      var leftChart = echarts.init(document.getElementById("leftChart"));
      leftChart.setOption({
        title: {
          text: "污染程度总占比",
          left: "center",
          top: "5%",
          textStyle: {
            color: "#fff",
            fontSize: 18,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "horizontal",
          bottom: 0,
          textStyle: {
            color: "white",
          },
          data: ["重度", "中度", "轻度", "微度"],
        },
        series: [
          {
            name: "污染程度总占比",
            type: "pie",
            radius: "44%",
            center: ["50%", "50%"],
            label: {
              lineLength: 2, // 调整扇形的线条长度
            },
            data: [
              { value: 12, name: "重度" },
              { value: 36, name: "中度" },
              { value: 24, name: "轻度" },
              { value: 28, name: "微度" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });

      // 右侧折线图
      var rightChart = echarts.init(document.getElementById("rightChart"));
      rightChart.setOption({
        title: {
          text: "每时段污染物质含量",
          left: "center",
          top: "5%",
          textStyle: {
            color: "#fff",
            fontSize: 18,
          },
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [
            "污染物质1",
            "污染物质2",
            "污染物质3",
            "污染物质4",
            "污染物质5",
          ],
          bottom: 0,
          textStyle: {
            color: "white",
          },
        },
        xAxis: {
          type: "category",
          data: ["4:00", "8:00", "12:00", "16:00", "20:00", "0:00"],
          axisLabel: {
            color: "white", // 将横坐标文字颜色设置为白色
          },
        },
        yAxis: {
          type: "value",
          name: "含量",
          min: 0.0,
          axisLabel: {
            color: "white", // 将纵坐标文字颜色设置为白色
          },
          nameTextStyle: {
            color: "white", // 将纵坐标文字颜色设置为白色
          },
        },
        series: [
          {
            name: "污染物质1",
            type: "line",
            data: [0.002, 0.004, 0.001, 0.006, 0.007, 0.006],
          },
          {
            name: "污染物质2",
            type: "line",
            data: [0.004, 0.005, 0.003, 0.004, 0.003, 0.004],
          },
          {
            name: "污染物质3",
            type: "line",
            data: [0.001, 0.003, 0.002, 0.002, 0.001, 0.002],
          },
          {
            name: "污染物质4",
            type: "line",
            data: [0.002, 0.003, 0.002, 0.003, 0.002, 0.003],
          },
          {
            name: "污染物质5",
            type: "line",
            data: [0.001, 0.002, 0.001, 0.001, 0.001, 0.001],
          },
        ],
      });
    },
    // 关闭弹出层
    handleDialogClose() {
      this.isDialogVisible = false;
    },
    //

    handleClose() {
      this.isDialogVisible = false; // 关闭弹窗
    },
    initChartCol1() {
      var myChart = echarts.init(document.getElementById("chart1"));
      let legendData = [
        "一周内污水处理率",
        "一周内污水产生率",
        "一周净处理率百分比",
      ];
      let xAxisData = ["3.19", "3.20", "3.21", "3.22", "3.23", "3.24", "3.25"];
      let seriesData1 = [40, 30, 34, 56, 61, 54, 60];
      let seriesData2 = [20, 35, 26, 45, 67, 22, 34];
      let seriesData3 = [20, 5, 8, 11, 6, 32, 26];
      const option = {
        backgroundColor: "#064965",
        tooltip: {
          trigger: "axis",
          // 设置显示数据百分比
          formatter: function (params) {
            var html = params[0].name + "<br>";
            for (var i = 0; i < params.length; i++) {
              html += params[i].marker + params[i].value;
              if (option.series[params[i].seriesIndex].valueType == "percent") {
                html += "%";
              }
            }
            return html + "<br>";
          },
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          top: "20%",
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true,
        },
        // 图像说明
        legend: {
          icon: "rect",
          right: "5%",
          top: "2%",
          itemWidth: 7, // 设置宽度
          itemHeight: 7, // 设置高度
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 13,
          },
        },
        xAxis: {
          boundaryGap: true,
          data: xAxisData,
          axisLine: {
            lineStyle: {
              color: "rgba(117, 168, 202, 0.9)",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#fff",
          },
        },
        yAxis: [
          {
            name: "单位：%",
            type: "value",
            inverse: false,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(117, 168, 202, 0.3)",
                type: "dashed",
              },
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#0A5C95",
              },
            },
            axisLabel: {
              formatter: "{value}%",
              textStyle: {
                color: "#89BFE5",
                fontSize: 12,
              },
            },
            nameTextStyle: {
              color: "#89BFE5",
              padding: [0, 0, 0, 15],
              fontSize: 12,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            valueType: "percent",
            name: legendData[0],
            type: "line",
            symbol: "circle", //设定为实心点
            showAllSymbol: true,
            symbolSize: 0,
            smooth: true,
            itemStyle: {
              normal: {
                color: `#1B86E9`,
                lineStyle: {
                  //线的颜色
                  color: `#1B86E9`,
                  width: 1.5,
                },
                areaStyle: {
                  type: "default",
                  //渐变色实现
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1, //变化度
                    //三种由深及浅的颜色
                    [
                      {
                        offset: 0,
                        color: "#429BF7",
                      },
                      {
                        offset: 1,
                        color: "#0c4d89",
                      },
                    ]
                  ),
                },
              },
            },
            data: seriesData1,
          },
          {
            valueType: "percent",
            name: legendData[1],
            type: "line",
            symbol: "circle", //设定为实心点
            showAllSymbol: true,
            symbolSize: 0,
            smooth: true,
            itemStyle: {
              normal: {
                color: `#51C5C9`,
                lineStyle: {
                  //线的颜色
                  color: `#51C5C9`,
                  width: 1.5,
                },
                areaStyle: {
                  type: "default",
                  //渐变色实现
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1, //变化度
                    //三种由深及浅的颜色
                    [
                      {
                        offset: 0,
                        color: "#4EBEC2",
                      },
                      {
                        offset: 1,
                        color: "#51C5C9",
                      },
                    ]
                  ),
                },
              },
            },
            data: seriesData2,
          },
          {
            valueType: "percent",
            name: legendData[2],
            type: "line",
            symbol: "circle", //设定为实心点
            showAllSymbol: true,
            symbolSize: 0,
            smooth: true,
            itemStyle: {
              normal: {
                color: `#ccc`,
                lineStyle: {
                  //线的颜色
                  color: `#fff`,
                  width: 1.5,
                },
                areaStyle: {
                  type: "default",
                  //渐变色实现
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1, //变化度
                    //三种由深及浅的颜色
                    [
                      {
                        offset: 0,
                        color: "#eee",
                      },
                      {
                        offset: 1,
                        color: "#fff",
                      },
                    ]
                  ),
                },
              },
            },
            data: seriesData3,
          },
        ],
      };
      myChart.setOption(option);
    },
    initChartCol2() {
      var myChart = echarts.init(document.getElementById("chart2"));
      let data = this.showChartLevel;
      let data1 = this.showChartType;
      let color = this.showLevelColor;
      const option = {
        backgroundColor: "#064965",
        color: color,
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: [8, 16],
          textStyle: {
            color: "#fff",
            fontSize: 16,
          },

          formatter: function (params) {
            return (
              params.marker +
              '<span style="color:' +
              params.color +
              '">' +
              params.data["name"] +
              "\n" +
              params.data["value"] +
              "</span>"
            );
          },
        },

        legend: [
          {
            //  orient: 'vertical',
            icon: "circle",
            left: "5", // 修改为居中
            bottom: "0",
            width: 230,
            height: 60,
            itemWidth: 30,
            itemGap: 20,
            data: data,
            textStyle: {
              rich: {
                a: {
                  color: "#fff",
                  fontSize: 15,
                  padding: [0, 10, 0, 0],
                },
                b: {
                  color: "#fff",
                  fontSize: 15,
                  padding: [0, 10, 0, 10],
                },
              },
            },
            formatter: function (name) {
              var target, unit;
              for (var i = 0, l = data.length; i < l; i++) {
                if (data[i].name == name) {
                  target = data[i].value;
                  unit = data[i].unit;
                }
              }
              return `{a| ${name}}{b|${target}%}`;
            },
          },
          {
            //  orient: 'vertical',
            icon: "circle",
            left: "222", // 修改为居中
            bottom: "0",
            width: 230,
            height: 60,
            itemWidth: 30,
            itemGap: 20,
            data: data1,
            textStyle: {
              rich: {
                a: {
                  color: "#fff",
                  fontSize: 15,
                  padding: [0, 10, 0, 0],
                },
                b: {
                  color: "#fff",
                  fontSize: 15,
                  padding: [0, 10, 0, 10],
                },
              },
            },
            formatter: function (name) {
              var target, unit;
              for (var i = 0, l = data1.length; i < l; i++) {
                if (data1[i].name == name) {
                  target = data1[i].value;
                  unit = data1[i].unit;
                }
              }
              return `{a| ${name}}{b|${target}%}`;
            },
          },
        ],
        series: [
          {
            name: "data",
            type: "pie",
            radius: ["45%", "25%"],
            center: ["23%", "33%"], // 修改为居中
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: "{d}%",
                textStyle: {
                  align: "center",
                  baseline: "middle",
                  fontSize: 16,
                  fontWeight: "100",
                  color: "#fff",
                },
              },
            },
            labelLine: {
              show: false,
            },
            data: data,
          },
          {
            name: "data1",
            type: "pie",
            radius: ["45%", "25%"],
            center: ["74%", "33%"], // 修改为居中
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: "{d}%",
                textStyle: {
                  align: "center",
                  baseline: "middle",
                  fontSize: 16,
                  fontWeight: "100",
                  color: "#fff",
                },
              },
            },
            labelLine: {
              show: false,
            },
            data: data1,
          },
        ],
      };

      myChart.setOption(option);
    },
    initChartCol3() {
      var myChart = echarts.init(document.getElementById("chart3"));
      let myData3 = [
        "201医院",
        "三邑大坝",
        "二江寺",
        "都江堰水文站",
        "宏缘",
        "201医院",
        "三邑大坝",
        "二江寺",
        "都江堰水文站",
        "宏缘",
      ];
      let jch = [200, 340, 320, 220, 360, 300, 160, 400, 250, 280];
      let tph = [160, 300, 280, 180, 300, 240, 120, 340, 200, 250];
      let aph = [120, 246, 340, 188, 100, 235, 123, 33, 300, 300, 100, 230];
      let option = {
        backgroundColor: "#0b2249",
        legend: {
          icon: "rect",
          itemWidth: 14,
          itemHeight: 10,
          itemGap: 20,
          textStyle: {
            fontSize: 14,
            color: "#fff",
          },
          data: ["水质", "数据", "数据1"],
          selectedMode: false,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            textStyle: {
              color: "#fff",
            },
          },
          textStyle: {
            color: "#fff",
          },
          backgroundColor: "rgba(17,95,182,0.5)", //设置背景颜色
          formatter: "{b}：{c}",
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "1%",
          top: "18%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: myData3,
          axisPointer: {
            type: "shadow",
          },
          axisLabel: {
            color: "rgba(255, 255, 255, .8)",
            interval: 0,
            rotate: 30,
            margin: 15,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(45, 67, 119, 0.8)",
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          name: "(NA)",
          nameTextStyle: {
            color: "#fff",
            fontSize: 14,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(45, 67, 119, 0.8)",
            },
          },
          min: 0,
          axisLabel: {
            show: true,
            color: "#fff",
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 0.5,
              color: "rgba(45, 67, 119, .5)",
              type: "dashed",
            },
          },
        },
        series: [
          {
            data: aph,
            name: "水质",
            type: "bar",
            barWidth: "10px",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(80, 135, 236, .8)",
                  },

                  {
                    offset: 1,
                    color: "rgba(80, 135, 236, .2)",
                  },
                ]),
              },
            },
            label: {
              show: false,
              position: "top",
              fontSize: 12,
              color: "#F5F5F5",
              offset: [0, -5],
              formatter: "{c}",
            },
          },
          {
            data: jch,
            name: "数据",
            type: "bar",
            barWidth: "10px",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(80, 135, 236, .8)",
                  },

                  {
                    offset: 1,
                    color: "rgba(80, 135, 236, .2)",
                  },
                ]),
              },
            },
            label: {
              show: false,
              position: "top",
              fontSize: 12,
              color: "#F5F5F5",
              offset: [0, -5],
              formatter: "{c}",
            },
          },
          {
            data: tph,
            name: "脱贫户",
            type: "bar",
            barWidth: "10px",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(104, 187, 196, .8)",
                  },

                  {
                    offset: 1,
                    color: "rgba(104, 187, 196, .2)",
                  },
                ]),
              },
            },
            label: {
              show: false,
              position: "top",
              fontSize: 12,
              color: "#F5F5F5",
              offset: [0, -5],
              formatter: "{c}",
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    initChartCol4() {
      let mapChart = this.$echarts.init(this.$refs.map);
      this.$echarts.registerMap("chengdu", mapJson); //注册地图
      let mapOption = {
        backgroundColor: "#0b2249",
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>污水占比：{c}%",
        },
        dataRange: {
          //左下角的颜色块。start：值域开始值；end：值域结束值；label：图例名称；color：自定义颜色值
          x: "right",
          y: "269",
          textStyle: {
            color: "#fff",
          },
          splitList: [
            { start: 41, label: "> 41  极高", color: "#b80909" },
            { start: 30, end: 40, label: "31 - 40  高", color: "#e64546" },
            { start: 21, end: 30, label: "21 - 30  中", color: "#f57567" },
            { start: 11, end: 20, label: "11 - 20  低", color: "#ff9985" },
            { start: 0, end: 10, label: "0 -10 无数据", color: "#ffe5db" },
          ],
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
        },
        geo: [
          {
            zoom: 1.2,
            layoutSize: "100%", //保持地图宽高比
            map: "chengdu", //注：名字必须与注册的名字保持一致
            aspectScale: 1, //设置1:1的显示比例
            label: {
              show: false,
            },
            select: {
              //设置选中样式
              itemStyle: {
                areaColor: "white", //自定义选中区域颜色
              },
            },
            itemStyle: {
              // 默认样式，图块没数据时，会取默认颜色
              normal: {
                borderColor: "#064965",
                areaColor: "#29c5f6",
                opacity: 0.8,
              },
              // 高亮样式
              emphasis: {
                areaColor: "#f2d5ad",
              },
            },
          },
        ],

        series: [
          {
            name: "chengdu",
            type: "map",
            geoIndex: 0,
            map: "chengdu",
            // 文本位置修正
            textFixed: {
              Alaska: [20, -20],
            },
            data: [
              { name: "锦江区", value: 34 },
              { name: "新都区", value: 12 },
            ],
            nameMap: {
              锦江区: "锦江区",
            },
          },
        ],
      };
      mapChart.setOption(mapOption);
      window.onresize = () => {
        mapChart.resize();
      };
    },
    changeAddress() {
      this.$confirm("是否要修改当前定位?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
        })
        .catch(() => {
          console.log("no");
        });
    },
  },
  components: {
    Header,
  },
};
</script>
<style scoped lang="less">
#data-analyze {
  /deep/.el-dialog {
    background-color: #064965;
    height: 1200px;
    width: 90%;
    .el-dialog__title {
      line-height: 24px;
      font-size: 18px;
      color: #3cd5ff;
      border-left: 3px solid #3cd5ff;
    }
    .dialog-content {
      display: flex;
      flex-direction: column;
      padding: 3px 5px;
      font-size: 14px;
      font-weight: bold;
    }
    .bottom-box {
      display: flex;
    }
    .other-box {
      display: flex;
    }
    .top-box {
      padding: 5px;
      font-size: 25px;
      text-align: center;
      color: #a9c6ff;
      align-items: center;
    }
    .middle-box {
      height: 100px;
      display: flex;
      text-align: center;
      align-items: center;
    }
    .el-statistic .head {
      margin-bottom: 17px;
      color: #ffffff;
      font-size: 22px;
    }
    .el-statistic .con {
      color: #f39c51;
    }
    .left-box {
      flex: 1;
      padding: 10px;
    }

    .right-box {
      flex: 1;
      padding: 10px;
    }
  }

  .row1-title {
    background-color: #064965;
    padding: 5px;
    box-sizing: border-box;
    .main-title {
      border-left: 6px solid #3cd5ff;
      color: #3cd5ff;
      padding: 3px 10px;
      box-sizing: border-box;
    }
  }
  .chart-row1 {
    background-color: #064965;
    height: 400px;
    overflow: hidden;
    display: flex;
    .chart-col2 {
      .titleBox {
        display: flex;

        .singleTitle {
          padding-top: 10px;
          box-sizing: border-box;
          flex: 1;
          text-align: center;
          color: #fff;
        }
      }
    }
  }
  .chart-row2 {
    display: flex;
    .chart-col4 {
      background-color: #0b2249;
      padding: 5px;
      box-sizing: border-box;
      .col4-title {
        border-left: 6px solid #3cd5ff;
        color: #3cd5ff;
        padding: 3px 10px;
        box-sizing: border-box;
      }
    }
    .chart-col3 {
      padding: 5px;
      box-sizing: border-box;
      background-color: #0b2249;
      .col3-title {
        border-left: 6px solid #3cd5ff;
        color: #3cd5ff;
        padding: 3px 10px;
        box-sizing: border-box;
      }
    }
  }
  .table {
    .table-title {
      background-color: #fff;
      padding: 5px;
      box-sizing: border-box;
      .main-title {
        border-left: 6px solid #3cd5ff;
        color: #3cd5ff;
        padding: 3px 10px;
        box-sizing: border-box;
      }
    }
    width: 100%;
    .pages {
      text-align: center;
      padding-top: 8px;
      background-color: #fff;
    }
  }
}
</style>