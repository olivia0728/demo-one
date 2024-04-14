<template>
  <div>
    <div id="mainLine">
      {{title}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SewagecontrolHeader',

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
  props:{
    // 根据传入的数据渲染
    title:{
      required:true,
      type:String
    }
  }
};
</script>
<style scoped lang="less">
   #mainLine{
    background-color: #fff;
    height: 36px;
    line-height: 36px;
    padding: 0 10px;
    font-size: 16px;
    color: #528684;

    margin-bottom: 5px;
  }
</style>