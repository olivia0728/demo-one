<template>
  <div id="problem-management">
    <Header :title="'问题管理'"></Header>
    <!-- 整体操作区域 -->
   <div class="total-operation">
    <div class="row1">
      <div class="key-word">
      <span>输入关键字：</span>
      <el-input v-model="input" placeholder="请输入内容" class="input" size="small"></el-input>
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
        <el-button type="primary" size="small"icon="el-icon-plus">新增问题</el-button>
      </div>
    </div>
    </div>
  
      <!-- 问题列表区域 -->
   <div class="problem-form">
    <el-table
    :data="tableData"
    height="470"
    border
    style="width: 100%"
    @row-click="handleEdit"
    >
    <!-- 扩展菜单 方便展示 -->
    <el-table-column type="expand" width="50">
      <template slot-scope="props">
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
          </div>

        </el-form>
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
      width="280">
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
      width="80">
    </el-table-column>
    <el-table-column
     label="操作"
     width="180"
    >
    <template slot-scope="props">
      <!-- 删除的提示框 -->
      <el-dialog
  title="删除提示"
  :visible.sync="deleteMessage"
  width="30%">
  <div class="content">
    确认删除编号为
    <strong>{{ props.row.id }}</strong>
    的问题吗
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="deleteMessage = false">取 消</el-button>
    <el-button type="primary" @click="handelDelete">确 定</el-button>
  </span>
      </el-dialog>
    <el-button  size="mini"  icon="el-icon-delete" type="danger" @click="deleteMessage = true">删除</el-button>
    <el-button v-show="props.row.status!='已解决'" size="mini"  icon="el-icon-thumb" type="warning" @click="handelSolve(props)">解决</el-button>
    
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
        // 用户列表
      tableData: [
        {
          id:'N0001',
          person:"鹿九巫",
          date:'2024.3.4',
          title: '居民街道水质中度污染问题',
          type:'生活垃圾污染',
          level:'重度污染',
          status:'未展开',
          number:'1234566666',
          address: '成都市新都区某街道3号'
        },  {
          id:'N0021',
          person:"鹿九巫",
          date:'2024.3.4',
          title: '翻斗花园XX湖水水质重度污染问题',
          type:'生活垃圾污染',
          level:'重度污染',
          status:'已解决',
          number:'1234566666',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id:'N0003',
          person:"鹿九巫",
          date:'2024.3.4',
          title: '居民街道水质污染问题',
          type:'生活垃圾污染',
          level:'重度污染',
          status:'解决中',
          number:'1234566666',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id:'N0006',
          person:"鹿九巫",
          date:'2024.3.4',
          title: '居民街道水质污染问题',
          type:'生活垃圾污染',
          level:'重度污染',
          status:'解决中',
          number:'1234566666',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id:'N0009',
          person:"鹿九巫",
          date:'2024.3.4',
          title: '居民街道水质污染问题',
          type:'生活垃圾污染',
          level:'重度污染',
          status:'解决遇阻',
          number:'1234566666',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id:'N0066',
          person:"鹿九巫",
          date:'2024.3.4',
          title: '居民街道水质污染问题',
          type:'生活垃圾污染',
          level:'重度污染',
          status:'未展开',
          number:'1234566666',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      // 弹出框信息
      // 1.删除信息
      deleteMessage:false,
      // 2.修改信息
      changeMessage:false,
      // 3.解决信息
      resolveMessage:false

    };
  },

  mounted() {
    
  },
  
  methods: {
    handelDelete(){
      // 弹出提示框
      this.$message({
          message: '删除成功',
          type: 'success'
        });
      this.deleteMessage = false

    },
    handelSolve(props){
      const row = props.row
      // console.log(row)
      // 跳转到详情页
      // 携带参数
      this.$router.push({
          path: '/index/problemdetail',
          query:{rowData:row}
        })

    }
  },
  components:{
    Header
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
 .problem-form{
  margin-top: 10px;
    padding: 5px 10px;
    height: 520px;
    .table-expand{
     display: flex;
     .detail-col1{
      margin-left: 30px;
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
    .pages{
      text-align: center;
     padding-top: 8px;
      background-color: #fff;
    }
 }
}
</style>