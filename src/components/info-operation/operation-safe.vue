<template>
  <div id="safeset">
  <div class="password">
    <div class="header">
      修改密码
    </div>
    <div class="body">
      <div class="current-password">
        <div class="title">当前密码：</div>
      <el-input
  placeholder="请输入内容"
  v-model="currentPassword"
  :disabled="true"
  style="width: 300px;"
  size="small">
</el-input>
      </div>
      <div class="change-password">
        <div class="title">修改密码：</div>
        <el-input
        placeholder="请输入内容"
        v-model="changePassword"
        clearable
        style="width: 300px;"
        size="small">
        </el-input>
      </div>
      <div class="sure-password">
        <div class="title">确认密码：</div>
        <el-input
        placeholder="请输入内容"
        v-model="surePassword"
        style="width: 300px;"
        clearable
        size="small">
        </el-input>
      </div>
      

    </div>
    <div class="button">
      <el-button type="primary" size="small" @click="sureChange()">确认</el-button>
      <el-button size="small" @click="notChange()">取消</el-button>
    </div>
  </div>
  <div class="phone">
    <div class="header">
      绑定手机
    </div>
    <div class="body">
      <div class="change-password">
        <div class="title">当前绑定：</div>
        <el-input
        placeholder="请输入内容"
        v-model="currentPhone"
        :disabled="true"
        style="width: 300px;"
        size="small">
        </el-input>
      </div>
      <div class="change-password">
        <div class="title">更换手机：</div>
        <el-input
        placeholder="请输入内容"
        v-model="changePhone"
        clearable
        style="width: 300px;"
        size="small">
        </el-input>
      </div>
      <div class="message">
        <div class="title">输入验证码：</div>
        <el-input
        placeholder="请输入内容"
        v-model="changePhone"
        clearable
        style="width: 194px;"
        size="small">
        </el-input>
        <el-button type="primary" size="small" >发送验证码</el-button>
      </div>
    </div>
    <div class="button">
      <el-button type="primary" size="small" @click="sureChange()">确认</el-button>
      <el-button size="small" @click="notChange()">取消</el-button>
    </div>
  </div>

  </div>
</template>

<script>
export default {
  name: 'SewagecontrolOperationSafe',

  data() {
    return {
      currentPassword:'123345',
      changePassword:'',
      surePassword:'',
      currentPhone:'18100000000',
      changePhone:''
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>
<style scoped lang="less">
#safeset{
  padding-top: 20px;
  display: flex;
  .password,.phone{
    flex: 1;
    .body{
      margin-top: 15px;
      font-size: 14px;
      line-height: 32px;
      color: #464646;
      padding-left: 10px;
      .current-password,.change-password,.sure-password,.message{
        display: flex;
        margin-bottom: 10px;

      }
    }
    .button{
  margin-top: 20px;
 padding-left: 80px;
 }
  }
  .phone{
    float: left;
  }
}
</style>