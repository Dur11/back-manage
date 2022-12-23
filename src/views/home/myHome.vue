<template>
  <el-container class="container">
    <el-header class="header">

      <div class="navBar">
                <div class="title">
                    <div class="ele-left"></div>
                    <h2>
                        <span>后台管理系统</span>
                    </h2>
                    <div class="ele-right"></div>
                </div>
                <div class="current">{{ currentDate }}</div>
                <div class="setting">
                    <el-avatar :size="40" :src="headPic" class="avatar"></el-avatar>
                    <!-- <img size="40" src="./logo2.png" class="avatar"> -->
                    <div class="info">
                        <div  class="home" @click="goHome">首页</div>
                        <div class="exit" @click="handleSignout">退出</div>
                    </div>
                </div>
            </div>
            
 
    </el-header>
   
    <el-container class="content">
      <el-aside class="aside" width="200px">
        <!-- 侧边栏导航  -->
        <!-- router开启路由模式 -->
        <el-menu
        :default-active="activePath"
          class="menu"
          background-color="#182e3d"
          text-color="#fff"
          active-text-color="#fff"
        >
          <!-- 没有子集 -->
          <el-menu-item
          @click="clickMenu(item)"
            v-for="item in nochildren"
            :index="item.path + ''"
            :key="item.path"
          >
            <i :class="'el-icon-' + item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
          <!-- 有子集，需要展开 -->
          <el-submenu
            :index="' ' + item.order"
            v-for="item in haschildren"
            :key="item.path"
          >
            <!--表示可以展开的一组 -->
            <template slot="title">
              <i class="el-icon-"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item
              class="menuItem"
              v-for="(item, index) in item.children"
              :key="index"
              :index="item.path"
              @click="clickMenu(item)"
            >
              <span>{{ item.name }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- <CommonTag></CommonTag> -->
      <el-main class="main">
        <div class="bread">
  <el-breadcrumb separator="|">
    <!-- <el-breadcrumb-item  v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item> -->
  <el-breadcrumb-item :to="{path:'/show'}">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="'/'+tags.path" v-if="tags">{{tags.name}}</el-breadcrumb-item>
  </el-breadcrumb>
 </div>      
        <transition mode="out-in">
 <router-view class="center"></router-view>
</transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import moment from "moment";
import headPic from '@/views/home/logo2.png'
import { mapState } from 'vuex'
// import CommonTag from '@/components/CommonTag.vue'
export default {
  // name: '',
  data() {

    return {
      // components:{CommonTag},
      headPic:headPic,
      currentDate: moment().format("YYYY年MM月DD日 HH:mm:ss"),
      menu: [
        // {
        //   name: '用户管理',
        //   order: '1',
        //   path: 'user',
        // },
        // {
        //   name: '角色管理',
        //   order: '1',
        //   path: 'role',
          
        // },{
        //   name: '管理',
        //   order: '1',
        //   children: [
        //     {
        //       path: 'stuednt',
        //       name: '学生管理',
        //     },
        //     {
        //       path: 'teacher',
        //       name: '教师管理',
        //     },
        //   ],
        // },
        
      ],
      transitionName: 'slide-left',
      activePath:''
    }
  },
  created() {
    // 使数据不丢失
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state));
    });
    this.getMenus()
    setInterval(() => {
      this.currentDate = moment().format("YYYY年MM月DD日 HH:mm:ss");
    }, 1000);
    // this.activePath=this.$route.path
    // console.log(111);
    // console.log(this.activePath);
  },
  methods: {
    // 获取导航数据
    getMenus() {
      this.menu=this.$store.state.menu
      // console.log(1111);
      // console.log(this.menu);
    },
    handleSignout() {
      // 提示
      this.$message.success('退出成功')
      // 来到login组件
      this.$router.push({ name: 'login' })
    },
    goHome(){
      this.$router.push('/home')
    },
    clickMenu(item) {
            this.$router.push({
                name: item.name,
            });
            // console.log(item);
            this.activePath=item.path
            // console.log('/'+this.activePath);
            // 调用selectMenu 并传入item
            this.$store.commit('selectMenu',item)

        },
  },
  // watch: {
  //   '$route.path': function (newVal) {
  //     // 为了防止和原有的高亮更新操作冲突，这里只更新自己需要的路由

  //     if (newVal === '/show') {
  //       // 为 :default-active 绑定的值 activepath 重新赋值，从而实现菜单栏的高亮更新
  //       this.activePath = newVal
  //       console.log(this.activePath);
  //     }
  //   }
  // },
  computed: {
    nochildren() {
      console.log(this.menu);
      return this.menu.filter((item) =>!item.children
      )
    },
    haschildren() {
      return this.menu.filter((item) => item.children)
    },
    ...mapState({
      tags:state=>state.currentMenu
      
    }),
  
    // onRoutes() {
    //   const route = this.$route
    //   const { meta, path } = route
    //   // 可以在路由配置文件中设置自定义的路由路径到meta.activeMenu属性中，来控制菜单自定义高亮显示
    //   // meta中 有activeMenu 字段的页面，都会显示高亮
    //   console.log(meta)
    //   if (meta.activeMenu) {
    //     return meta.activeMenu
    //   }
    //   return path
    // }
    // activePath(){
    //   // console.log(this.$route.path);
    //   return this.$route.path.replace('/','')
    // }
    }
}
</script>

<style scoped>
.contentr{

}
 .el-menu .el-menu-item:hover{
    outline: 0 !important;
    color: #2E95FB !important;
    background: #303F53!important;
}
.el-menu .el-menu-item.is-active {
    color: #fff !important;
    background:  #2E95FB !important
}
.el-submenu .el-submenu__title:hover {
  color: #2E95FB !important;
  background: linear-gradient(270deg, #F2F7FC 0%, #FEFEFE 100%)!important;
}

.header {
    position: relative;
    background-color: #E9EEF3;
    padding: 0 20px 0 0;
}
.navBar {
    background-color: #303F53;
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: relative;
    min-width: 980px;
}
.bread{
  display: flex;
  align-items: center;
  padding: 0 5px;
height: 30px;
background-color: #fff;
}
.title {
    color: #ddf4fe;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #1B2939;
    padding: 5px 50px;
    height: 50px;
}
.ele-left {
    width: 0px;
    height: 0px;
    border-top: 23px solid transparent;
    border-left: 23px solid transparent;
    border-right: 23px solid transparent;
    border-bottom: 23px solid #ebebeb;
    position: absolute;
    left: -23px;
    bottom: -3px;
}

.ele-right {
    width: 0px;
    height: 0px;
    border-top: 23px solid transparent;
    border-left: 23px solid transparent;
    border-right: 23px solid transparent;
    border-bottom: 23px solid #ebebeb;
    position: absolute;
    right: -23px;
    bottom: -3px;
}

.title h2 {
    margin: 0;
}
img {
    width: 100%;
    height: 100%;
    display: block;
}
.current {
    /* 这是时钟的样式 */
    color: #ddf4fe;
    margin-left: 10%;
    display: inline-block;
}

.setting{
    text-align: center;
}
.setting:hover .info{
  display: block;
}
.setting:hover .avatar {
        transform: scale(1.5);
        cursor: pointer;
        z-index: 2000;
      }
.avatar {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 50px;
}

.info {
    width: 100px;
    /* background-image: linear-gradient(top, #091f18, #242e28); */
    background-color: #1B2939;
    opacity: 0.8;
    position: absolute;
    z-index: 1000;
    top: 95%;
    right: 20px;
    box-sizing: border-box;
    padding-top: 20px;
    border-radius: 10px;
    font-size: 14px;
    line-height: 50px;
    display: none;
    color: white;
}
.info:hover{
  cursor: pointer;
}
.exit{
    border-radius: 0 0 10px 10px;
}
.home:hover{
  background-color: rgba(245, 240, 240, 0.2);
}
.exit:hover{
  background-color: rgba(245, 240, 240, 0.2);
}
.main {
  background-color: #e9eef3;
  /* padding:0 20px 100px 20px; */
  /* margin-top: 50px; */
  padding: 0 20px;
}
.aside {
  background-color: #1B2939;
}
/* .transitionRouter-enter-active,
.transitionRouter-leave-active {
    transition: all 0.4s;
}

.transitionRouter-enter,
.transitionRouter-leave{
    transform: translate3d(100%, 0, 0);
} */
.v-enter{
 opacity: 0;
}
.v-enter-active{
 transition: 0.3s;
}
.v-enter-to{
 opacity: 1;
}
.v-leave{
 opacity: 1;
}
.v-leave-to{
 opacity:0;
}
.v-leave-active{
 transition: 0.3s;
}
</style>
