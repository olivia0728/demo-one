<template>
  <div id="problem-detail">
    <!-- 主要信息 -->
    <div class="mainInfo">
      <div class="infoImage">
        <img :src="showImage" class="image">
      </div>
      <div class="infoText">
        <div class="textTitle">
          {{ Query.title }}
          <span class="id">【ID:{{ Query.id }}】</span>
        </div>
        <div class="textBody">
        <div class="textType singleText">
          <span class="elementTitle">
            问题类型：
          </span>
          <span class="elementContent">
            {{ Query.type }}
          </span>
        </div>
        <div class="textLevel singleText">
          <span class="elementTitle">
            问题程度：
          </span>
          <span class="elementContent">
            {{ Query.level }}
          </span>
        </div>
        <div class="textAddress singleText">
          <span class="elementTitle">
            问题地址：
          </span>
          <span class="elementContent">
            {{ Query.address }}
          </span>
        </div>
        <div class="textTime singleText">
          <span class="elementTitle">
            问题时间：
          </span>
          <span class="elementContent">
            {{ Query.date }}
          </span>
        </div>
        <div class="textStatus singleText">
          <span class="elementTitle">
            问题状态：
          </span>
          <span class="elementContent">
            {{ Query.status }}
          </span>
        </div>
        <div class="textPerson singleText">
          <div class="personName">
            <span class="elementTitle">
            提交者：
          </span>
          <span class="elementContent">
            {{ Query.person }}
          </span>
          </div>
          <div class="personNumber">
            <span class="elementTitle">
            联系方式：
          </span>
          <span class="elementContent">
            {{ Query.number }}
          </span>
          </div>
         
        </div>
        </div>


     

      </div>
      <div class="infoButton">
        <el-button type="primary" round class="button">继续解决</el-button>
      </div>
    </div>
    <!-- 解决路线 -->
    <div class="solveRoute">
      <div class="solveTitle">
        问题解决进程
      </div>
      <el-timeline class="timeline">
    <el-timeline-item
      v-for="(item, index) in activities"
      :key="index"
      :color="item.color"
      :timestamp="item.timestamp"
      >
      <el-card class="card">
        <h4>{{item.title}}</h4>
        <p>{{item.content}}</p>
      </el-card>
    </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SewagecontrolProblemDetail',

  data() {
    return {
      // 接收传递的参数
      Query:{},
      // 图片数组
      showImage:require("../../assets/example/pollute.png"),
      // 路线数组
      activities: [
        {
          title:'解决路线第一部分标题',
          content: '解决路线第一部分内容',
          timestamp: '2024.3.6 20:30',
          color: '#409EFF'
        },
        {
          title:'解决路线第二部分标题',
          content: '解决路线第二部分内容',
          timestamp: '2024.3.7 21:30',
          color: '#409EFF'
        }
        
      ]
      
    };
  },

  mounted() {
    // 初始加载时赋值
    this.getQuery()
  },

  methods: {
    getQuery(){
      this.Query = this.$route.query.rowData
      console.log(this.Query)
    }
  },
};
</script>
<style scoped lang="less">
#problem-detail{
  background-color: #fff;
  .mainInfo{
    display: flex;
    height: 280px;
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    .infoImage{
      padding: 10px;
      box-sizing: border-box;
      flex: 2;
      .image{
        width: 100%;
        height: 100%;
      }
    }
    .infoText{
      flex: 3;
      margin-left: 10px;
      padding: 10px;
      box-sizing: border-box;
      .textTitle{
        font-size: 20px;
        margin-bottom: 30px;
      }
      .textBody{
        
        .singleText{
          margin-top: 10px;
          .elementTitle{
            font-size: 17px;
          }
          .elementContent{
            color: #2e2e2e;
          }
}
        .textPerson{
          display: flex;
          gap: 20px;
        }
      }
      
    }
    .infoButton{
      flex: 4;
      box-sizing: border-box;
      padding-top: 220px;
      margin-left: -10px;
    }
  }
  .solveRoute{
    padding: 20px;
    .solveTitle{
      height: 40px;
      line-height: 40px;
      margin-bottom: 10px;
      color: #409EFF;
      font-weight: bold;
      font-size: 16px;
    }
    .timeline{
      width: 300px;
      .card{
        h4{
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>