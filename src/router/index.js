import Vue from 'vue'
import VueRouter from 'vue-router'
import Film from '../views/Film.vue'
import Cinema from '../views/Cinema.vue'
import Center from '../views/Center.vue'
import Detail from '../views/Detail.vue'
import Search from '../views/Search.vue'

import comingsoon from '../views/films/Comingsoon.vue'
import nowplaying from '../views/films/Nowplaying.vue'
import City from '../views/films/City.vue'


Vue.use(VueRouter)

const routes = [
  {
    path:'/film',
    component : Film,
    //嵌套路由
    children: [
      {
        path: 'nowplaying',
        component: nowplaying
      },{
        path: 'comingsoon',
        component: comingsoon
      },
      //重定向
      {
        path: '',
        redirect: '/film/nowplaying'
      }
    ]
  },
  {
    path:'/center',
    component : Center
  },
  {
    path:'/cinema',
    component : Cinema
  },
  {
    path:'/cinema/search',
    component : Search
  },
  {
    path:'/city',
    component: City
  },
  // {
  //   path: '/detail/:myid', //动态路由
  //   component: Detail,
  //   name: 'kerwinDetail'
  // },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/login',
    component: ()=>import('../views/Login.vue') //路由的懒加载
  },

  // 路由的重定向
  {
    path: '*', //通配符,优先级最低  如果以上路径都没有,则跳转(重定向)到这个路径
    redirect: '/film'
  }
]

const router = new VueRouter({
  //默认情况下走哈希属性
  mode: 'history',
  routes
})
//hash模式 路径带有#号
//location.hash切换,window.onpopstate监听路径的切换

//history模式 路径不带#号
//history.pushState切换,window.onpopstate监听路径的切换
//****如果url匹配不到任何静态资源,则应该要求后端返回同一个index.html页面,这个页面就是你app依赖的页面

//路由守卫
// router.beforeEach((to,from,next) => {

//   //to去哪 , from哪来的 , next是否放行
//   // next()    //放行

  
//   let auth = ['/center','/order','money']   //auth:身份验证
//   //如果路径为center,则验证token.  否则放行
//   if (auth.includes(to.fullPath)) {
    
//     // console.log('验证token');如果
//     if (!localStorage.getItem('token')) {
//       next(`/login`)
//     }else{
//       next()
//     }
//   }else{
//     next()
//   }
// })


export default router
