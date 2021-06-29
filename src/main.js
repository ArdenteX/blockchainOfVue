import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store, {initMenu} from './store'
import './plugins/element.js'
import axios from 'axios'

Vue.config.productionTip = false

const token = window.sessionStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = token
axios.defaults.baseURL = 'http://localhost:8181'


const initmenu = (router, store)=>{
  if(store.state.routes.length > 0){
    return;
  }
  axios.get("/menu/getMenu/" + window.sessionStorage.getItem("role")).then(function (resp){
    console.log(resp)
    if(resp && resp.status === 200){
      const fmtRouters = formatRouters(resp.data);
      router.addRoutes(fmtRouters)
      store.commit('initMenu',fmtRouters)
    }
  })

}

const formatRouters = (routes)=>{
  let fmRouters = [];
  routes.forEach(router=> {
    let {
      path,
      component,
      name,
      redirect,
      children
    } = router;
    if(children && children instanceof Array) {
      children = formatRouters(children)
    }
    let cname = '';
    if(component.startsWith("Index")){
      cname = () => import('./views/Index.vue')
    }else if(component.startsWith("companyOperation")){
      cname = () => import('./views/companyOperation.vue')
    }else if(component.startsWith("PageThree")){
      cname = () => import('./views/PageThree.vue')
    }else if(component.startsWith("PageFour")){
      cname = () => import('./views/PageFour.vue')
    }else if(component.startsWith("blockOperation")){
      cname = () => import('./views/blockOperation.vue')
    }


    let fmRouter = {
      path:path,
      component:cname,
      name:name,
      redirect:redirect,
      children:children
    };
    fmRouters.push(fmRouter)
  })
  return fmRouters
}

router.beforeEach(((to, from, next) => {
  if(to.name === '登录'){
    next();
    return;
  }

  const token = window.sessionStorage.getItem("token")
  if(token === null){
    next({path:'/',query:{redirect:to.path}})
  }
  else {
    initmenu(router,store)
    next();
  }

  const organizationName = window.sessionStorage.getItem("organizationName")
  const role = window.sessionStorage.getItem("role")


  if(role !== "ROLE_ADMIN" && to.path !== '/UserOperation'){
    if(organizationName === 'null'){
      alert("请完善信息后进行操作")
      next({path:'/UserOperation'})
    }
  }
  if(to.path === '/logout'){
    window.sessionStorage.setItem('token',undefined)
    window.sessionStorage.setItem('username',undefined)
    window.sessionStorage.setItem('role',undefined)
    window.sessionStorage.setItem('organizationName',undefined)
    alert("成功退出，欢迎再次使用！")
    next({path:'/'})

  }


}))


new Vue({
  router,
  store,
  render: h => h(App),

}).$mount('#app')
