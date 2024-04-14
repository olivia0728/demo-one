<template>
  <div class="login-enter">
    <el-input v-model="username" placeholder="请输入账号" class="username" @focus="ChangeShowUsername()"  @input="ChangeShowUsername()"></el-input>
    <Attention :show="showUsername" :content="'账号'"></Attention>
    <el-input v-model="password" placeholder="请输入密码" show-password class="password" @focus="ChangeShowPassword()" @input="ChangeShowPassword()"></el-input>
    <Attention :show="showPassword" :content="'密码'"></Attention>
    <button class="enter-button" @click="gotoIndex()">立即登录</button>
    <!-- 帮助 -- 忘记密码和修改密码 -->
    <div class="help">
      <div class="forget">
        忘记密码
      </div>
      <div class="reset">
        修改密码
      </div>

    </div>
  </div>
</template>

<script>
import Attention from '../my-components/attention.vue'
export default {
  name: 'SewagecontrolLoginEnter',

  data() {
    return {
      username:"",
      password:"",
      showUsername:false,
      showPassword:false
    };
  },

  mounted() {
    
  },

  methods: {
    ChangeShowUsername(){
      if(this.username==''){
        this.showUsername = true
      }else{
        this.showUsername = false
      }
    },
    ChangeShowPassword(){
      if(this.password==''){
        this.showPassword = true
      }else{
        this.showPassword = false
      }
    },
    gotoIndex(){
      // 第一步 -- 验证
      if(!this.username||!this.password){
        // console.log("不想写了好累")
        // 弹窗提示
        this.$message.error('请将信息填写完整');
      }
      else
      // 第二步 -- 跳转
      this.$router.push('/index')

    }
  },
  components:{
    Attention
  }
};
</script>
<style scoped lang="less">
.login-enter{
  .username,.password,.enter-button{
   margin-top: 20px;
  }
  .enter-button{
    width: 100%;
    outline: none;
    border: none;
    background-color: #528684;
    height: 40px;
    border-radius: 3px;
    font-size: 18px;
    color: #fff;
    &:hover{
      background-color: #4f7d7c;
    }

  }
  .help{
    margin-top: 20px;
    display: flex;
    width: 100%;
    .forget,.reset{
      text-align: center;
      flex: 1;
      color: #528684;
    }
  }
}
</style>