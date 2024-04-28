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
// 从store中导入用户数据
import {mapState} from 'pinia'
import storeId from '@/store/index' 
import Attention from '../my-components/attention.vue'
export default {
  name: 'SewagecontrolLoginEnter',

  data() {
    return {
      username:"lisii",
      password:"admin123456",
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
      else{
        // 判断是否存在该用户
        const isExist = this.tableData.filter((item)=>{
          return item.username === this.username
        })
        if(isExist.length === 0){
          this.$message.error('不存在该用户，请先进行注册');
        }else{
          // 判断密码是否正确
          if(this.password!==isExist[0].password)  this.$message.error('密码错误，请重新输入');
          else{
            // 第一步 -- 提示框
            this.$message.success(`用户${isExist[0].username}登录成功`);
            // 第二步 -- 跳转
            this.$router.push('/index')
          }
        }
      }
      

    }
  },
  components:{
    Attention
  },
  computed:{
    // 按需导入 -- 用户数据
    ...mapState(storeId,['tableData'])
  }
};
</script>
<style scoped lang="less">
.login-enter{
  .username,.password,.enter-button{
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
  .help{
    margin-top: 50px;
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