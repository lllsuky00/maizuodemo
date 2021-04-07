import Vue from 'vue'
import Vuex from 'vuex'
import TabbarModule from './module/TabbarModule'
import CityModule from './module/CityModule'
import CinemaModule from './module/CinemaModule'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
      
  },

  //集中式修改状态   //会被监控到
  mutations: {
    
    
  },
  //异步
  actions: {
    
  },
  modules: {
    TabbarModule,
    CityModule,
    CinemaModule,
  }
})

//store 只是存在内存中.目的是为了防止数据不更新
//可以配置 store持久化
