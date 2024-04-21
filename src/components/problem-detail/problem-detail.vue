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
        <el-button type="primary" round class="button" @click="newSolve()" :disabled="Query.status ==='已解决'">继续解决</el-button>
        <el-button type="success" round class="button" @click="endProblem()" :disabled="Query.status ==='已解决'">完结问题</el-button>
      </div>
    </div>
    <!-- 解决路线 -->
    <div class="solveRoute">
      <div class="solveTitle">
        问题解决进程
      </div>
      <el-timeline class="timeline">
    <el-timeline-item
      v-for="(item, index) in problemRouteData"
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
    <!-- 解决问题弹出框 -->
    <div class="dialog">
      <el-dialog
        title="新建解决进程"
        :visible.sync="solveDialogVisible"
        width="30%">
        <div class="dialog-content">
          <div class="input">
      <span class="input-title">进程名称：</span>
      <el-input
        style="width: 80%;"
        placeholder="请输入进程名称"
        show-word-limit
        v-model="route_name"
        maxlength="30"
        size="small">
      </el-input>
          </div>
          <div class="input">
            <span class="input-title">解决内容：</span>
            <el-input
        style="margin-top: 10px;"
        type="textarea"
        placeholder="请输入解决内容"
        v-model="route_description"
        maxlength="200"
        show-word-limit
        :rows="4"

      >
      </el-input>
          </div>
          <div class="input">
      <div style="margin-bottom: 20px;">上传图片：</div>
      <div class="image-area" style="padding-left: 20px;">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
    
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
           <el-button @click="solveDialogVisible = false">取 消</el-button>
           <el-button type="primary" @click="sureSolve()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 完结问题弹出框 -->
    <div class="dialog">
      <el-dialog
        title="完结问题"
        :visible.sync="endDialogVisible"
        width="30%">
        <div class="dialog-content">
          <span>确认完结问题吗？</span>
        </div>
        <span slot="footer" class="dialog-footer">
           <el-button @click="endDialogVisible = false">取 消</el-button>
           <el-button type="primary" @click="sureEnd()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 从store中导入用户数据
import {mapState} from 'pinia'
import storeId from '@/store/index' 
// 导入dayjs
import dayjs from 'dayjs';
export default {
  name: 'SewagecontrolProblemDetail',

  data() {
    return {
      // 接收传递的参数
      Query:{},
      // 图片数组
      showImage:require("../../assets/example/pollute.png"),
      // 解决问题弹出框
      solveDialogVisible:false,
      // 完结问题弹出框
      endDialogVisible:false,
      // 新增问题进程（继续解决）
      route_description:'',
      route_name:''
      
    };
  },

  mounted() {
    // 初始加载时赋值
    this.getQuery()
  },

  methods: {
    getQuery(){
      this.Query = JSON.parse(this.$route.query.rowData)
      console.log(this.Query)
    },
    // 继续解决问题
    newSolve(){
      this.solveDialogVisible = true
      console.log("continue")
    },
    // 确认提交新增进程
    sureSolve(){
      const store = storeId()
      // 检验表单合法性
      if(!this.route_description||!this.route_name){
        this.$message({
          message: '请将表单填写完整',
          type: 'warning'
        });
      }else{
        // 获取当前的时间字符串
        const current_time = dayjs(new Date()).format('YYYY.MM.DD HH:MM')
        // 组合对象
        function Route(title,content,timestamp){
          this.title = title
          this.content = content
          this.timestamp = timestamp
          this.color = '#409EFF'
        }
        const newRoute = new Route(this.route_name,this.route_description,current_time)
        // console.log(newRoute)
        this.problemRouteData.push(newRoute)
        // 成功新增
        this.$message({
          message: '新增解决进程成功',
          type: 'success'
        });
        // 同步store
        store.updateProblemRouteData(this.problemRouteData)
        // 清空表单 收起弹出框
        this.solveDialogVisible = false
        this.route_description = ''
        this.route_name = ''
      }
    },
    // 完结问题
    endProblem(){
      // 收回弹出框
      this.endDialogVisible = true
      
    },
    // 确认完结问题
    sureEnd(){
      this.$message({
          message: '问题已完结！',
          type: 'success'
        });
        // 修改问题状态
      this.Query.status = '已解决'
      this.endDialogVisible = false
    }
  },
  computed:{
    // 按需导入 -- 问题解决路线列表
    ...mapState(storeId,['problemRouteData'])
  }
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
  .dialog{
    // 弹出框内部样式
 .dialog-content{
    .input{
      margin-bottom: 20px;
    }
   }
  }
}
</style>