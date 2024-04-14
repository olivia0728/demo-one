<template>
  <div class="login-register">
    <el-input v-model="username" placeholder="请输入账号" class="username" @focus="ChangeUsername()" @input="ChangeUsername()"></el-input>
    <Attention :show="showUsername" :content="'账号'"></Attention>
    <el-input v-model="password" placeholder="请输入密码" class="password" @focus="ChangePassword()" @input="ChangePassword()"></el-input>
    <Attention :show="showPassword" :content="'密码'"></Attention>
    <el-input v-model="again_password" placeholder="再次确认密码" class="again-password" @focus="ChangeAgainPassword()" @input="ChangeAgainPassword()"></el-input>
    <Attention :show="showAgainPassword" :content="'再次确认的密码'"></Attention>
    <button class="enter-button">立即注册</button>
  </div>
</template>

<script>
import Attention from '../my-components/attention.vue'
export default {
  name: 'SewagecontrolLoginRegister',

  data() {
    return {
      username:"",
      password:"",
      again_password:"",
      showUsername:false,
      showPassword:false,
      showAgainPassword:false
    };
  },

  mounted() {
    
  },

  methods: {
    ChangeUsername(){
      if(this.username==''){
        this.showUsername = true
      }else{
        this.showPassword = false
      }
    },
    ChangePassword(){
      if(this.password==''){
        this.showPassword = true
      }else{
        this.showPassword = false
      }
    },
    ChangeAgainPassword(){
      if(this.again_password==''){
        this.showAgainPassword = true
      }else{
        this.showAgainPassword = false
      }
    },
  
  },
  components:{
      Attention
    }
};
</script>
<style scoped lang="less">
.login-register{
  .username,.password,.again-password,.enter-button{
    margin-top: 40px;
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
}
</style>