<template>
  <div class="mains">
    <div class="banner">
      <div class="title">主要模块</div>
      <!-- <el-divider></el-divider> -->
      <div class="mukSum">
        <!-- <div class="title">主要模块</div> -->
        <div class="muk" style="background-color:#0099CC" @click="Jump">
          <i class="el-icon-s-home" style="color: #fff; font-size: 30px"></i>
          <span style="font-size: 20px; color: #fff">首页</span>
        </div>
        <div class="muk" style="background-color: #336699" @click="Jump2">
          <i
            class="el-icon-user-solid"
            style="color: #fff; font-size: 30px"
          ></i>
          <span style="font-size: 20px; color: #fff">用户管理</span>
        </div>
        <div class="muk" style="background-color: #ff6666" @click="Jump3">
          <i class="el-icon-s-custom" style="color: #fff; font-size: 30px"></i>
          <span style="font-size: 20px; color: #fff">角色管理</span>
        </div>
        <div class="muk" style="background-color: #66cccc" @click="Jump4">
          <i class="el-icon-s-tools" style="color: #fff; font-size: 30px"></i>
          <span style="font-size: 20px; color: #fff">用户权限管理</span>
        </div>
        <div class="muk" style="background-color: #ff9933" @click="Jump5">
          <i class="el-icon-setting" style="color: #fff; font-size: 30px"></i>
          <span style="font-size: 20px; color: #fff">权限管理</span>
        </div>
      </div>
    </div>
   <div class="dataman">
    <div class="title">主要数据</div>
    <div class="dataSum">
      
      <div class="user" style="border:1px solid #0099CC">
        <div class="luser" style="background-color:#0099CC">
          <i class="el-icon-user-solid" style="font-size: 45px; color: #fff"></i>
        </div>
        <div class="ruser">
          <div>User</div>
          <div style="color:#0099CC; font-size: 30px;">{{ userall }}</div>
        </div>
      </div>
      <div class="user" style="border:1px solid #66CCCC">
        <div class="luser" style="background-color:#66CCCC">
          <i class="el-icon-s-custom" style="font-size: 45px; color: #fff"></i>
        </div>
        <div class="ruser">
          <div>Role</div>
          <div style="color:#66CCCC; font-size: 30px;">{{ roleall }}</div>
        </div>
      </div>
      <div class="user" style="border:1px solid #9999FF">
        <div class="luser" style="background-color:#9999FF">
          <i class="el-icon-s-tools" style="font-size: 45px; color: #fff"></i>
        </div>
        <div class="ruser">
          <div>permission</div>
          <div style="color:#9999FF; font-size: 30px;">{{ powall}}</div>
        </div>
      </div>
    </div>
   </div>
    <!-- <div class="titles">用户占比分布图</div> -->
   <div class="chartdata">
    <div class="title">用户占比分布图</div>
    <div class="chart">
          <div class="graph">
            <el-card style="width: 500px; height: 280px">
              <!-- <div class="tit">角色占比</div> -->
              <div style="height: 280px" id="chartPie"></div>
            </el-card>
          </div>
          <div class="graph">
            <el-card style="width: 500px; height: 280px">
              <div style="height: 280px" id="idRatio"></div>
            </el-card>
          </div>
    </div>
   </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      data: {},
      userall:'',
      roleall:'',
      powall:'',
      form:{
        s_id:"0",
      },
    }
  },
  created(){
    this.getList()
    this.getRole()
    this.getPow()
  },
  mounted() {
    //先调用这个方法赋值
    this.initData()
    //先调用这个方法赋值
    this.initDatasex()
    // this.drawCharts()
    this.drawPieChart()
    // this.drawChart()

    this.drawPieChartsex()
  },
  methods: {
    getList(){
      this.api.post('/userPage').then((res)=>{
        this.userall=res.records.length
      })
    },
    getRole(){
      this.api.post('/roleList',this.form).then((res)=>{
        this.roleall=res.length
      })
    },
    getPow(){
      this.api.post('/resourceList').then((res)=>{
        this.powall=res.data.length
      })
    },
    Jump() {
      this.$router.push('/show')
    },
    Jump2() {
      this.$router.push('/user')
    },
    Jump3() {
      this.$router.push('/role')
    },
    Jump4() {
      this.$router.push('/permission')
    },
    Jump5() {
      this.$router.push('/power')
    },
    drawPieChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chartPie = echarts.init(document.getElementById('chartPie'))
      this.chartPie.setOption({
        //设置标题,副标题,以及标题位置居中
        title: {
          text: '角色占比',
          //subtext: '纯属虚构',
          x: 'center',
        },
        //具体点击某一项触发的样式内容
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        color: ['#9999FF', '#66CCCC', '#0099CC'],
        //左上侧分类条形符
        // legend: {
        // orient: 'vertical',
        // left: 'left',
        // //通过跨域获取数据给data赋值
        // data: []
        // },
        //饼状图类型以及数据源
        series: [
          {
            name: '统计数量',
            type: 'pie',
            //radius: '70%',
            //center: ['50%', '60%'],
            //通过跨域获取数据给data赋值
            data: [],
            //设置饼状图扇形区域的样式
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      })
    },
    initData() {
      this.api.post('/countUserGroupBySId').then((res) => {
        this.chartPie.setOption({
          series: [
            {
              data: res,
            },
          ],
        })
      })
    },
    drawPieChartsex() {
      // 基于准备好的dom，初始化echarts实例
      this.chartSex = echarts.init(document.getElementById('idRatio'))
      this.chartSex.setOption({
        //设置标题,副标题,以及标题位置居中
        title: {
          text: '性别占比',
          //subtext: '纯属虚构',
          x: 'center',
        },
        //具体点击某一项触发的样式内容
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        color: ['#9999FF', '#0099CC'],
        //左上侧分类条形符
        // legend: {
        // 	orient: 'vertical',
        // 	left: 'left',
        // 	//通过跨域获取数据给data赋值
        // 	data: []
        // },
        //饼状图类型以及数据源
        series: [
          {
            name: '统计数量',
            type: 'pie',
            //radius: '70%',
            //center: ['50%', '60%'],
            //通过跨域获取数据给data赋值
            data: [],
            //设置饼状图扇形区域的样式
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      })
    },
    initDatasex() {
      this.api.post('/countGroupByUSex').then((res) => {
        this.chartSex.setOption({
          series: [
            {
              data: res,
            },
          ],
        })
      })
    },
    // drawCharts() {
    //   this.drawPieChart()
    // },
    // goHome(){
    //   this.$router.push('/home')
    // },
    // goUser(){
    //   this.$router.push('/user')
    // },
    // goRole(){
    //   this.$router.push('/role')
    // }
  },
}
</script>

<style scoped>
.mains {
  margin-top: 5px;
  /* background-color: white; */
  height: 680px;
}
.title {
  /* background-color: rgb(128, 32, 32); */
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  padding-left: 20px;
  background: #fff;
  border-bottom: 1px solid#ebebeb;
  padding: 5px;
}
.titles {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin-top: 80px;
  padding-left: 20px;
}
/* .primary{
 
  margin-top: 20px;
} */
.mukSum {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px 0PX;
  background-color: #fff;
}
.muk {
  display: flex;
  width: 155px;
  height: 50px;
  background-color: #338fcc;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  /* padding-left: 50px; */
}
.muk:hover {
  transform: scale(1.2);
}
/* .muk:active{
  transform:scale(1.2);
} */
.chartdata{
  margin-top: 10px;
}
.chart {
  display: flex;
  justify-content: space-around;
  padding: 20px 20px;
  background-color: #fff;
}
.tit {
  display: flex;
  align-items: center;
  border: #338fcc;
}
.dataman{
  margin-top: 10px;
}
.dataSum{
  display: flex;
  height: 100px;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;

  padding: 20px 50PX;
}
.user{
  display: flex;
  width: 300px;
  height: 100px;
  /* background-color: rebeccapurple */
}
.luser{
width: 50px;
height: 50px;
background-color: #1c97f5;
padding: 25px;
}
.ruser{
  width: 180px;
height: 90px;
background-color: #fff;
padding: 5px 0 0 70px;
}
</style>
