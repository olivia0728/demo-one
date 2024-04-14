<template>
  <div id="changeInfo">
    <div class="username">
      <div class="title">用户名：</div>
      <el-input
      placeholder="请输入内容"
      v-model="username"
      class="input"
      clearable
      style="width: 300px;"
      size="small">
     </el-input>
    </div>
    <div class="place">
      <div class="title">居住地：</div>
      <el-input
      placeholder="请输入内容"
      v-model="place"
      class="input"
      clearable
      style="width: 300px;"
      size="small">
     </el-input>
    </div>
    <div class="identity">
      <div class="title">修改身份：</div>
     
        <el-radio v-model="identity" label="管理员" border size="small">管理员</el-radio>
        <el-radio v-model="identity" label="普通用户" border size="small" >普通用户</el-radio>
      
    </div>
    <div class="button">
      <el-button type="primary" size="small" @click="sureChange()">确认</el-button>
      <el-button size="small" @click="notChange()">取消</el-button>
    </div>
   
  </div>
</template>

<script>
export default {
  name: 'SewagecontrolOperationChange',

  data() {
    return {
      // 用户名
      username:'lujiuwu',
      // 居住地
      place:'成都市新都区',
      // 身份
      identity:'管理员',
    };
  },

  mounted() {
    
  },

  methods: {
    // 点击确认按钮
    sureChange(){
      if(!this.username||!this.place||!this.identity){
        // 表单为填写完整 -- 弹窗提示
        this.$message({
          message:'请将修改信息填写完整',
          type: 'warning'
        });
      }
      else{
        // 提交成功
        this.$message({
          message:'修改成功',
          type: 'success'
        });
      }
    },
    // 取消修改
    notChange(){
      this.username = ''
      this.place = ''
      this.identity = ''
    }
  },
};
</script>
<style scoped lang="less">
#changeInfo{
  padding-top: 20px;
  background-color: #fff;
 .username,.place,.identity{
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  div{
    width: 80px;
    
    line-height: 32px;
   text-align: right;
    font-size: 14px;
  }
 }
 .button{
  margin-top: 30px;
 padding-left: 80px;
 }
}
</style>