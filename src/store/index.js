import Vue from 'vue'
import Vuex from 'vuex'
// import Cookies from 'js-cookie'

Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    tabList: [{
      name: '首页',
              order: '1',
              path: 'show',
              icon:'s-home',
  }],
  // 设置一个变量，存储点击的tab
  currentMenu: null,
    menu:[],
    token:'',
    // data:[]
  },
  mutations:{
    // 获得menu的逻辑
    setMenu(state, data) {
      // vuex添加
      state.menu = data  
// sessionStorage.setItem('menu', JSON.stringify(data));
  },
  // setData(state,data){
  //   state.data=data
  // },
  setToken(state,data){
    state.token=data
  },
  selectMenu(state, val) {
    if (val.name != '首页') {
        state.currentMenu = val
        const result = state.tabList.findIndex(item => item.name === val.name)
        if (result == -1) {
            state.tabList.push(val)
        } else {
            state.currentMenu = null
        }
    }
},
//   getMenu(state){
//     const menu =sessionStorage.get('menu')
//     state.menu = menu
//   }
  }
})