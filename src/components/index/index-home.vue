<template>
  <div id="index-home">
    <!-- 首页 -->
    <Header :title="'首页'"></Header>
    <div class="indexLine">
      <div class="singleBox" v-for="(item, indx) in boxList">
        <DataBox
          :icon="item.icon"
          :color="item.color"
          :title="item.title"
          :number="item.number"
          :status="item.status"
        ></DataBox>
      </div>
    </div>
    <div class="firstLine">
      <div class="days">
        <el-calendar v-model="value" class="calendar">
          <template slot="dateCell" slot-scope="{ date, data }">
            <div @click="handleDateClick(date)">
              <p :class="data.isSelected ? 'is-selected' : ''">
                {{ data.day.split("-")[2] }}
              </p>
            </div>
          </template>
        </el-calendar>
      </div>
      <div class="todo">
        <!-- 标题 -->
        <div class="todoTitle">
          <i class="el-icon-notebook-2" style="font-size: 18px"></i>
          待办事项
          <span class="todoIcon">
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
        <!-- 主体区域 -->
        <div class="todoBody">
          <!-- 事件显示区域 -->
          <div class="todoShow">
            <div class="singleTodo" v-for="(item, index) in RealtotoList">
              <i class="el-icon-info" style="color: #528684"></i>
              <!-- 表示收藏 -->
              <i
                class="el-icon-star-on"
                style="color: #efd94b; font-size: 18px"
                v-show="item.star"
              ></i>

              {{ item.content }}
              <span class="time">{{ item.time }}</span>
            </div>
          </div>
          <!-- 事件分页区域 -->
          <div class="todoPages">
            <el-pagination
              class="pagination"
              layout="prev, pager, next"
              :total="20"
              @current-change="changePage"
              :current-page="currentPage"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="openUse">
        <!-- 标题 -->
        <div class="toolTitle">
          <i class="el-icon-suitcase" style="font-size: 18px"></i>

          常用工具
        </div>
        <!-- 主体区域 -->
        <div class="toolBody">
          <div
            class="singleTool"
            v-for="(item, index) in toolList"
            :key="index"
            @click="gotoWhere(item.url)"
          >
            <!-- 图标 -->
            <img
              :src="item.img"
              style="height: 50px; width: 50px"
              class="toolImage"
            />
            <!-- 名称 -->
            <div class="toolName">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入头部
import Header from "../my-components/header";
import DataBox from "../my-components/databox";
export default {
  name: "SewagecontrolIndexHome",

  data() {
    return {
      value: new Date(),
      // 标题部分
      title: "首页",
      // 主渲染盒子
      boxList: [
        {
          title: "新增问题",
          number: "21",
          color: "#0ca5b3",
          icon: "el-icon-question",
          status: 1,
        },
        {
          title: "新增用户",
          number: "1",
          color: "#4762d7",
          icon: "el-icon-user-solid",
          status: 0,
        },
        {
          title: "待处理问题",
          number: "13",
          color: "#0ca5b3",
          icon: "el-icon-message-solid",
          status: 1,
        },
        {
          title: "水质合格率",
          number: "20%",
          color: "#4762d7",
          icon: "el-icon-s-marketing",
          status: 1,
        },
      ],
      currentPage: 1,
      RealtotoList: [],
      AlltodoList: [
        {
          // 第一页数据
          page: 1,
          singleTodo: [
            { content: "新都区污水问题待解决", star: true, time: "2024-4-6" },
            {
              content: "新都区污水问题解决进度待确认",
              star: false,
              time: "2024-4-1",
            },
            { content: "今日新增1名用户", star: true, time: "2024-3-11" },
            { content: "今日新增21个污水问题", star: true, time: "2024-3-6" },
            { content: "我是第一页的待办事项", star: false, time: "2024-3-2" },
            { content: "待处理污水问题：13个", star: true, time: "2024-3-2" },
            { content: "今日水质合格率为20%", star: false, time: "2024-3-1" },
            {
              content: "本周问题处理表单结果出来了！请查收：",
              star: false,
              time: "2024-3-1",
            },
            {
              content: "本周平台用户数据结果出来了！请查收",
              star: true,
              time: "2024-2-16",
            },
            {
              content: "用户admin提交了一个污水问题",
              star: false,
              time: "2024-2-11",
            },
          ],
        },
        {
          // 第二页数据
          page: 2,
          singleTodo: [
            { content: "今日新增21个污水问题", star: true, time: "2024-3-6" },
            { content: "我是第一页的待办事项", star: false, time: "2024-3-2" },
            { content: "待处理污水问题：13个", star: true, time: "2024-3-2" },
            { content: "今日水质合格率为20%", star: false, time: "2024-3-1" },
            {
              content: "本周问题处理表单结果出来了！请查收：",
              star: false,
              time: "2024-3-1",
            },
            {
              content: "本周平台用户数据结果出来了！请查收",
              star: true,
              time: "2024-2-16",
            },
            {
              content: "用户admin提交了一个污水问题",
              star: false,
              time: "2024-2-11",
            },
          ],
        },
      ],
      // 工具数组
      toolList: [
        {
          name: "用户管理",
          img: require("../../assets/user.png"),
          url: "/index/usermanagement",
        },
        {
          name: "数据分析",
          img: require("../../assets/数据.png"),
          url: "/index/dataanalyze",
        },
        {
          name: "处理问题",
          img: require("../../assets/problem.png"),
          url: "/index/problemmanagement",
        },
      ],
    };
  },

  mounted() {
    // 初始设置 -- 第一页
    this.RealtotoList = this.AlltodoList[0].singleTodo;
  },

  methods: {
    handleDateClick(date) {
      //点击日期
      const formattedDate =
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2);
      // 使用路由跳转到日期详情页面，并将日期作为参数传递
      console.log("点击的日期：", formattedDate); // 添加 console.log 检查选择的日期
      this.$router.push({ path: `/index/datedetail/` });
      //this.$router.push({ path: `/datedetail/${formattedDate}` });
    },
    // 换页
    changePage(pageNumber) {
      // console.log(pageNumber)
      const pageIndex = pageNumber - 1;
      this.RealtotoList = this.AlltodoList[pageIndex].singleTodo;
    },
    gotoWhere(url) {
      this.$router.push(url);
    },
  },
  components: {
    Header,
    DataBox,
  },
};
</script>
<style scoped lang="less">
#index-home {
  box-sizing: border-box;
  .indexLine {
    box-sizing: border-box;
    width: 100%;
    margin: 10px 0;
    display: flex;
    gap: 10px;
    .singleBox {
      flex: 1;
    }
  }
  .firstLine {
    padding: 0 5px;
    padding-bottom: 20px;
    display: flex;
    height: 385px;
    .days {
      width: 10%;
      height: 100%;
      padding-left: 5px;
      box-sizing: border-box;
      border-right: 2px solid #eee;
      flex: 45%;
      .calendar {
        width: 100%;
        /deep/ .el-calendar-table .el-calendar-day {
          height: 39px;
        }
      }
    }
    .todo {
      width: 55%;
      box-sizing: border-box;
      padding: 10px;
      background-color: #fff;
      overflow: hidden;
      .todoTitle {
        height: 40px;
        background-color: #fff;
        border-bottom: 1px solid #eee;
        line-height: 40px;
        padding-left: 10px;
      }
      .todoIcon {
        float: right;
      }
      .todoShow {
        .singleTodo {
          height: 30px;
          line-height: 30px;
          color: #1d1d1d;
          padding-left: 10px;
          font-size: 14px;
          background-color: #fff;
          border-bottom: 1px solid #eee;
          .time {
            float: right;
            color: #9f9f9f;
            font-size: 13px;
          }
          &:hover {
            filter: brightness(0.97);
          }
        }
      }
      .todoPages {
        display: flex;
        flex-direction: column;
        .pagination {
          align-self: center;
        }
      }
    }
    .openUse {
      margin-right: 5px;
      box-sizing: border-box;
      width: 35%;
      margin-left: 15px;
      background-color: #fff;
      padding: 10px;
      .toolTitle {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #eee;
      }
      .toolBody {
        padding-top: 10px;
        display: flex;
        flex-wrap: wrap;
        .singleTool {
          background-color: #fff;
          flex: 33%;
          height: 33%;
          display: flex;
          flex-direction: column;

          .toolImage {
            align-self: center;
          }
          .toolName {
            text-align: center;
            margin-top: 10px;
          }
          &:hover {
            filter: brightness(0.97);
          }
        }
      }
    }
  }
}
</style>