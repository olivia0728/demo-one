<template>
  
  <!-- 预警系统 -->
  <div class="warning-index">
    <div class="main-header">
    </div>
    <div class="alarm">
              <div class="alarm-image" @click="gotoWarningDetection()">
                <img src="../../assets/warning.png" class="image">
              </div>
      
      <div class="alarm-text">实时检测中</div>
    </div>
    <div class="warning-body">
  
    <!-- 预警系统的主要区域 -->
    <div class="main-area">
      <!-- 头部 -->
      <div class="area-header">
        <div class="single-header" v-for="(item,index) in today_warning_data" :key="index">
          <div class="number">{{ item.number }}</div>
          <div class="title">{{ item.title }}</div>
        </div>
      </div>
      <!-- 主体 -->
      <div class="area-body">
        <!-- 主体也分为三个区域 -- 左侧数据 中部圆形 右侧数据 -->
        <div class="left-data">
          <!-- 循环渲染左侧数据列表 -->
          <div class="single-data" v-for="(item,index) in warning_left_data" :key="index" @click="gotoDetail(item)">
            <!-- hover触发弹窗气泡 -- 显示详细数据 -->
            
            <div class="data-image">
              <img :src="item.image" class="image">
            </div>
            <div class="data-title">
             
              <div class="title-text">
                <span class="text-content">{{ item.title }}</span>
              </div>
             
            </div>

          </div>
        </div>
        <div class="middle-circle">
          <!-- 放入图片 -->
          <img src="../../assets/middle_circle2.png" class="circle-image" @click="showTodayWarning()">
        </div>
        <div class="right-data">
          <!-- 循环渲染右侧数据列表 -->
          <div class="single-data" v-for="(item,index) in warning_right_data" :key="index" @click="gotoDetail(item)">
            <div class="data-title">
              <div class="title-text">
                <span class="text-content">{{ item.title }}</span>
              </div>
              
            </div>
           
            <div class="data-image">
              <img :src="item.image" class="image">
            </div>
           
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧侧边栏 -->
    <!-- 内容 -- 实时显示检测到的数据 -->
    <div class="right-sidebar">
      <div class="show-data">
       <!-- 标题 -->
       <div class="data-main-title">
        <div class="title-text">当前数据</div>
        <div class="update-time">(60s更新)</div>
       </div>
        <div class="single-data" v-for="(item,index) in time_data" :key="index">
        <div class="data-title">
          {{ item.title }}:
        </div>
        <div class="data-value">
          {{ item.value }}
        </div>
      </div>
      </div>
      <div class="tool-buttons">
        <div class="history">
          <el-button type="primary" class="button" size="small" @click="showHistory = true">查看历史数据</el-button>
        </div>
        <!-- 查看历史数据的弹出框 -->
        <el-dialog
          title="查看历史数据"
          :visible="showHistory"
          width="35%">
          <div class="dialog">
            <!-- 选择固定时间 -->
            <div class="choose-time">
              <div class="time-title">
                选择时间
              </div>
              <div class="time-body">
                <el-time-select
                 placeholder="起始时间"
                 v-model="startTime"
                 :picker-options="{
                   start: '08:30',
                   step: '00:15',
                   end: '18:30'
                 }"
                 size="small">
              </el-time-select>
              <el-time-select
                 placeholder="结束时间"
                 v-model="endTime"
                 :picker-options="{
                   start: '08:30',
                   step: '00:15',
                   end: '18:30',
                   minTime: startTime
                 }"
                 size="small">
              </el-time-select>
              </div>
             
            </div>
            <!-- 显示改时间段的所有数据情况 -->
            <div class="show-data">
              <div class="data-body"></div>
            </div>
            <span slot="footer" class="dialog-footer">
             <el-button type="primary" @click="showHistory = false">确 定</el-button>
          </span>
          </div>
          
        </el-dialog>
        <div class="update">
          <el-button type="success" class="button" size="small" @click="changeUpdate = true">修改更新频率</el-button>
        </div>
         <!-- 修改更新频率的弹出框 -->
         <el-dialog
          title="修改更新频率"
          :visible.sync="changeUpdate"
          width="30%">
          <span>这是一段信息</span>
        </el-dialog>       
      </div>
    
    </div>
    </div>
    <!-- 底部信息栏 -->
    <div class="warning-message">
      <div class="message-left">
        <div class="message-title">
          预警信息
        </div>
        <div class="message-body">
          <div class="message-image">
            <img src="../../assets/message.png" class="image">
          </div>
          <div class="message-text">
            水域各项参数正常，暂时没有报警数据
          </div>
         
        </div>
      </div>
      <div class="message-right">
        <div class="message-title">
          隐患信息
        </div>
        <div class="message-body">
          <div class="message-image">
            <img src="../../assets/message.png" class="image">
          </div>
          <div class="message-text">
            水域各项参数正常，暂时没有报警数据
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// 导入头部
import Header from '../my-components/header'
export default {
  name: 'DemoOneWarningIndex',

  data() {
    return {
      // 今日预警数据
      today_warning_data:[
        {
          title:'今日预警',
          number:4,
          isShow:false
        },
        {
          title:'今日隐患',
          number:2,
          isShow:false
        },
        {
          title:'今日解决',
          number:4,
          isShow:false
        }
      ],
        // 实时检测数据
        time_data:[
        {
          title:'实时水温',
          value:'24.9'
        },
        {
          title:'实时氨氮',
          value:'0.037'
        },
        {
          title:'实时ph值',
          value:'8.61'
        },
        {
          title:'实时浊度',
          value:'432'
        },
        {
          title:'实时电导率',
          value:'12.8'
        },

        {
          title:'实时高锰酸钾',
          value:'2.55'
        },
      ],
      // 预警方面数据
      warning_left_data:[
        {
          title:'水温检测',
          image:require('../../assets/water.png'),
          data:[
            '25','23.2','21','22','25.6','21.4',
            '26.1','23','20.2','17','18.4','24.9'
          ],
          value:'24.9'
        },
        {
          title:'氨氮检测',
          image:require('../../assets/water.png'),
          data:[
            '0.032','0.044','0.043','0.026','0.071','0.039',
            '0.055','0.047','0.063','0.049','0.031','0.037'
          ],
          value:'0.037'
        },
        {
          title:'ph值检测',
          image:require('../../assets/water.png'),
          data:[
            '9.4','8.3','9.87','7.91','8.55','7.61',
            '9.55','8.43','7.65','6.99','9.01','8.61'
          ],
          value:'8.61'
        }
      ],
      warning_right_data:[
        {
          title:'浊度检测',
          image:require('../../assets/water.png'),
          data:[
            '421','390','401','366','405','382',
            '328','455','308','405','356','432'
          ],
          value:'432'
        },
        {
          title:'电导率检测',
          data:[
            '11.5','12.3','11.9','10.3','11.8','12.5',
            '13.1','10.5','12.6','11.4','10.3','12.8'
          ],
          image:require('../../assets/water.png'),
          value:'12.8'
        },
        {
          title:'高锰酸钾检测',
          data:[
            '2.23','1.99','3.41','3.06','2.01','3.42',
            '2.43','1.83','1.47','2.33','2.43','2.55'
          ],
          image:require('../../assets/water.png'),
          value:'2.55'
        }
      ],
      // 查看历史数据
      showHistory:false,
      // 修改更新频率
      changeUpdate:false,
      // 时间选择器相关元素
      startTime: '',
      endTime: ''
    
    };
  },

  mounted() {
    
  },

  methods: {
    // 点击中间的圆形查看今日预警统计情况
    showTodayWarning(){
      console.log("warning")
    },
    // 跳转到检测界面
    gotoWarningDetection(){
      this.$router.push('/index/warningdetection')
    },
    // 跳转至对应的详情界面
    gotoDetail(data){
      const query = JSON.stringify(data)
      // console.log(query)
      this.$router.push({
        path:'/index/warningdetail',
        query:{query:query}
      })
    }
   
  },
  components:{
    Header
  }
};
</script>
<style lang="less" scoped>
.warning-index{
  height: 91vh;
  box-sizing: border-box;
  background-color: #064965;
  display: flex;
  flex-direction: column;
  .main-header{
    height: 36px;
    background-image: url('../../assets/header.png');
    background-repeat: no-repeat;   //不重复
    overflow: hidden;
     background-size:cover;
  }
  .alarm{
    padding-left: 10px;
    color: #fff;
    position: absolute;
    top: 110px;
    width: 94px;
    .alarm-image{
      width: 100%;
      display: flex;
      height: 90px;
      padding: 12px;
      box-sizing: border-box;
      .image{
        width: 100%;
        height: 100%;
      }
    }
    .alarm-text{
      text-align: center;
      font-size: 13px;
    }
  }
  .warning-body{
    background-color: #064965;
    flex: 5;
    color: #fff;
    padding-left: 140px;
    padding-top: 50px;
    display: flex;
    .main-area{
    flex: 4;
    display:flex;
    flex-direction: column;
    /* background-color: pink; */
    width: 650px;
    .area-header{
      background-image: url('../../assets/header-bg2.png');
      background-repeat: no-repeat;   //不重复
      background-size: 100% 100%;     // 满屏
      background-color: #fff;
      padding: 0 140px;
      justify-content: space-between;
      display: flex;
      flex: 1;
      .single-header{
    
        padding: 10px 0;
        .number{
          width: 110px;
          height: 35px;
          border: 3px solid #2689b4;
          line-height: 35px;
          text-align: center;
          font-size: 24px;
          font-weight: bold;

        }
        .title{
          text-align: center;
          font-size: 17px;
          padding-bottom: 5px;
          color: #48a5cd;
          margin-top: 4px;
        }
      }
    }
    .area-body{
      background-image: url( '../../assets/warning-bg.png');
      background-repeat: no-repeat;   //不重复
     
overflow: hidden;
background-size:cover;
      display: flex;
      flex: 5;
      margin-top: 20px;
      .left-data,.right-data{
        padding: 20px 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 15px;
        .single-data{
         
          flex: 1;
          display: flex;
          .data-image{
            box-sizing: border-box;
            display: flex;
            flex: 1;
            .image{
              align-self: center;
              border: 3px solid #17688A;
              box-sizing: border-box;
              width: 60px;
              height: 60px;
              border-radius: 50px;
             
            }
          }
         
        }
      }
      /* 阿西 因为两侧是对称的结构 所以要分别写格式 */
      .left-data{
        .data-title{
            flex: 3;
            display: flex;
            .title-text{
             width: 100%;
             text-align: left;
             padding-left: 10px;
             align-self: center;
             
             .text-content{
              background-color: #064965;
             }
            }
          }
      }
      .right-data{
        .data-title{
          
          flex: 3;
            display: flex;
  
            .title-text{
              width: 100%;
              padding-right: 10px;
              align-self: center;
              text-align: right;
              .text-content{
              background-color: #064965;
             }
            }
          }
      }

      .middle-circle{
      
        flex: 1;
        display: flex;
        .circle-image{
          &:hover{
          filter: brightness(0.96);
        }
          width: 100%;
          align-self: center;

        }
      }
    }
  }
  .right-sidebar{
    background:linear-gradient(#095677, #064965);
    display: flex;
    flex: 1;
    flex-direction: column;
    // background-color: #ccc;
    padding: 20px 25px 0;
    box-sizing: border-box;
    border-left: 3px solid #17688A;
    // 弹出框样式
    .dialog{
      .choose-time{
        margin-bottom: 20px;
        padding: 0 10px;

        .time-title{
          margin-bottom: 10px;
          font-size: 16px;
        }
        .time-body{
          display: flex;
          gap: 15px;
        }
      }
    }
    .show-data{
      .data-main-title{
        width: 100%;
        display: flex;
        margin-bottom: 20px;
        .title-text{
          flex: 1;
          font-size: 18px;
          color: #90deff;
          align-self: center;
        }
        .update-time{
          align-self: center;
          flex: 1;
          text-align: right;
          cursor: pointer;
          &:hover{
            color: #fff;
          }
          font-size: 14px;
          font-weight: normal;
          color: #2d9ac9;
        }
      }
      flex: 1;
      .single-data{
      padding: 8px 10px;
      box-sizing: border-box;
      border: 1px solid #17688A;
      display: flex;
      .data-title{
        flex: 3;
        font-size: 17px;
        color: #60c8f5;
      }
      .data-value{
        text-align: center;
        flex: 1;
        margin-left: 10px;
      }
    }
    }
    .tool-buttons{
      .history,.update{
        margin-bottom: 10px;
      }
     
    }
   
  }
  }
  .warning-message{
    flex: 1;
   
    display: flex;
    margin-top: 35px;
    border-top: 3px solid #17688A;
    padding: 10px;
    box-sizing: border-box;
    .message-left{
      flex: 1;
      border-right: 3px solid #17688A;
    }
    .message-right{
      flex: 1;
    }
    .message-right,.message-left{
      position: relative;
      .message-title{
        position: absolute;
        color: #fff;
        background-color: #064965;
        top: -28px;
        left: 10px;
        border: 3px solid #17688A;
        padding: 5px 15px;
      }
      .message-body{
        display: flex;
        // background-color: #fff;
        height: 100%;
        padding-top: 10px;
        padding-left: 40px;
        box-sizing: border-box;
        .message-image{
          height: 100px;
          padding: 10px;
          .image{
            height: 100%;
          }
        }
        .message-text{
          color: #fff;
          font-size: 17px;
          align-self: center;
          margin-left: 20px;
        }
      }
    }
  }
  
}
</style>