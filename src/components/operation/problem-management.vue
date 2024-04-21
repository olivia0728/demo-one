<template>
  <div id="problem-management">
    <Header :title="'问题管理'"></Header>
    <!-- 整体操作区域 -->
   <div class="total-operation">
    <div class="row1">
      <div class="key-word">
      <span>输入关键字：</span>
      <el-input v-model="keyword" placeholder="请输入内容" class="input" size="small"></el-input>
      </div>
      <div class="search">
      <el-button  size="small"  icon="el-icon-search">搜索</el-button>
    </div>
    <div class="reset">
      <el-button type="primary" size="small" icon="el-icon-refresh">重置</el-button>
    </div>
    </div>
     
    <!-- 筛选区域 -->
    <div class="row2">
        <!-- 设置下拉框 -->
        <!-- 第一个筛选 -- 问题状态 -->
        <div class="problem-status">
          <span>问题状态：</span>
          <div class="select">
            <el-select v-model="value" placeholder="问题状态" size="small" class="select" style="width: 100%;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
              </el-select>
          </div>
       
        </div>
        <!-- 第二个筛选 -- 问题程度-->
        <div class="problem-level">
          <span>问题程度：</span>
          <div class="select">
            <el-select v-model="level_value" placeholder="问题程度" size="small" style="width: 100%;">
              <el-option
      v-for="item in level_options"
      width="100"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
            </el-select>
          </div>
   
        </div>
        <!-- 第二个筛选 -- 问题类型 -->
        <div class="problem-type">
          <span>问题类型：</span>
          <div class="select">
            <el-select v-model="type_value" placeholder="问题类型" size="small">
          
          <el-option
            v-for="item in type_options"
            width="100"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
          </div>
       
        </div>
    </div>

    <!-- 添加按钮 -->
    <div class="row3">
      <div class="button">
        <el-button type="primary" size="small"icon="el-icon-plus" @click="addProblem()">新增问题</el-button>
      </div>
    </div>

    </div>
    <!-- 新增问题的弹出框 -->
    <el-dialog
  title="新增问题"
  :visible.sync="addProblemVisible"
  width="30%">
  <!-- 内部表单 -->
  <div class="dialog-content">
    <div class="input">
      <span class="input-title">问题名称：</span>
      <el-input
        style="width: 80%;"
        placeholder="请输入问题名称"
        show-word-limit
        v-model="problem_name"
        maxlength="30"
        size="small">
      </el-input>
    </div>
    <div class="input">
      <span class="input-title">问题地址：</span>
      <el-input
        style="width: 80%;"
        placeholder="请输入问题地址"
        v-model="problem_address"
        size="small">
      </el-input>
    </div>
    <div class="input">
      <span>问题类型：</span>
      <el-select v-model="problem_type" placeholder="问题类型" size="small">
    <el-option
      v-for="item in type_options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </div>
    <div class="input">
      <span> 问题程度：</span>
      <el-select v-model="problem_level" placeholder="问题程度" size="small">
    <el-option
      v-for="item in level_options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
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
    <div class="input">
      <span class="input-title">问题详情：</span>
      <el-input
        style="margin-top: 10px;"
        type="textarea"
        placeholder="请输入问题详情"
        v-model="problem_description"
        maxlength="200"
        show-word-limit
        :rows="4"

      >
      </el-input>
    </div>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addProblemVisible = false">取 消</el-button>
    <el-button type="primary" @click="sureAdd()">确 定</el-button>
  </span>
    </el-dialog>
  
      <!-- 问题列表区域 -->
   <div class="problem-form">
    <el-table
    :data="problemsData"
    height="470"
    border
    style="width: 100%"
    >
    <!-- 扩展菜单 方便展示 -->
    <el-table-column type="expand" width="40">
      <template slot-scope="props">
        <div class="expand-area">
 <!-- 把图片放上去 -->
 <div class="image">
          <img :src="props.row.image" class="url">
        </div>
        <el-form label-position="left" inline class="table-expand" >
          <div class="detail-col1">
            <div class="id">
              <span class="title">问题编号：</span>
              <span class="value">{{ props.row.id }}</span>
            </div>
            <div class="date">
              <span class="title">创建时间：</span>
              <span class="value">{{ props.row.id }}</span>
            </div>
            <div class="title">
              <span class="title">问题名称：</span>
              <span class="value">{{ props.row.title }}</span>
            </div>
            <div class="address">
              <span class="title">问题地址：</span>
              <span class="value">{{ props.row.address }}</span>
            </div>           
            <div class="type">
              <span class="title">问题类型：</span>
              <span class="value">{{ props.row.type }}</span>
            </div>
            <div class="level">
              <span class="title">问题程度：</span>
              <span class="value">{{ props.row.level }}</span>
            </div>
            
          </div>
          <div class="detail-col2">
            <div class="person">
              <span class="title">提交者：</span>
              <span class="value">{{ props.row.person }}</span>
            </div>
            <div class="number">
              <span class="title">联系方式：</span>
              <span class="value">{{ props.row.number }}</span>
            </div>
            <div class="number">
              <span class="title">问题详情：</span>
              <span class="value">{{ props.row.description }}</span>
            </div>
          </div>

        </el-form>
        </div>
       
      </template>
    </el-table-column>
    <el-table-column
      prop="id"
      label="问题编号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="date"
      label="提交日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="title"
      label="名称"
>
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型"
      width="170">
    </el-table-column>

    <el-table-column
      prop="level"
      label="程度"
      width="140">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="100">
    </el-table-column>
    <el-table-column
     label="操作"
     width="180"
    >
    <template slot-scope="scope">
      <!-- 删除的提示框 -->
      <el-popover
  placement="top"
  width="160"
  v-model="scope.row.delete_show">
  <span>确认编号{{scope.row.id}}的问题吗？</span>
  <div style="text-align: right; margin: 0">
    <el-button size="mini" type="text" @click="scope.row.delete_show = false">取消</el-button>
    <el-button type="primary" size="mini" @click="sureDelete(scope)">确定</el-button>
  </div>
</el-popover>
    <el-button  size="mini"  icon="el-icon-delete" type="danger" @click="scope.row.delete_show= true">删除</el-button>
    <el-button v-show="scope.row.status!='已解决'" size="mini"  icon="el-icon-thumb" type="warning" @click="handelSolve(scope)">解决</el-button>
    
    </template>
    </el-table-column>
  </el-table>
  <el-pagination
  class="pages"
 
  layout="prev, pager, next"
  :total="1000">
  </el-pagination>
   </div>
  </div>
 
</template>

<script>
// 导入头部
import Header from '../my-components/header'
// 从store中导入用户数据
import {mapState} from 'pinia'
import storeId from '@/store/index' 
export default {
  name: 'SewagecontrolProblemManagement',

  data() {
    return {
      // 问题状态数组
         options: [{
          value: '选项1',
          label: '未展开'
        }, {
          value: '选项2',
          label: '解决中'
        }, {
          value: '选项3',
          label: '解决遇阻'
        }, {
          value: '选项4',
          label: '检验期'
        }, {
          value: '选项5',
          label: '已解决'
        }],
        value: '',
        level_options: [{
          value: '选项1',
          label: '重度污染'
        }, {
          value: '选项2',
          label: '中度污染'
        }, {
          value: '选项3',
          label: '轻度污染'
        }, {
          value: '选项4',
          label: '微度污染'
        }],
        level_value: '',
        type_options: [{
          value: '选项1',
          label: '工业废物污染'
        }, {
          value: '选项2',
          label: '生活垃圾污染'
        }, {
          value: '选项3',
          label: '天气灾害污染'
        }, {
          value: '选项4',
          label: '其他类型污染'
        }],
        type_value: '',
      // 弹出框信息
      // 1.删除信息
      deleteMessage:false,
      // 2.修改信息
      changeMessage:false,
      // 3.解决信息
      resolveMessage:false,
      keyword:'',

      // 控制新增问题的弹出框
      addProblemVisible:false,
      // 新增问题表单元素
      problem_name:'',
      problem_type:'',
      problem_level:'',
      problem_address:'',
      problem_description:'',
      keyword:''


    };
  },

  mounted() {
    
  },
  
  methods: {
    sureDelete(props){
      const store = storeId()
      const row = props.row
      // 更新用户数据
      const newData = this.problemsData.filter((item)=>item.id!==row.id)
      // 同步store
      store.updateProblemsData(newData)
      this.$message({
          message: '删除成功',
          type: 'success'
        });
      
      

    },
    handelSolve(props){
      const row = JSON.stringify(props.row)
      // console.log(row)
      // 跳转到详情页
      // 携带参数
    
      this.$router.push({
          path: '/index/problemdetail',
          query:{rowData:row}
        })

    },
    // 新增问题方法
    addProblem(){
      // 弹出框
      this.addProblemVisible = true
      console.log("add")
    },
    // 确认新增问题
    sureAdd(){
      // 检查表单内容合法性
      if(!this.problem_name||!this.problem_type||!this.problem_level||!this.problem_description||!this.problem_address)
      {
        // 弹出信息提示框
        this.$message.error('请将问题信息填写完整');
      }else{
        this.$message({
          message: '添加成功！请及时解决问题',
          type: 'success'
        });
        // console.log('add')
      this.addProblemVisible = false
      }
      
    }
  },
  components:{
    Header
  },
  computed:{
    // 按需导入 -- 用户数据
    ...mapState(storeId,['problemsData'])
  }
};
</script>
<style scoped lang="less">
#problem-management{
  .total-operation{
   
   .row1{
     padding: 10px 15px;
     display: flex;
     span{
       font-size: 14px;
       line-height: 32px;
     }
     .key-word{
      .input{
       width: 250px;
     }
     }
   
     .search,.reset{
       margin-left: 10px;
     }
   }
   .row2{
    padding: 5px 15px;
    display: flex;
   .problem-type,.problem-level,.problem-status{
    margin-right: 22px;
    display: flex;
    .select{
      width: 100px;
    }
   }
    span{
      font-size: 14px;
      line-height: 32px;
    }
   }
   .row3{
     padding: 6px 15px;
   }
   
   
 }
 /deep/ .el-dialog{
   margin-top:15px !important;
   margin-bottom: 0 !important;
  }
 // 弹出框内部样式
 .dialog-content{
    .input{
      margin-bottom: 20px;
    }
   }
 .problem-form{
  margin-top: 10px;
    padding: 5px 10px;
    height: 520px;
    .expand-area{
      padding-right: 100px;
      display: flex;
      // background-color: pink;
      .image{
        margin-right: 30px;
        width: 160px;
        height: 140px;
      display: flex;
      // background-color: pink;
      .image{
        width: 180px;
        height: 160px;
        padding-left: 20px;
        .url{
          height: 100%;
          width: 100%;
        }
      }
      .table-expand{
     display: flex;
     .detail-col1{
     width: 250px;

      div{
        margin-bottom: 6px;
        .title{
          color:#72aeea;
          font-weight: bold;
        }
        .value{
          color: #666;
        }
      }
     }
     .detail-col2{
      width: 480px;
      margin-left: 140px;
      div{
        margin-bottom: 6px;
        .title{
          color:#72aeea;
          font-weight: bold;
        }
        .value{
          color: #666;
        }
      }
     }
    }
    }
   
    .pages{
      text-align: center;
     padding-top: 8px;
      background-color: #fff;
    }
 }
}
}
</style>