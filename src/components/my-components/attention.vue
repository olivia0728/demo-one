<template>
  <div class="attention" v-show="show">
    {{content}}不能为空
  </div>
</template>

<script>
export default {
  name: 'SewagecontrolAttention',

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
  props:{
    // 是否展示
    show:{
      required:true,
      type:Boolean,
      default:false
    },
    // 输入内容
    content:{
      required:true,
      type:String
    }
  }
};
</script>
<style scoped lang="less">
.attention{
  color: rgb(230, 75, 75);
  margin-top: 3px;
  font-size: 14px;
}
</style>