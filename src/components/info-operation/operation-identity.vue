<template>
  <div id="identity">
    <el-card shadow="always" class="card">
      <div class="identity-title">
        已实名
      </div>
      <div class="identity-info">
        <div class="name">
          <span class="name-title">姓名：</span>
          <span class="name-info">张三</span>
        </div>
        <div class="number">
          <span class="number-title">
            身份证号码：
          </span>
          <span class="number-info">
            12344566666
          </span>
        </div>
       
      </div>

    </el-card>
  </div>
</template>

<script>
export default {
  name: 'SewagecontrolOperationIdentity',

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
#identity{
  padding-top: 20px;
 .card{
   width: 300px;
   height: 150px;
   border-radius: 10px;
   .identity-info{
    margin-top: 20px;
    font-size: 14px;
    color: #666;
    .name{
      margin-bottom: 10px;
    }
    &:hover{
      cursor: not-allowed;
    }
   }
 }
}
</style>