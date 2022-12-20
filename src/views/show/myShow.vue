<template>
  <div class="mains">
    <div class="banner">
      <!-- <div class="title">主要模块</div> -->

            <div class="mukSum"  >
              <!-- <div class="title">主要模块</div> -->
            <div class="muk" style="background-color:#333333">
              <i
                class="el-icon-s-home"
                style="color: #fff; font-size: 30px"
              ></i>
              <span style="font-size: 20px;color: #fff;">首页</span>
            </div>
            <div class="muk" style="background-color:#336699" >
              <i
                class="el-icon-user-solid"
                style="color: #fff; font-size: 30px"
              ></i>
              <span style="font-size: 20px;color: #fff;">用户管理</span>
            </div>
            <div class="muk" style="background-color:#FF6666" >
              <i
                class="el-icon-s-check"
                style="color: #fff; font-size: 30px"
              ></i>
              <span style="font-size: 20px;color: #fff;">角色管理</span>
            </div>
            <div class="muk" style="background-color:#66CCCC" >
              <i
                class="el-icon-s-check"
                style="color: #fff; font-size: 30px"
              ></i>
              <span style="font-size: 20px;color: #fff;">用户权限管理</span>
            </div>
            <div class="muk" style="background-color:#FF9933" >
              <i
                class="el-icon-s-check"
                style="color: #fff; font-size: 30px"
              ></i>
              <span style="font-size: 20px;color: #fff;">权限管理</span>
            </div>
            </div>
      
    </div>
    <div class="titles">用户占比分布图</div>
    <div class="chart">
      
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="graph">
          <el-card style="width:400px;height: 300px">
            <div style="height: 260px" id="chartPie"></div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="graph">
          <el-card style="width:400px;height: 300px">
            <div style="height: 260px" id="idRatio"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
        data:{
           
        }
    }
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
    Jump(){
        this.$router.push('/show')
    },
    Jump2(){
        this.$router.push('/user')
    },
    Jump3(){
        this.$router.push('/role')
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
        color:['#9999FF','#66CCCC','#0099CC'],
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
        console.log(res);
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
        color:['#9999FF','#66CCCC',],
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
        console.log(res);
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
  margin-top: 15px;
  background-color: white;
  height: 680px;
}
.title {
  /* background-color: rgb(128, 32, 32); */
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  padding-left: 20px;
}
.titles{
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin-top: 80px;
  padding-left: 20px;
}
/* .primary{
 
  margin-top: 20px;
} */
.mukSum{
  display: flex;
  justify-content:space-around;
  align-items:center ;
  padding: 20px 0 0 0;
}
.muk {
  display: flex;
  width: 150px;
  height: 50px;
  background-color: #338fcc;
  align-items: center;
  justify-content: center;
  border-radius:10px
  /* padding-left: 50px; */
}
.chart{
  margin-top: 50px;
  padding: 0 80px;
}
</style>
