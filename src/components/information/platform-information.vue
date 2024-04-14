<template>
  <div id="platform">
    <Header :title="'平台信息'"></Header>
    <!-- 说实话不知道放什么了 就放点用户数据和评分详情吧 -->
    <div class="all-info">
      <div class="users-number">
          <el-statistic
            group-separator=","
            :precision="2"
            :value="usersNumber"
            :title="usersTitle"
          >
          <template slot="prefix">
              <i class="el-icon-s-flag" style="color: red"></i>
            </template>
            <template slot="suffix">
              <i class="el-icon-s-flag" style="color: blue"></i>
            </template>
          </el-statistic>
    </div>
    <div class="problem-solve">
      <el-statistic
            group-separator=","
            :precision="2"
            :value="problemSolve"
            :title="problemTitle"
      >
      </el-statistic>
    </div>
    <div class="star-number">
      <el-statistic
            group-separator=","
            :precision="2"
            :value="starNumber"
            :title="starTitle"
      >
      <template slot="suffix">
        <i
          class="el-icon-star-on"
          style="color:red"
      ></i>
      </template>
      
      </el-statistic>
    </div>
    </div>
   <div class="pie">
    <div id="EChart" style="width: 900px;height:400px;"></div>
   </div>
  </div>
</template>

<script>
// 导入头部
import Header from '../my-components/header'
export default {
  name: 'SewagecontrolPlatformInformation',

  data() {
    return {
      usersNumber:123,
      usersTitle:'总用户',
      problemSolve:100,
      problemTitle:'解决污水问题',
      starNumber:140,
      starTitle:'star个数'
    };
  },

  mounted() {
    // 在生命周期中调用 getRenderer 方法
    this.getRenderer();
  },

  methods:{
    getRenderer() {
      // 基于准备好的dom，初始化echarts实例
      let EChart = this.$echarts.init(document.getElementById("EChart"));
      // 配置参数
      let config = {
        title: {
    text: '污水防治系统',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    left: 'center',
    top: 'bottom',
    data: [
      'Vue',
      'Java',
      'SpringBoot',
      'Element',
      'MySQL'
    ]
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
   
    {
      name: '污水防治系统',
      type: 'pie',
      radius: [20, 140],
      center: ['75%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 5
      },
      data: [
        { value: 30, name: 'Vue' },
        { value: 28, name: 'Java' },
        { value: 26, name: 'SpringBoot' },
        { value: 24, name: 'Element' },
        { value: 22, name: 'MySQL' }
      ]
    }
  ]
      };
      // 设置参数
    EChart.setOption(config);
}
  },
  components:{
    Header
  }
};
</script>
<style scoped lang="less">
#platform{
  .all-info{
    margin-top: 10px;
    background-color: #fff;
    padding:  20px;
    display: flex;
    gap:10px;
    .users-number,.problem-solve,.star-number{
      box-sizing: border-box;
      padding-top: 20px;
      flex: 1;
      height: 90px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 1px 1px 1px #9b9b9b;
    }
  }
  .pie{
    margin-top: 10px;
    padding-top: 10px;
    background-color: #fff;
  }
  
}
</style>