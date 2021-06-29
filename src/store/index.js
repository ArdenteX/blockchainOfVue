import Vue from 'vue'
import Vuex from 'vuex'
import router from "@/router";
import store from "element-ui/packages/cascader-panel/src/store";
import axios from "axios";


Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    routes:[]
  },
  mutations: {
    initMenu(state,menus){
      state.routes = menus
    },
    logout(){
      this.state.routes = []
      window.sessionStorage.clear()
    }
  },
  actions: {

  },
  modules: {
  },

})










