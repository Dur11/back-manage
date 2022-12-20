<template>
  <div class="mainpow">
    <div class="head">
        <!-- <span>用户管理</span> -->
        <div class="lheadp">权限列表</div>
        <div class="set">
          <el-button type="primary" @click="addPow" style="height: 40px"
          >新增</el-button>
          <el-button type="primary" @click="sharePow" style="height: 40px"
          >分配权限</el-button>
        </div>
        </div>
    <CommonTable
        :tableData="tableData"
        :tableLabel="tableLabel"
        :query="query"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @del="delPow"
        @edit="editUser"
      ></CommonTable>
       <!-- 添加限权 -->
    <el-dialog :visible.sync="isAdd" width="50%">
      <el-form>
        <el-form-item label="限权" >
          <el-input v-model="add.re_name" style="width:200px" placeholder="请输入权限名，如：权限2"></el-input>
  </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isAdd = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑限权 -->
    <el-dialog :visible.sync="isEdit" width="50%">
      <el-form>
  
        <el-form-item label="限权" >
          <el-input v-model="edit.re_name" style="width:200px"></el-input>
  </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isEdit = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配权限-查看 -->
    <el-dialog :visible.sync="isShare" width="60%">
      <PowTable
        :tableData="tablePow"
        :tableLabel="powLabel"
        :query="pquery"
        @handleSizeChangep="handleSizeChangep"
        @handleCurrentChangep="handleCurrentChangep"
        @del="shareDel"
        @edit="shareAdd"
        @set="shareSee"
      ></PowTable>
      <div slot="footer">
        <el-button @click="isShare = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="isOpen" width="50%">
      <el-form>
        <el-form-item label="包含的权限有:">
          <el-tag v-for="(item,index) in this.preData" :key="index">{{item}}</el-tag>
    </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isOpen = false">关闭</el-button>
        
      </div>
    </el-dialog>
    <!-- 分配权限-增加 -->
     <el-dialog :visible.sync="ispowAdd" width="50%">
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
      <div slot="footer">
        <el-button @click="ispowAdd = false">取 消</el-button>
        <el-button type="primary" @click="confirmPow">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配权限-增加 -->
    <el-dialog :visible.sync="ispowDel" width="50%">
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
          prop: 're_id',
          label: 'id',
        },
        {
          prop: 're_name',
          label: '权限',
        },
      ],
      tablePow:[],
      powLabel:[
        {
          prop: 'r_id',
          label: 'id',
        },
        {
          prop: 'r_name',
          label: '角色',
        },
      ],
      powdata:'',
      query: {
        //分页对象
        pageNum: 1,
        pageSize: 5,
        total: 0,
      },
      pquery: {
        //分页对象
        pageNum: 1,
        pageSize: 5,
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
      }
    }
  },
  created(){
    this.getList()
   
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
      this.table=[]
      this.api.post('/resourceList').then((res)=>{
        res.data.forEach(item => {
          
          this.table.push(item)
          
        })
        const DataAll = this.table
        // console.log(DataAll);
        //每次执行方法，将展示的数据清空
        this.tableData = []
        //1、当前页的第一条数据在总数据中的位置
        let strlength = (this.query.pageNum - 1) * this.query.pageSize + 1
        //2、当前页的最后一条数据在总数据中的位置
        let endlength = this.query.pageNum * this.query.pageSize
        //3、此判断很重要，执行时机：当分页的页数在最后一页时，进行重新筛选获取数据时
        //获取本次表格最后一页第一条数据所在的位置的长度
        let resStrLength = 0
        if (DataAll.length % this.query.pageSize == 0) {
          resStrLength =
            (parseInt(DataAll.length / this.query.pageSize) - 1) *
              this.query.pageSize +
            1
        } else {
          resStrLength =
            parseInt(DataAll.length / this.query.pageSize) *
              this.query.pageSize +
            1
        }
        //如果上一次表格的最后一页第一条数据所在的位置的长度 大于 本次表格最后一页第一条数据所在的位置的长度，则将本次表格的最后一页第一条数据所在的位置的长度 为最后长度
        if (strlength > resStrLength) {
          strlength = resStrLength
        }
        //4、当分页的页数切换至最后一页，如果最后一页获取到的数据长度不足最后一页设置的长度，则将设置的长度 以 获取到的数据长度 为最后长度
        if (endlength > DataAll.length) {
          endlength = DataAll.length
        }
        //5、循环获取当前页数的数据，放入展示的数组中
        for (let i = strlength - 1; i < endlength; i++) {
          this.tableData.push(DataAll[i])
        }
      
        //数据的总条数
        this.query.total = DataAll.length  
        
      })
    },
    getRole(){
      this.tablep=[]
      this.api.post('/roleList',this.form).then((res)=>{
        res.forEach(item => {
          console.log(item);
          this.tablep.push(item)
        })
        console.log(this.tablep);
        // console.log(this.table);
        const DataAllpow = this.tablep
        console.log(DataAllpow);
        //每次执行方法，将展示的数据清空
        this.tablePow = []
        //1、当前页的第一条数据在总数据中的位置
        let strlength = (this.pquery.pageNum - 1) * this.pquery.pageSize + 1
        //2、当前页的最后一条数据在总数据中的位置
        let endlength = this.pquery.pageNum * this.pquery.pageSize
        //3、此判断很重要，执行时机：当分页的页数在最后一页时，进行重新筛选获取数据时
        //获取本次表格最后一页第一条数据所在的位置的长度
        let resStrLength = 0
        if (DataAllpow.length % this.pquery.pageSize == 0) {
          resStrLength =
            (parseInt(DataAllpow.length / this.pquery.pageSize) - 1) *
              this.pquery.pageSize +
            1
        } else {
          resStrLength =
            parseInt(DataAllpow.length / this.pquery.pageSize) *
              this.pquery.pageSize +
            1
        }
        //如果上一次表格的最后一页第一条数据所在的位置的长度 大于 本次表格最后一页第一条数据所在的位置的长度，则将本次表格的最后一页第一条数据所在的位置的长度 为最后长度
        if (strlength > resStrLength) {
          strlength = resStrLength
        }
        //4、当分页的页数切换至最后一页，如果最后一页获取到的数据长度不足最后一页设置的长度，则将设置的长度 以 获取到的数据长度 为最后长度
        if (endlength > DataAllpow.length) {
          endlength = DataAllpow.length
        }
        //5、循环获取当前页数的数据，放入展示的数组中
        for (let i = strlength - 1; i < endlength; i++) {
          this.tablePow.push(DataAllpow[i])
        }
        //数据的总条数
        this.pquery.total = DataAllpow.length  
       
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
    
    delPow(row){
      console.log(row);
      this.$confirm('确定删除该条数据?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
      }).then((res) => {
        console.log(res)
        const id = row.re_id
        this.api.post('/delResource', { re_id: id }).then(() => {
          // $message、$confirm 为ElementUI弹出框的相关属性
          this.$message({
            type: 'success',
            message: '删除成功',
          })
          this.getList()
        })
      })
    },
    confirm() {
      if (this.operateType == 'add') {
        console.log(this.add)
        this.api.post('/addResource', this.add).then((res) => {
          console.log(res);
          this.isAdd = false //关闭弹窗
          if(res==true){
            this.$message({
            type: 'success',
            message: '添加成功',
          })
          }else{
            this.$message({
            type: 'warning',
            message: '添加失败',
          })
          }
          this.getList()
         
        })
        // getList()
      } else {
        this.api.post('/updateResourceById', this.edit).then((res) => {
          console.log(res);
          this.isEdit= false //关闭弹窗
          if(res.code==200){
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
        console.log(this.preData)
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
      this.getList()
    },
    //切换页数，执行方法
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.query.pageNum = val
      this.getList()
    // },
  },
    //切换当前页显示的数据条数，执行方法
  handleSizeChangep(val) {
      console.log(`每页 ${val} 条`)
      this.pquery.pageSize = val
      this.getRole()
    },
    //切换页数，执行方法
    handleCurrentChangep(val) {
      console.log(`当前页: ${val}`)
      this.pquery.pageNum = val
      this.getRole()
    // },
  },
}
}
</script>
<style>
.mainpow{
  margin-top: 15px;
}
.head{
  padding: 5px 10px;
  border-bottom: 1px solid #e9eef3;
}
.lheadp{
  padding: 10px 10px;
}
</style>