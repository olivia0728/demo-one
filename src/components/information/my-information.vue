<template>
  <div id="my-information">
    <Header :title="'个人信息'"></Header>
    <!-- 展示主要信息 -->
    <div class="mainInfo">
      <div class="infoImage">
        <i class="el-icon-camera-solid imageIcon"></i>
        <img src="../../../src/assets/avatar/default-avatar.png">
      </div>
      <div class="infoOther">
        <el-descriptions  size="small"  border direction="vertical" :column="3">
          <el-descriptions-item label="用户名">lujiuwu</el-descriptions-item>
          <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
          <el-descriptions-item label="居住地">成都市新都区</el-descriptions-item>
          <el-descriptions-item label="注册时间">2024-3-1</el-descriptions-item>
          <el-descriptions-item label="身份">
            <el-tag size="small">管理员</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="实名认证">
            <el-tag size="small" type="success">已认证</el-tag>
          </el-descriptions-item>
      </el-descriptions>
      </div>
    </div>
    <!-- 信息操作 -->
    <div class="infoOperation">
      <!-- 设置tab栏切换 -->
      <div class="tabs">
        <el-tabs v-model="activeName" @tab-click="gotoWhere(activeName)">
          <el-tab-pane v-for="(item,index) in tabs" :key="index"  :label="item.label" :name="item.label"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="body">
        <router-view style="background-color:#fff;border-bottom: 1px solid #eee;padding-bottom: 20px;"></router-view>
      </div>
    </div>

  </div>
</template>

<script>
// 导入头部
import Header from '../my-components/header'
export default {
  name: 'SewagecontrolMyInformation',

  data() {
    return {
      activeName: '修改信息',
      tabs:[
        {
          label:'修改信息',
          url:'changeinfo'
        },
        {
          label:'安全设置',
          url:'safeset'
        },
        {
          label:'实名认证',
          url:'identity'
        }
      ]
    };
  },

  mounted() {
    
  },

  methods: {
   gotoWhere(activeName){
     let url = ''
    this.tabs.forEach(function (item, index) {
  if(activeName == item.label){
    url = item.url
    return
  }
})
this.$router.push({name:url})
console.log(url)

   }
  },
  components:{
    Header
  }
};
</script>
<style scoped lang="less">
#my-information{
 .mainInfo{
  padding: 15px 0 ;
  display: flex;
  height: 170px;
  margin-bottom: 20px;
  margin-top: 10px;
  background-color: #fff;
  .infoImage{
    position: relative;
    padding: 20px;
    box-sizing: border-box;
    flex: 1;
    /*background-color: pink;*/
    .imageIcon{
      position: absolute;
      bottom: 20px;
      right: 30px;
      font-size: 27px;
      color: #409EFF;
      background-color: #fff;
      border-radius: 50px;
    
    }
    img{
      height: 100%;;
     
    }

  }
  /* 其他信息 */
  .infoOther{
    flex: 9;
    box-sizing: border-box;
    padding: 10px 200px 10px 20px;
  }
  
 }
 /* 信息操作 */
 .infoOperation{
    background-color: #fff;

  }
}
</style>