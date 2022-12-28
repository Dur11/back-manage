<template>
  <div class="mainpow">
    <!-- <div class="head"> -->
        <!-- <span>用户管理</span> -->
        <!-- <div class="lheadp"> -->
          <el-tabs v-model="activeName">
    <el-tab-pane label="权限列表" name="first">
      <div class="powlist">
        <div class="lpow">权限列表</div>
        <div class="rpow">
          <el-button class="plus" type="primary" @click="addPow"  size="small" icon="el-icon-plus"
          >新增</el-button>
        </div>
      </div>
      <CommonTable
        :tableData="tableData"
        :tableLabel="tableLabel"
        :query="query"
        :isOperate='true'
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @sortChange="sortChange"
      >
      <template slot-scope="data">
          <el-button size="mini" @click="editUser(data.row)" icon="el-icon-edit">编辑</el-button> 
          <!-- <el-button size="mini" type="danger" @click="delPow(data.row)" icon="el-icon-delete">删除</el-button> -->
          <span class="delbtn">
                  <el-popconfirm
              title="确认删除这行数据吗？"
              placement="top"
              @confirm="deleteTestCase(data.row)"
            >
              <el-button
              size="mini"
                 type="danger"
                class="delete-btn"
                icon="el-icon-delete"
                slot="reference"
                >删除</el-button
              >
            </el-popconfirm>

          </span>
        </template>
    </CommonTable>
    </el-tab-pane>
    <el-tab-pane label="分配权限列表" name="second">
      <div class="pow">角色权限列表</div>
      <PowTable
        :tableData="tablePow"
        :tableLabel="powLabel"
        :query="pquery"
        @handleSizeChangep="handleSizeChangep"
        @handleCurrentChangep="handleCurrentChangep"
        @del="shareDel"
        @edit="shareAdd"
        @set="shareSee"
        @sortChanges="sortChanges"
      ></PowTable>
    </el-tab-pane>
  </el-tabs>
  
       <!-- 添加限权 -->
    <el-dialog :visible.sync="isAdd" width="30%" title="新增权限" class="dadd">
      <el-card class="card">
        <el-form>
        <el-form-item label="限权" >
          <el-input v-model="add.re_name" style="width:200px" placeholder="请输入权限名，如：权限2"></el-input>
  </el-form-item>
      </el-form>
      </el-card>
      <div slot="footer">
        <el-button @click="isAdd = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑限权 -->
    <el-dialog :visible.sync="isEdit" width="30%" title="修改权限" class="dadd">
      <el-card class="card">
        <el-form>
  
  <el-form-item label="限权" >
    <el-input v-model="edit.re_name" style="width:200px"></el-input>
</el-form-item>
</el-form>
      </el-card>
      <div slot="footer">
        <el-button @click="isEdit = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配权限-查看 -->
    <el-dialog :visible.sync="isOpen" width="30%" title="角色权限" class="dadd">
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
    <!-- 分配权限-增加 -->
     <el-dialog :visible.sync="ispowAdd" width="30%" title="添加权限" class="dadd">
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
      </el-card>
      <div slot="footer">
        <el-button @click="ispowAdd = false">取 消</el-button>
        <el-button type="primary" @click="confirmPow">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配权限-删除 -->
    <el-dialog :visible.sync="ispowDel" width="30%" title="删除权限" class="dadd">
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
        <el-button @click="ispowDel = false">取 消</el-button>
        <el-button type="primary" @click="confirmPow">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import CommonTable from '@/components/CommonTablep.vue'
import PowTable from '@/components/PowTable.vue'
export default{
  components:{CommonTable,PowTable},
  data(){
    return{
       // table表格的数据
       tableData: [],
      // // table中列的配置数据
      tableLabel: [
        {
          prop: 're_name',
          label: '权限',
        },
      ],
      tablePow:[],
      powLabel:[
        {
          prop: 'r_name',
          label: '角色',
        },
      ],
      powdata:'',
      query: {
        //分页对象
        pageNum: 1,
        pageSize: 8,
        total: 0,
      },
      pquery: {
        //分页对象
        pageNum: 1,
        pageSize: 8,
        total: 0,
      },
      table:[],
      tablep:[],
      isAdd:false,
      isEdit:false,
      isShare:false,
      isOpen:false,
      ispowAdd:false,
      ispowDel:false,
      powAdd:[],
        // 增加
        add: {
        re_name:''
      },
      edit:{
        re_id:'',
        re_name:''
      },
      form:{
        s_id:"0",
      },
      sharepow:{
        r_id:'',
        s_id:"0",
      },
      role:[],
      sharedata:[],
      shareid:{
        r_id:''
      },
      preData:[],
      xdata:[],
      ydata:[],
      value:[],
      xquan:{
        r_id:'',
        re_id:''
      },
      addpow:{
        r_id:'',
        re_id:''
      },
      activeName: 'first'
    }
  },
  created(){
    this.getList()
    this.getRole()
   
  },
  methods:{
    inSee(){
      // console.log(this.xquan.u_id);
      // this.xquan.r_id
      this.api.post('/role_resource/queryNONResourceByRId',this.xquan).then((res)=>{
        // console.log(res);
        this.xdata=[]
        res.data.forEach(item=>{
          this.xdata.push(item)
        })
        console.log(this.xdata);
      })
    },
    noSee(){
      this.api.post('/role_resource/queryResourceByRId',this.xquan).then((res)=>{
        this.ydata=[]
        res.data.forEach(item=>{
          this.ydata.push(item)
        })
        console.log(this.ydata);
      })
    },
    inReid(val){
      // this.xquan.r_id=val
      this.xquan.re_id=val

      console.log(this.xquan.re_id);
    },
    getList(){
      this.tableData=[]
      this.api.post('/resourceList').then((res)=>{
        res.data.forEach(item => {
          
          this.tableData.push(item)
          
        })

        //数据的总条数
        this.query.total = this.tableData.length  
        
      })
    },
    getRole(){
      this.tablePow =[]
      this.api.post('/roleList',this.form).then((res)=>{
        res.forEach(item => {
          this.tablePow .push(item)
        })
        
        //数据的总条数
        this.pquery.total = this.tablePow .length  
       
      })
    },
    addPow(){
      this.operateType = 'add'
      this.isAdd=true
      // console.log(this.add.re_name);
    },
    editUser(row) {
      this.operateType = 'edit'
      this.isEdit = true
      console.log(row);
      this.edit=row
      },
    
   
    deleteTestCase(row){
      const id = row.re_id
        this.api.post('/delResource', { re_id: id }).then(() => {
          // $message、$confirm 为ElementUI弹出框的相关属性
          this.$message({
            type: 'success',
            message: '删除成功',
          })
          this.getList()
        })
    },
    confirm() {
      if (this.operateType == 'add') {
        this.api.post('/addResource', this.add).then((res) => {
         
          if(res.code==200){
            this.isAdd = false //关闭弹窗
            this.$message({
            type: 'success',
            message: '添加成功',
          })
          }else{
            this.$message({
            type: 'warning',
            message: '该权限名称已存在',
          })
          }
          this.getList()
         
        })
        // getList()
      } else {
        this.api.post('/updateResourceById', this.edit).then((res) => {
         
          console.log(res.code);
          if(res.code==200){
            this.isEdit= false //关闭弹窗
            this.$message({
            type: 'success',
            message: '编辑成功',
          })
          }else{
            this.$message({
            type: 'warning',
            message: '该权限名称已存在',
          })
          }
          this.getList()
        })
      }
  },
  // 分配权限
  sharePow(){
    this.getRole()
    this.isShare=true
  },
  // 查看
  shareSee(row){
    // console.log(row.r_id);
    this.shareid.r_id=row.r_id
    this.api.post('/role_resource/queryResourceByRId',this.shareid).then((res)=>{
      // this.isOpen=true
      // console.log(res);
      this.preData=[]
          if(res.msg=='成功'){
            this.isOpen=true
            res.data.forEach(item=>this.preData.push(item.re_name))
        }else{
          // this.isOpen=false
          // this.isOpen=true
          this.isOpen = false //关闭弹窗
        this.$message({
            type: 'warning',
            message: '该用户暂无权限',
          })
        }
    })
  },
//  增加
shareAdd(row){
  this.powType='add'
  this.ispowAdd=true
this.xquan.r_id=row.r_id

},
// 删除
shareDel(row){
  this.powType='del'
  
this.xquan.r_id=row.r_id
this.api.post('/role_resource/queryResourceByRId',this.xquan).then((res)=>{
  // console.log(res.data);
  if(!res.data){
    this.$message({
            type: 'warning',
            message: '该用户暂无权限',
          })
  }else{
    this.ispowDel=true
  }

})
},
confirmPow(){
  if (this.powType == 'add') {
        this.api.post('/role_resource/addRoleResource', this.xquan).then(() => {
          this.ispowAdd = false //关闭弹窗
          this.$message({
            type: 'success',
            message: '添加成功',
          })
         
        })
      } else if(this.powType == 'del'){
        this.api.post('/role_resource/delRoleResource', this.xquan).then(() => {
          this.ispowDel = false //关闭弹窗
          this.$message({
            type: 'success',
            message: '删除成功',
          })
         
        })
      }
},
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
    //切换当前页显示的数据条数，执行方法
  handleSizeChangep(val) {
      console.log(`每页 ${val} 条`)
      this.pquery.pageSize = val
    },
    //切换页数，执行方法
    handleCurrentChangep(val) {
      console.log(`当前页: ${val}`)
      this.pquery.pageNum = val
  },
  sortChange(val){
    if(val.order==='ascending'){
        this.tableData=this.tableData.sort((a,b)=>{
            return a.re_id-b.re_id
        })
      }else if(val.order==='descending'){
        this.tableData=this.tableData.sort((a,b)=>{          
            return b.re_id-a.re_id
        })
      }
  },
  sortChanges(val){
    if(val.order==='ascending'){
          this.tablePow=this.tablePow.sort((a,b)=>{
            return a.r_id-b.r_id
        })
      }else if(val.order==='descending'){
        this.tablePow=this.tablePow.sort((a,b)=>{          
            return b.r_id-a.r_id
        })
      }
  },
}
}
</script>
<style>
.mainpow{
  margin-top: 5px;
}
/* .head{
  padding: 5px 10px;
  border-bottom: 1px solid #e9eef3;
}
.lheadp{
  padding: 10px 10px;
} */
.plus{
  position: absolute;
  top: 8px;
  right: 10px;
}
.el-tabs__nav-scroll{
  background-color: #fff;
  height: 50px;
  padding: 0 20px;
}
.powlist{
  position:relative;
  background-color: #fff;
  height: 30px;
  padding: 10px 20px;
}
.pow{
  background-color: #fff;
  height: 30px;
  padding: 10px 20px;
}
</style>