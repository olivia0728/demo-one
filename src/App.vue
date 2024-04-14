<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Login from "./views/login.vue";
export default {
  name: 'SewagecontrolApp',

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
  components:{
    Login

  }
};
</script>
<style scoped lang="less">
#app{
 
  width: 100vw;
  height: 100vh;
  // background-color: red;
  box-sizing:border-box;
 padding: 0;
}

</style>