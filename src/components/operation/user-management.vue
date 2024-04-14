<template>
  <div id="users-management">
    <Header :title="'用户管理'"></Header>
   <!-- 整体操作区域 -->
   <div class="total-operation">
    <div class="row1">
      <div class="key-word">
      <span>输入关键字：</span>
      <el-input v-model="keyWord" placeholder="请输入内容" class="input" size="small"></el-input>

    </div>
    <div class="search">
      <el-button  size="small"  icon="el-icon-search">搜索</el-button>
    </div>
    <div class="reset">
      <el-button type="primary" size="small" icon="el-icon-refresh">重置</el-button>
    </div>
    </div>
    <div class="row2">
      <div class="button">
        <el-button type="primary" size="small"icon="el-icon-plus" @click="dialogVisible = true">添加</el-button>
      </div>
    </div>
   
   </div>
   <!-- 新增弹出框 -->
   <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
>
  <div id="dialog">
    <div class="username">
      <span class="title">用户姓名:</span>
      <el-input v-model="username" placeholder="请输入内容" size="small" class="input"></el-input>
    </div>
    <div class="phone">
      <span class="title">用户电话号码:</span>
      <el-input v-model="phone" placeholder="请输入内容" size="small" class="input"></el-input>
    </div>
    <div class="address">
      <span class="title">用户地址:</span>
      <el-input v-model="address" placeholder="请输入内容" size="small" class="input"></el-input>
    </div>
    <div class="time">
      <span class="title">创建时间:</span>
      <span class="time-text">{{ time }}</span>
    </div>
  </div>
  <div class="buttons">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sureSubmit()">确 定</el-button>
  </div>
   
   </el-dialog>

   
   <!-- 用户区域 -->
   <div class="users-area">
    <el-table
    :data="tableData"
    height="500"
    border
    style="width: 100%"
    >
    <el-table-column
      prop="date"
      label="注册日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>

    <el-table-column
      prop="number"
      label="电话号码"
      width="270">
    </el-table-column>

    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
    <!-- 操作区域 -->
    <el-table-column
     label="操作"
     width="180"
    >
    <template slot-scope="scope">
      <el-popover
  placement="top"
  width="160"
  v-model="scope.row.delete_show">
  <span>确认删除用户{{scope.row.name}}吗？</span>
  <div style="text-align: right; margin: 0">
    <el-button size="mini" type="text" @click="scope.row.delete_show = false">取消</el-button>
    <el-button type="primary" size="mini" @click="sureDelete(scope)">确定</el-button>
  </div>
</el-popover>
<el-button  size="mini"  icon="el-icon-delete" type="danger" @click="scope.row.delete_show = true">删除</el-button>

      <!-- 删除操作 -->
      
        
      <!-- 修改操作 -->
      <el-button  size="mini"  icon="el-icon-edit" type="primary" @click="scope.row.edit_show = true">修改</el-button>
      <!-- 修改弹出框 -->
   <el-dialog
  title="提示"
  :visible.sync="scope.row.edit_show"
  width="30%">
  <div id="dialog">
    <div class="username">
      <span class="title">用户姓名:</span>
      <el-input v-model="username" placeholder="请输入内容" size="small" class="input"></el-input>
    </div>
    <div class="phone">
      <span class="title">用户电话号码:</span>
      <el-input v-model="phone" placeholder="请输入内容" size="small" class="input"></el-input>
    </div>
    <div class="address">
      <span class="title">用户地址:</span>
      <el-input v-model="address" placeholder="请输入内容" size="small" class="input"></el-input>
    </div>
  </div>
  <div class="buttons">
    <el-button @click="scope.row.edit_show = false">取 消</el-button>
    <el-button type="primary" @click="sureEdit(scope)">确 定</el-button>
  </div>
   
   </el-dialog>
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
import dayjs from 'dayjs';
import Header from '../my-components/header';
// 从store中导入用户数据
import {mapState} from 'pinia'
import storeId from '@/store/index'  //storeId就是导出的那个值
export default {
  name: 'SewagecontrolUserManagement',

  data() {
    return {
      // 关键字
      keyWord:'',
      dialogVisible:false,
      // 新增用户数据
      username:'',
      phone:'',
      address:'',
      time:dayjs(new Date()).format('YYYY-MM-DD')
      }
    },

  mounted() {
    
  },

  methods: {
    sureSubmit(){
     // 检查数据完整性
    if(!this.username||!this.phone||!this.address){
      this.$message.error('请将信息填写完整');
    }else{
      this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.username = ''
        this.phone = ''
        this.address = ''
    }
    },
    sureDelete(props){
      const store = storeId()
      const row = props.row
      // 更新用户数据
      const newData = this.tableData.filter((item)=>item.name!==row.name)
      // 同步store
      store.updateTableData(newData)
      this.$message({
          message: '删除成功',
          type: 'success'
        });
    },
    sureEdit(props){
      this.$message({
          message: '修改成功',
          type: 'success'
        });
      props.row.edit_show = false
    }
    
  },
  components:{
    Header
  },
  computed:{
    // 按需导入 -- 用户数据
    ...mapState(storeId,['tableData'])
  }

};
</script>
<style scoped lang="less">
#users-management{
  .total-operation{
   
    .row1{
      padding: 10px 15px;
      display: flex;
      span{
        font-size: 14px;
      }
      .input{
        width: 250px;
      }
      .search,.reset{
        margin-left: 10px;
      }
    }
    .row2{
      padding: 6px 15px;
    }
  }
  #dialog{
/* background-color: pink; */
.username,.phone,.address,.time{
  margin-bottom: 25px;
  display: flex;
  .time-text{
    line-height: 32px;
    padding-left: 10px;
  }
  .title{
    width: 100px;
    display: inline-block;
    text-align: center;
    line-height: 32px;
  }
  .input{
    width: 300px;
  }
}
  }
  .buttons{
    text-align: center;
  }
  .users-area{
    margin-top: 10px;
    padding: 5px 10px;
    height: 550px;
    .pages{
      text-align: center;
     padding-top: 8px;
      background-color: #fff;
    }
  }
}
</style>