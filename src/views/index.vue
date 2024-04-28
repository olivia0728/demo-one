<template>
  <div id="index">
    <el-container>
      <el-aside width="240px">
        <!-- 左侧 -- 选择栏 -->
        <div class="index-left">
          <!-- 项目名称 -->
          <div class="title">污水防治系统</div>

          <!-- 搜索栏 -- 这个爽 -->
          <div class="el-input">
            <el-input
              placeholder="点击搜索关键字"
              v-model="filterText"
              clearable
              size="small"
            >
            </el-input>
          </div>

          <!-- 树形结构 -->
          <div class="tree">
            <el-tree
              ref="tree"
              :data="data"
              :props="defaultProps"
              :filter-node-method="filterNode"
              class="el-tree"
              default-expand-all
            >
              <span slot-scope="{ node, data }">
                <i
                  v-if="node.expanded && node.level == 1"
                  class="el-icon-wallet"
                  style="font-size: 20px"
                ></i>
                <i v-else class="el-icon-document" style="font-size: 19px"></i>
                <span
                  style="margin-left: 10px; font-size: 19px"
                  @click="gotoWhere(node)"
                  >{{ node.label }}</span
                >
              </span>
            </el-tree>
          </div>
        </div>
      </el-aside>
      <el-container>
        <el-main>
          <!-- 右侧 -- 显示界面 -->
          <div class="index-right">
            <!-- 头部 -- 简单操作栏 -->
            <div class="right-header">
              <!-- 右侧元素 --全局搜索 头像 退出登录按钮 设置 -->
              <div class="search-all">
                <el-input
                  placeholder="全局搜索"
                  v-model="search_all"
                  clearable
                  size="small"
                >
                </el-input>
              </div>
              <div class="my-avatar">
                <el-dropdown class="drop-down" placement="bottom-start">
                  <!-- 鼠标滑过头像 -- 显示下拉菜单 -->
                  <img
                    src="../../src/assets/avatar/default-avatar.png"
                    class="avatar-image"
                  />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="(item, index) in dropDownData"
                      :key="index"
                      @click="gotoInfo(item.url)"
                      >{{ item.title }}</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="log-out">
                <span class="out-button" @click="logOut()">点击退出</span>
                <!-- 弹出框 -- 确认是否关闭 -->
                <el-dialog
                  title="提示"
                  :visible.sync="dialogVisible"
                  width="30%"
                >
                  <span>确定退出登录吗</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="sureLogOut"
                      >确 定</el-button
                    >
                  </span>
                </el-dialog>
              </div>
              <!-- 点击设置 -- 显示从右到左的抽屉组件 -->
              <div class="set" @click="drawer = true">
                <i
                  class="el-icon-s-tools"
                  style="font-size: 25px; color: #528684"
                ></i>
              </div>
              <el-drawer title="全局设置" :visible.sync="drawer">
                <!-- 1. 设置夜间模式 -->

                <div class="setMode">
                  <div class="title">模式设置</div>
                  <el-switch
                    v-model="nightMode"
                    active-text="夜间模式"
                    inactive-text="日间模式"
                  >
                  </el-switch>
                  <div class="title">主题设置</div>
                </div>
              </el-drawer>
            </div>
            <div class="right-body">
              <router-view></router-view>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "SewagecontrolIndex",
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val.trim());
    },
  },
  data() {
    return {
      filterText: "",
      search_all: "",
      // 选择栏选项数组
      data: [
        {
          label: "首页",
          url: "home",
        },
        {
          label: "相关信息",
          children: [
            {
              label: "个人信息",
              url: "myinformation",
            },
            {
              label: "平台信息",
              url: "platforminformation",
            },
          ],
        },
        {
          label: "管理操作",
          children: [
            {
              label: "用户管理",
              url: "usermanagement",
            },
            {
              label: "问题管理",
              url: "problemmanagement",
            },
          ],
        },
        {
          label: "数据可视化",
          children: [
            {
              label: "数据分析",
              url: "dataanalyze",
            },
            {
              label: "污水实时数据",
              url: "datastand",
            },
            {
              label: "历史数据",
              url: "datedetail",
            },
          ],
        },
        {
          label:'预警系统',
          url:'warning'
        },
        {
          label:'检测界面',
          url:'warningdetection'
        }
      ],

      defaultProps: {
        children: "children",
        label: "label",
        url: "home",
      },
      // 下拉菜单选项内容
      dropDownData: [
        {
          title: "个人信息",
          url: "myinformation/changeinfo",
        },
        {
          title: "切换账号",
          url: "switch",
        },
      ],
      // 控制弹窗显示
      dialogVisible: false,
      // 控制抽屉组件显示
      drawer: false,
      // 夜间模式
      nightMode: false,
    };
  },

  mounted() {},

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    gotoWhere(node) {
      const url = node.data.url;
      if (!url) {
        return;
      } else {
        // 跳转
        const currentPath = this.$route.path;
        const urlString = "/index/" + url;
        console.log(currentPath);
        console.log(urlString);
        if (currentPath === urlString) return;
        else this.$router.push(urlString);
      }
    },
    logOut() {
      this.dialogVisible = true;
    },
    sureLogOut() {
      // 确认退出登录
      this.dialogVisible = false;
      this.$router.push("/login");
    },
    // 点击下拉菜单 -- 进入个人信息页面
    gotoInfo(url) {
      this.$router.push("/index/" + url);
    },
  },
};
</script>
<style scoped lang="less">
#index {
  background-color: #fff;
  display: flex;
  .el-container {
    width: 100%;

    .el-aside {
      background-color: #064965;
      height: 100vh;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      .index-left {
        padding: 20px;
        box-sizing: border-box;

        .title {
          font-size: 20px;
          font-weight: bold;
          color: #fff;
          margin-bottom: 20px;
        }
        .el-input {
          margin-bottom: 10px;
        }
        .el-tree {
          background-color: #064965;
          color: #fff;
        }
        /deep/ .el-tree-node__label {
          width: auto;
          margin-top: 12px;
          font-size: 19px;
          letter-spacing: 1px;
        }
        /deep/ .el-tree-node__content {
          height: 45px;
          &:hover {
            background-color: #136386;
          }
        }
        /deep/ .el-tree-node:focus > .el-tree-node__content {
          background-color: #064965;
        }
        /deep/ .el-tree-node > .el-tree-node__children {
          overflow: hidden;
          background-color: #064965;
        }
      }
    }
    .el-main {
      position: absolute;
      left: 240px;
      right: 0;
      top: 0;
      bottom: 0;
      padding: 0;
      .index-right {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 15px;
        // background-color: pink;
        width: 100%;
        .right-header {
          height: 40px;

          box-sizing: border-box;
          width: 100%;
          border-bottom: 1px solid #528684;
          display: flex;
          .search-all {
            width: 80%;
            // background-color: pink;
            padding: 0 20px;
          }
          .my-avatar {
            padding-right: 10px;
            width: 8%;
            //  background-color: blue;
            .drop-down {
              float: right;
            }
            .avatar-image {
              height: 30px;
              width: 30px;
              float: right;
            }
          }
          .log-out {
            width: 12%;
            // background-color: pink;
            padding: 0 10px;

            box-sizing: border-box;
            .out-button {
              display: inline-block;
              // background-color: blue;
              height: 80%;
              width: 100%;
              line-height: 28px;
              text-align: center;
              color: #fff;
              background-color: #528684;
              font-size: 14px;
              border-radius: 10px;
              &:hover {
                background-color: #65a2a0;
                cursor: pointer;
              }
            }
          }
          .set {
            padding-top: 3px;
          }
          .setMode {
            padding: 0 20px;
            .title {
              margin: 20px 0 15px;
              font-size: 17px;
              color: #666;
            }
          }
        }
        .right-body {
          box-sizing: border-box;
          background-color: #eee;
        }
      }
    }
  }

  // 右侧展示界面区域
}
</style>