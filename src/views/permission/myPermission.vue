<template>
  <div class="mainper">
      <div class="qxhead">
        用户权限列表
      </div>     
      <CommonTable
        :tableData="tableData"
        :tableLabel="tableLabel"
        :query="query"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @sortChange="sortChange"
        @look="lookUser"
        @del="delUser"
        @set="setPre"
        ref="multipleTable"
      ></CommonTable>
      <!-- 查看 -->
      <el-dialog :visible.sync="isOpen" width="30%" title="用户权限" class="dadd">
      <el-card class="card">
        <el-form>
        <el-form-item label="包含的权限有:">
          <el-tag v-for="(item,index) in this.preData" :key="index">{{item}}</el-tag>
    </el-form-item>
      </el-form>
      </el-card>
      <div slot="footer">
        <el-button @click="isOpen = false">关闭</el-button>
        
      </div>
    </el-dialog>
    <el-dialog :visible.sync="isAdd" width="30%" title="新增用户权限" class="dadd">
     <el-card class="card">
      <el-form>
        <el-form-item label="限权" >
          <el-select
            v-model="value"
            placeholder="限权"
            @change="inReid"
            style="width: 150px"
            @click.native="inSee"
          >
          <el-option v-for="(item,index) in this.xdata" :key="index" :label="item.re_name" :value="item.re_id"></el-option>         
          </el-select>         
  </el-form-item>
      </el-form>
      <!-- <el-radio-group v-model="radioValue">
    <el-radio v-for="(item,index) in this.xdata" :key="index" :label="item.re_name">
        {{item.re_name}}
    </el-radio>
</el-radio-group> -->

     </el-card>
      <div slot="footer">
        <el-button @click="isAdd = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog :visible.sync="isdel" width="30%" title="删除用户权限" class="dadd">
      <el-card class="card">
        <el-form>
        <el-form-item label="限权" >
          <el-select
            v-model="value"
            placeholder="限权"
            @change="inReid"
            style="width: 150px"
            @click.native="noSee"
          >
          <el-option v-for="(item,index) in this.ydata" :key="index" :label="item.re_name" :value="item.re_id"></el-option>

          </el-select>
  </el-form-item>
      </el-form>
      </el-card>
      <div slot="footer">
        <el-button @click="isdel = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
 </div>
</template>

<script>
import CommonTable from '@/components/CommonTablet.vue'
export default{
  components:{CommonTable},
  data(){
    return{
      radioValue:'',
      isOpen:false,
      // isOpenn:false,
      isAdd:false,
      isdel:false,
      // table表格的数据
      tableData: [],
      // // table中列的配置数据
      tableLabel: [
        {
          prop: 'u_name',
          label: '姓名',
        },
        {
          prop: 'u_sex',
          label: '性别',
        },
        {
          prop: 's_id',
          label: '身份',
        },
      ],
      form:{
        u_id:"0",
      },
      query: {
        //分页对象
        pageNum: 1,
        pageSize: 8,
        total: 0,
      },
      table:[],
      preData:[],
      value:[],
      value2:[],
      xquan:{
        u_id:'',
        re_id:''
      },
      nxquan:{
        u_id:'',
        re_id:''
      },
      xdata:[],
      ydata:[]
    }
  },
  // 页面一加载就得调用
  created() {
    this.getList()
  },
  methods:{
    inSee(){
      // console.log(this.xquan.u_id);
      this.api.post('/user_resource/queryNONResourceByUId',this.xquan).then((res)=>{
        // console.log(111);
        this.xdata=[]
        res.data.forEach(item=>{
          this.xdata.push(item)
        })
      })
      console.log(this.xdata);
    },
    noSee(){
      // console.log(this.xquan);
      this.api.post('/user_resource/queryResourceByUId',this.xquan).then((res)=>{
        this.ydata=[]
        res.data.forEach(item=>{
          this.ydata.push(item)
        })
        console.log(this.ydata);
      })
    },
    inReid(val){
      this.xquan.re_id=val
      console.log(this.xquan.re_id);
    },
    // seePow(row){

    // },
    lookUser(row){
      
      const id=row.u_id
      this.api.post('/user_resource/queryResourceByUId', { u_id: id }).then((res) => {
          // $message、$confirm 为ElementUI弹出框的相关属性
          // console.log(res.msg);
          this.preData=[]
          if(res.msg=='成功'){
            this.isOpen=true
            res.data.forEach(item=>this.preData.push(item.re_name))
            console.log(this.preData);
        }else{
          // this.isOpen=false
          // this.isOpenn=true
          this.$message({
            type: 'warning',
            message: '该用户暂无权限',
          })
        }
        // console.log(this.preData)
          })
    },
    delUser(row){
      this.operateType = 'del'
      // this.isdel=true
      this.xquan.u_id=row.u_id
      this.api.post('/user_resource/queryResourceByUId',this.xquan).then((res)=>{
        if(!res.data){
    this.$message({
            type: 'warning',
            message: '该用户暂无权限',
          })
  }else{
    this.isdel=true
  }
      })
    },
    setPre(row){
      this.operateType = 'set'
      this.isAdd=true
      this.xquan.u_id=row.u_id
     
    },
    confirm() {   
        if(this.operateType=='set'){
          this.api.post('/user_resource/addUserResource',this.xquan).then(()=>{
        this.isAdd = false //关闭弹窗
        this.$message({
            type: 'success',
            message: '添加成功',
          })
      })
        }else if(this.operateType=='del'){
          this.api.post('/user_resource/delUserResource',this.xquan).then(()=>{
            this.isdel=false
        this.$message({
            type: 'success',
            message: '删除成功',
          })
      })
        }
        
    },
    getList(){
      this.tableData=[]
        this.api.post('/user_resource/queryUserResource').then((res) => {
        res.forEach(item => {
          
          this.tableData.push(item.user)
         
        })
       
        this.tableData.forEach((item) => {
          // console.log(item);
          if (item.s_id == 2) {
            item.s_id = '学生'
          } else if(item.s_id == 3){
            item.s_id = '教师'
          }else{
            item.s_id = '管理员'
          }
        })
        //数据的总条数
        this.query.total = this.tableData.length  
    
    },
   
    )},
    //切换当前页显示的数据条数，执行方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.query.pageSize = val
    },
    //切换页数，执行方法
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.query.pageNum = val
  },
  sortChange(val){
    if(val.order==='ascending'){
        this.tableData=this.tableData.sort((a,b)=>{
          // console.log(a.u_id,b.u_id);
            return a.u_id-b.u_id
        })
      }else if(val.order==='descending'){
        this.tableData=this.tableData.sort((a,b)=>{          
            return b.u_id-a.u_id
        })
      }
  },
  }
}
</script>
<style>
.mainper{
margin-top: 5px;
}
.qxhead{
  height: 20px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  /* margin-bottom: 20px; */
  /* margin-top: 5px; */
  padding:15px 20px;
  border-bottom:1px solid #e9eef3;
}
/* .sea {
position: absolute;
width: 317px;
right: 0;

}
.opt{
float: left;
}
.sea button{
    float: right;
}
.sea .inp{
    margin: 0 -12px;
} */
</style>