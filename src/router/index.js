import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "@/views/Index";
import PageThree from "@/views/PageThree";
import PageFour from "@/views/PageFour";
import saveStudent from "@/views/findStudent"
import UserOperation from "@/views/UserOperation"
import companyOperation from "@/views/companyOperation";
import blockOperation from "@/views/blockchainOperation_ui"
import login from "@/views/login_ui"
import logout from "@/views/logout"

Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: '企业端口',
    component: Index,
    redirect:'/companyOperation',
    children:[
      {
        path:'/companyOperation',
        name:'查询学生信息',
        component: companyOperation
      },
    ]
  },
  {
    path:'/Home',
    name:'高校端口',
    component: Index,
    children: [
      {
        path:'/UserOperation',
        name:'用户',
        component: UserOperation
      },
      {
        path:'/PageThree',
        name:'创建新区块',
        component: PageThree
      },
      {
        path:'/PageFour',
        name:'区块操作',
        component: PageFour
      },

    ]
  },
  {
    path:'/Home',
    name:'超级管理员',
    component:Index,
    children: [
      {
        path:'/blockOperation',
        name:'管理区块',
        component:blockOperation
      },
    ]
  },
  {
    path:'/',
    name:'登录',
    component: login
  },
  {
    path:"/logout",
    name:"退出",
    component: logout
  }

]

const routers1 = [
  {
    path:'/findStudent',
    name:'查找',
    component:saveStudent
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,routers1
})

export default router
