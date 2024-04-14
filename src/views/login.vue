<template>
  <div id="main-login">
    <div class="login-page">
    <div class="login-box">
      <div class="box-left">
        <!-- 放一个logo -->
        <div class="logo">
          <h1>防治污水</h1>
        </div>
        <!-- 放一些描述性文字 -->
        <div class="des-text">
          <p class="start">
            当前，我国生态文明建设进入了:
          </p>
          <p>
            以降碳为重点战略方向、推动减污降碳协同增效、
          </p>
          <p>
            促进经济社会发展全面绿色转型、
          </p>
          <p>
            实现生态环境质量改善由量变到质变的关键时期。
          </p>
         

          <p class="key-point">
            污水处理既是深入打好污染防治攻坚战的重要抓手，也是推动温室气体减排的重要领域。
          </p>
          
        </div>
        <!-- 帮助选项 -->
        <div class="help">
          <div class="know-more">
            了解更多
          </div>
          <div class="have-problem">
            我有疑问
          </div>
        </div>
      </div>
      <div class="box-right">
        <!-- 首部选项 -- 登录/注册 -->
        <div class="right-head">
          <router-link to="/login/enter">登录</router-link>
          <router-link to="/login/register">注册</router-link>
        </div>
        <!-- 主体区域 -->
        <div class="right-body">
        <router-view></router-view>
        </div>

      </div>
    </div>
  </div>

  </div>
  
</template>

<script>
export default {
  name: 'SewagecontrolLogin',

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style scoped lang="less">
#main-login{
  background-image: url("/src/assets/login-bg.png");
  background-repeat: no-repeat;
  background-size: 100%;
  background-attachment: fixed;
  filter:brightness(1);
  padding: 100px 290px;
  .login-page{
  width: 100%;
  height: 100%;
  margin: 0 auto;

 .login-box{
  filter:brightness(1);
  width: 100%;
  height: 100%;
  display: flex;
  .box-left{
    color: #fff;
    
    padding: 100px 60px;
    flex: 4;
    background-color: rgba(82, 134, 132, 0.8);
   
    .des-text{
      //background-color: pink;
      p{
        margin-top: 6px;
      }
      .start{
        margin-top: 20px;
      }
      .key-point{
        font-weight: bold;
      }
    }
    .help{
      display: flex;
      width: 100%;
      margin-top: 160px;
      //background-color: pink;
      div{
        flex: 1;
        text-align: center;
      }
    }

    }
  }
  .box-right{
    padding: 100px 80px;
    flex: 5;
    background-color: #fff;
    .right-head{
      height: 30px;
      // background-color: pink;
      display: flex;
      a{
        flex: 1;
        text-decoration: none;
        color: #528684;
        text-align: center;
        font-size: 16px;
       
      
      }
      // 激活样式
      .router-link-exact-active{
          border-bottom: 2px solid #528684;
        }
    
    }
  }
 }
}


</style>