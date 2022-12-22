import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/myLogin.vue'
import Home from '@/views/home/myHome.vue'
import User from '@/views/user/myUser.vue'
import Role from '@/views/role/myRole.vue'
import Show from '@/views/show/myShow.vue'
import Permission from '@/views/permission/myPermission.vue'
import Power from '@/views/power/myPower.vue'
// import Student from '@/views/role/iStudent'
// import Teacher from '@/views/role/iTeacher'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/',
      component: Login,
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      redirect: '/show',
      children: [
        {
          name: '首页',
          path: '/show',
          component: Show,
          meta:{index:1}
        },
        {
          name: '用户管理',
          path: '/user',
          component: User,
          meta:{index:2}
        },
        {
          name: '角色管理',
          path: '/role',
          component: Role,
          meta:{index:3}
        },{
          name: '用户权限管理',
          path: '/permission',
          component: Permission,
          meta:{index:4}
        },{
          name: '权限管理',
          path: '/power',
          component: Power,
          meta:{index:5}
        },
        // {
        //   name: '管理',
        //   children:[
        //     {
        //       name: '用户管理',
        //       path: '/man',
        //     },
        //     {
        //       name: '角色管理',
        //       path: '/woman',
        //     },
        //   ],
        // },
      ],
    }
  ],
})
export default router
