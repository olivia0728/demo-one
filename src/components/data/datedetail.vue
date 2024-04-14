
<template>
  <div>
    <div class="daily-data-container">
      <h2>{{ 当日污水排放数据 }}</h2>
      <div v-for="(item, index) in sewageData" :key="index" class="data-item">
        <p>监测点: {{ item.monitoringPoint }}</p>
        <p>水质: {{ item.waterQuality }}</p>
        <p>pH值: {{ item.pH }}</p>
        <p>浊度: {{ item.turbidity }}</p>
        <!-- 根据需要展示更多数据 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "", // 当日污水排放数据标题
      sewageData: [], // 污水排放数据
    };
  },
  mounted() {
    this.displayMockData();
  },
  methods: {
    displayMockData() {
      // 模拟的当日污水排放数据
      const mockData = [
        {
          monitoringPoint: "监测点1",
          waterQuality: "良好",
          pH: 7.2,
          turbidity: "低",
        },
        {
          monitoringPoint: "监测点2",
          waterQuality: "良好",
          pH: 7.5,
          turbidity: "中等",
        },
        {
          monitoringPoint: "监测点3",
          waterQuality: "较差",
          pH: 6.8,
          turbidity: "高",
        },
        // 可以添加更多模拟数据
      ];

      // 获取当前日期
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // 月份从0开始，需要加1
      const day = ("0" + currentDate.getDate()).slice(-2);
      const formattedDate = `${year}-${month}-${day}`;

      // 设置标题和数据
      this.title = `当日污水排放数据 (${formattedDate})`;
      this.sewageData = mockData;
    },
  },
};
</script>

<style scoped>
/* 添加必要的样式 */
.daily-data-container {
  /* 添加样式以美化容器 */
}
.data-item {
  /* 添加样式以美化数据项 */
}
</style>
