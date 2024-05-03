<template>
  <div id="data-stand">
   <!-- 污水实时数据 -->
   <!-- 左侧选择地区 右侧显示实时数据 -->
   <div class="charts">
     <!-- 地图 -->
     <div id="map">
    <div id="container"></div>
     </div>
     <div id="chart1" style="width: 50%;height:100%;"></div>
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
// 导入地图组件
import AMapLoader from '@amap/amap-jsapi-loader'
// 引入弹出框组件
window._AMapSecurityConfig = {
  securityJsCode: ''
}
// 导入表格数据
import { table_data } from "../../table-data/tableData.js";
// 引入安全密钥
window._AMapSecurityConfig = {
  securityJsCode: '0b7c7c71fa74202944b9f9f243495c47'
}
import * as echarts from 'echarts'
export default {
  name: 'SewagecontrolDataStand',

  data() {
    return {
      map:null,
       //标记点的位置信息
       mapData: [
        {
          name: '二江寺',
          longitude: 104.042486,
          latitude: 30.506389,
          img:require('../../assets/places-image/place2.png')
        },
        {
          name: '都江堰水文局',
          longitude: 103.64662,
          latitude: 30.98837,
          img:require('../../assets/places-image/place1.png')
        },
        {
          name: '三邑大桥',
          longitude: 104.164404,
          latitude: 30.830347,
          img:require('../../assets/places-image/place3.png')
        },
        {
          name: '宏缘',
          longitude: 104.543578,
          latitude: 30.609207,
          img:require('../../assets/places-image/place4.png')
        }
      ],
      // 表格数据
      tableData: table_data,

    };
  },

  mounted() {
    this.initMap()
    this.chartsOne()
  },

  methods: {
    // 初始化地图方法
    initMap(){
        AMapLoader.load({
            key:"e4504e9729577ae2778872e291268fcb",             // 申请好的Web端开发者Key，首次调用 load 时必填
            version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins:[''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        }).then((AMap)=>{
            this.map = new AMap.Map("container",{  //设置地图容器id
                viewMode:"3D",    //是否为3D地图模式
                mapStyle: "amap://styles/blue", // 设置颜色底层
                zoom:5,           //初始化地图级别
                center: [104.164404,30.830347], //初始化地图中心点位置
                pitch: 40, // 地图俯仰角度，有效范围 0 度- 83 度
                terrain: true, // 开启地形图

            });
            this.markPoints()
            this.latitude()

        }).catch(e=>{
            console.log(e);
        })

    },
    // 点击地图触发事件
    handlerMapClick () {
      this.map.on('click', (e) => {
       console.log(e)
      })
    },
    //遍历显示标记点
    markPoints() {
      this.mapData.forEach(item => {
        // 创建一个 Marker 实例：
        const marker = new AMap.Marker({
          position: new AMap.LngLat(item.longitude, item.latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[lng, lat]
        });
        // 将创建的点标记添加到已有的地图实例：
        this.map.add(marker);
 
        //给标记点添加事件
        marker.on('click', (e) => {
          this.setInfoWindows(e, item)
        })
      });
    },
     //显示的弹出框组件
     setInfoWindows(e, item) {
      // 信息窗体的内容
      let content = [
        // e.pos[0],e.pos[1],
        `<div style="padding:0;">
          <div>${item.name}</div>
          <img src=${item.img} alt="" style="width: 150px;height: 100px;margin-top:5px">
          <div style="font-size:13px;color:#49abd5">
            <div>经度：${item.latitude}</span> 
            <div>纬度：${item.longitude}</div>  
          </div>
        </div>`
      ];
      // 创建 infoWindow 实例	
      let infoWindow = new AMap.InfoWindow({
        content: content.join("<br>")  //传入 dom 对象，或者 html 字符串
      });
      // 打开信息窗体
      let dd = this.map.getCenter()
      // dd.pos = [e.pos[0], e.pos[1]]
      dd.lat = item.latitude
      dd.lng = item.longitude
      infoWindow.open(this.map, dd);
    },
     //点击获取经纬度
     latitude() {
      this.map.on('click', function (ev) {
        // console.log(ev)
        // 触发事件的对象
        let target = ev.target;
        // 触发事件的地理坐标，AMap.LngLat 类型
        let lnglat = ev.lnglat;
        // 触发事件的像素坐标，AMap.Pixel 类型
        let pixel = ev.pixel;
        // 触发事件类型
        let type = ev.type;
        console.log(target, lnglat, pixel, type)
      });
    },
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
    setInterval(updateChartData, 120000);
    }
  },
};
</script>
<style scoped lang="less">
#data-stand{

  .charts{
    height: 400px;
    display: flex;
  #map{
  height: 100%;
  width: 50%;
  padding: 10px;
  box-sizing: border-box;
  background-color: #064965;
  #container{
    width: 100%;
    height: 100%;
    border: 2px solid #4486a2;
    // 弹出框样式
    /deep/ .amap-info-content {
    position: relative;
    background: #1f5a72;
    color: #fff;
    padding: 10px;
    line-height: 1.4;
    overflow: auto;
}
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