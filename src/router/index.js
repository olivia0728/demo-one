import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import LoginEnter from '../components/login/login-enter.vue'
import LoginRegister from '../components/login/login-register.vue'
import Index from '../views/index.vue'
import IndexHome from '../components/index/index-home.vue'
import UserManagement from '../components/operation/user-management.vue'
import ProblemManagement from '../components/operation/problem-management.vue'
import MyInformation from '../components/information/my-information.vue'
import ChangeInfo from '../components/info-operation/operation-change.vue'
import SafeSet from '../components/info-operation/operation-safe.vue'
import Identity from '../components/info-operation/operation-identity.vue'
import PlatformInformation from '../components/information/platform-information.vue'
import DataAnalyze from '../components/data/data-analyze.vue'
// 解决问题的详情界面
import ProblemDetail from '../components/problem-detail/problem-detail.vue'
import DataStand from '../components/data/data-stand.vue'
//历史日期数据
import Datedetail from '../components/data/datedetail.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  // 登录操作
  {
    path: '/login',
    component: Login,
    children: [{
        path: '',
        redirect: 'enter'
      },
      {
        path: 'enter',
        name: 'loginEnter',
        component: LoginEnter
      },
      // 2.注册
      {
        path: 'register',
        name: 'loginRegister',
        component: LoginRegister
      }
    ]

  },
  // 首页
  {
    path: '/index',
    component: Index,
    // 子路由
    children: [{
        path: '',
        redirect: 'home'
      },
      {
        path: 'home',
        name: 'indexHome',
        component: IndexHome
      },
      {
        path: 'usermanagement',
        name: 'userManagement',
        component: UserManagement
      },
      {
        path: 'problemmanagement',
        name: 'problemManagement',
        component: ProblemManagement
      },
      {
        path: 'problemdetail',
        name: 'problemdetail',
        component: ProblemDetail
      },
      {
        path: 'myinformation',
        component: MyInformation,
        children: [{
            path: '',
            redirect: 'changeinfo'
          },
          {
            path: 'changeinfo',
            name: 'changeinfo',
            component: ChangeInfo
          },
          {
            path: 'safeset',
            name: 'safeset',
            component: SafeSet
          },
          {
            path: 'identity',
            name: 'identity',
            component: Identity
          },

        ]
      },
      {
        path: 'platforminformation',
        name: 'platforminformation',
        component: PlatformInformation
      },
      {
        path: 'dataanalyze',
        name: 'dataAnalyze',
        component: DataAnalyze
      },
      {
        path: 'datastand',
        name: 'datastand',
        component: DataStand
      },
      {
        path: 'datedetail',
        name: 'datedetail',
        component: Datedetail
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router