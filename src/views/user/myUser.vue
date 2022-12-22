<template>
  <div class="manage">
    <div class="manage-header">
      <!-- 查询 -->
      <div class="option">
        <div class="chaxun">
          <el-select
            v-model="value1"
            placeholder="性别"
            @change="seSelect"
            style="width: 150px"
            clearable
    @clear="setValueNull"
          >
            <el-option
              v-for="item in sexSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            v-model="value2"
            placeholder="身份"
            @change="poSelect"
            style="width: 150px"
          >
            <el-option
              v-for="item in posSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            v-model="value3"
            placeholder="按年龄排序"
            @change="ageSelect"
            style="width: 150px"
          >
            <el-option
              v-for="item in orderByAge"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            v-model="value4"
            placeholder="按id排序"
            @change="idSelect"
            style="width: 150px"
          >
            <el-option
              v-for="item in orderById"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button type="primary" @click="consult()">查询</el-button>
          <!-- <el-button type="primary" @click="reset()">重置</el-button> -->
        </div>
        <el-button type="primary" @click="addUser" style="height: 40px" icon="el-icon-plus"
          >新增</el-button
        >
      </div>
      <div class="head">
        <!-- <span>用户管理</span> -->
        <!-- <el-button type="primary" @click="addUser" style="height: 40px" icon="el-icon-plus"
          >新增</el-button
        > -->
        <div class="luse">用户列表</div>
        <div class="sea">
          <div>
  <el-input placeholder="请输入内容"  v-model.trim="inputContent" class="input-with-select">
    <el-select
            v-model="value5"
            placeholder="请选择"
            @change="inSelect"
            style="width: 100px"
            slot="prepend"
          >
            <el-option
              v-for="item in idName"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
    <el-button slot="append" icon="el-icon-search"  @click="getSearch" class="search"></el-button>
  </el-input>
</div>
        </div>
      </div>

      
    </div>
    <!-- 增加 -->
    <el-dialog :visible.sync="isAdd" width="30%"  title="新增用户" class="dadd">
    <el-card>
      <el-form>
          <el-form-item label="姓名">
    <el-input v-model="add.u_name" style="width:200px" placeholder="请输入姓名" required></el-input>
        </el-form-item>
        <el-form-item label="年龄">
    <el-input v-model="add.u_age" style="width:200px" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="add.u_sex" label="男">男</el-radio>
  <el-radio v-model="add.u_sex" label="女">女</el-radio>
  </el-form-item>
  <el-form-item label="身份">
          <el-select
            v-model="value7"
            placeholder="请选择"
            @change="inSid"
            style="width: 150px"
          >
          <el-option label="管理员" value="1"></el-option>
      <el-option label="学生" value="2"></el-option>
      <el-option label="教师" value="3"></el-option>
          </el-select>
  </el-form-item>
      </el-form>
    </el-card>
      <div slot="footer">
        <el-button @click="isAdd = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog :visible.sync="isedit" width="30%" title="修改用户信息" class="dadd">
      <el-card>
        <el-form>
          <el-form-item label="姓名">
    <el-input v-model="add.u_name" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
    <el-input v-model="add.u_age" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="add.u_sex" label="男">男</el-radio>
  <el-radio v-model="add.u_sex" label="女">女</el-radio>
  </el-form-item>
      </el-form>
      
      </el-card>
      <div slot="footer">
        <el-button @click="isedit = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    
    <el-dialog :visible.sync="isOpen" width="30%" class="dadd perData" title="用户相关信息" text-algin='center'>
      <el-card>
        <el-form>
        <el-form-item label="姓名:">
          {{this.basicdata.u_name}}
    </el-form-item>
    <el-form-item label="年龄:">
          {{this.basicdata.u_age}}
    </el-form-item>
    <el-form-item label="性别:">
          {{this.basicdata.u_sex}}
    </el-form-item>
    <el-form-item label="角色:">
          {{this.basicdata.s_id}}
    </el-form-item>
        <el-form-item label="角色拥有:">
          <el-tag v-for="(item,index) in this.roleData" :key="index">{{item}}</el-tag>
    </el-form-item>
    <el-form-item label="未拥有角色:">
      <el-tag v-for="(item,index) in this.nroleData" :key="index">{{item}}</el-tag>
    </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isOpen = false">关闭</el-button>
        
      </div>
      </el-card>
    </el-dialog>
    <div class="manage-table">
      <CommonTable
        :tableData="tableData"
        :tableLabel="tableLabel"
        :query="query"
        :isOperate='true'
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @changeTableData="changeTableData"       
      >
      <template slot-scope="data">
                 <el-button               
                  size="mini"
                  @click="editUser(data.row)"
                  icon="el-icon-edit">编辑</el-button>
                  <el-button
                 
                 size="mini"
                 type="warning"
                 @click="setPre( data.row)"
                 icon="el-icon-setting">相关信息</el-button>
                  <el-button
                 
                 size="mini"
                 type="danger"
                 @click="delUser( data.row)"
                 icon="el-icon-delete">删除</el-button>

             </template>
    </CommonTable>
    </div>
  </div>
</template>

<script>
import CommonTable from '@/components/CommonTable.vue'
// import CommonForm from '@/components/CommonForm.vue'
export default {
  components: { CommonTable},
  data() {
    return {
      sexSelect: [
        {
          value: '0',
          label: '不限',
        },
        {
          value: '1',
          label: '男',
        },
        {
          value: '2',
          label: '女',
        },
      ],
      posSelect: [
        {
          value: '0',
          label: '不限',
        },
        {
          value: '1',
          label: '管理员',
        },
        {
          value: '2',
          label: '学生',
        },
        {
          value: '3',
          label: '教师',
        },
      ],
      orderByAge: [
        {
          value: '0',
          label: '不限',
        },
        {
          value: '1',
          label: '顺序',
        },
        {
          value: '2',
          label: '倒序',
        },
      ],
      orderById: [
        {
          value: '0',
          label: '不限',
        },
        {
          value: '1',
          label: '顺序',
        },
        {
          value: '2',
          label: '倒序',
        },
      ],
      idName: [
        {
          value: '0',
          label: '按id号查找',
        },
        {
          value: '1',
          label: '按姓名查找',
        }
      ],
      value1: [],
      value2: [],
      value3: [],
      value4: [],
      value5: [],
      // 这是el-from表单对应的数据存放处,id，name则是form中input输入框
      // formInline: {
      //   id: "",
      //   name: "",
      // },
      u_id: '',
      // dialog弹窗默认关闭
      isShow: false,
      isOpen: false,
      isAdd:false,
      isedit:false,
      // table表格的数据
      tableData: [],
      // table中列的配置数据
      tableLabel: [
        {
          prop: 'u_id',
          label: 'id',
        },
        {
          prop: 'u_name',
          label: '姓名',
        },
        {
          prop: 'u_age',
          label: '年龄',
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
      // 新增表单标签数据
      operateFormLabel: [
        {
          model: 'u_name',
          label: '姓名',
          type: 'input',
        },
        {
          model: 'u_age',
          label: '年龄',
          type: 'input',
        },
        {
          model: 'u_sex',
          label: '性别',
          type: 'input',
        },
        {
          model: 's_id',
          label: '身份',
          type: 'input',
        },
      ],
      // 修改表单元素时会通过双向数据绑定修改父组件传递来的数据
      operateForm: {
        u_id: '',
        u_name: '',
        u_age: '',
        u_sex: '',
        s_id: '',
      },
      // 搜索时要传入的数据
      inputContent: '',

      searchForm: {
        // 点击搜索传给的数据
        u_id: '',
        u_name: '',
          u_sex: '',
          s_id: '',
          minAge: '',
          maxAge: '',
          orderByAge: '',
          orderById: '',
      },
      query: {
        //分页对象
        pageNum: 1,
        pageSize: 8,
        total: 0,
      },
      // 搜索条件
    //   listQuery: {
    //  email: undefined,
    //  spageNum: 1,
    //   spageSize: 10,
    // },
      form: {
        u_sex: '',
        s_id: ' ',
        minAge: ' ',
        maxAge: ' ',
        orderByAge: ' ',
        orderById: ' ',
      },
      ins:{
        ins:''
      },
      basicdata:{
     
      },
      roleData:[],
      nroleData:[],
      roleQuan:[],
      nroleQuan:[],
      rid:'',
      // 增加
      add: {
        u_id: '',
        u_name: '',
        u_age: '',
        u_sex: '',
        s_id: '',
      },
      value6:[],
      value7:[]

    }
  },
  mounted() {},
  methods: {
    setValueNull() {
           this.value1=null;
        },
    inSex(val){
      this.add.u_sex=val
    },
    inSid(val){
      this.add.s_id=val
      console.log(this.add.s_id);
    },
    inSelect(val){
        this.ins.ins=val
        console.log(val);
    },
    seSelect(val) {
      console.log(val)
      this.form.u_sex = val
      // console.log(this.form.u_sex);
      //  this.getList()
    },
    poSelect(val) {
      console.log(val)
      this.form.s_id = val
    },
    ageSelect(val) {
      console.log(val)
      this.form.orderByAge = val
    },
    idSelect(val) {
      console.log(val)
      this.form.orderById = val
    },
    confirm() {
      if (this.operateType == 'add') {
        console.log(this.add)
        this.api.post('/addUser', this.add).then((res) => {
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
          this.add={
            u_id: '',
        u_name: '',
        u_age: '',
        u_sex: '',
        s_id: '',
          }
          this.getList()
         
        })
        // getList()
      } else {
        this.api.post('/updateUserById', this.add).then((res) => {
          this.isedit= false //关闭弹窗
          if(res.code==200){
            this.$message({
            type: 'success',
            message: '编辑成功',
          })
          }else{
            this.$message({
            type: 'warning',
            message: '编辑失败',
          })
          }
          this.getList()
        })
      }
    },
     // 新增
     addUser() {
      (this.isAdd = true),
        (this.operateType = 'add'),
        // 数据初始化
        (this.operateForm = {
          s_id: '',
          u_name: '',
          u_age: '',
          u_sex: '',
        })
    },
    editUser(row) {
      this.operateType = 'edit'
      this.isedit = true
      this.add = {
        u_id: row.u_id,
        u_name: row.u_name,
        u_age: row.u_age,
        u_sex: row.u_sex,
      }
    },
    // 删除
    delUser(row) {
      this.$confirm('确定删除该条数据?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
      }).then(() => {
        const id = row.u_id
        this.api.post('/delUser', { u_id: id }).then(() => {
          // $message、$confirm 为ElementUI弹出框的相关属性
          this.$message({
            type: 'success',
            message: '删除成功',
          })
          this.getList()
        })
      })
    },
    // 设置权限
    setPre(row){
      this.basicdata=row
      this.isOpen=true
      const id = row.u_id
      if(row.s_id=='学生'){
        this.rid=2
      }else if(row.s_id=='教师'){
        this.rid=3
      }else{
        this.rid=1
      }
      // 角色
      this.api.post('/user_role/queryRoleByUId',{ u_id: id }).then((res)=>{
        this.roleData=[]
       res.data.forEach(item=>this.roleData.push(item.r_name))
      })
      this.api.post('/user_role/queryNoNRoleByUId',{ u_id: id }).then((res)=>{
        this.nroleData=[]
        res.data.forEach(item=>this.nroleData.push(item.r_name))
      })
      // 限权
      // this.api.post('/role_resource/queryResourceByRId',{ r_id: this.rid }).then((res)=>{
      // })
    },
    getList() {
      this.api.get('/userPage').then((res) => {
        this.table=[]
        this.table = res.records
        const DataAll = this.table
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
        this.query.total = DataAll.length
      })
      // this.api.post('/userPage',this.query).then((res)=>{
      //   this.query.total = res.records.length
      // })
    },
    //切换当前页显示的数据条数，执行方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.query.pageSize = val
      // this.listQuery.spageSize=val
      this.getList()
    },
    //切换页数，执行方法
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.query.pageNum = val
      // this.listQuery.spageNum=val
      this.getList()
    },
    changeTableData (val) {
       this.tableData = val
	},
    getSearch(){
        if(this.ins.ins==0){
            this.searchForm.u_id = this.inputContent;
            if (this.searchForm.u_id=='') {
            this.getList();
        }else{
            this.api.post('/getUserById', this.searchForm).then(res => {
                // const DataAll = this.table
                
            //   res.forEach(item=>this.tableData.push(item))
            if(res.code==500){
            this.$message({
            type: 'warning',
            message: '输入格式有问题，请重新输入',
              }) }else{
                this.tableData = [];
                if(res){
                  this.tableData.push(res);
                }
              }
                
                  console.log(this.tableData.length);
                  this.query.total = this.tableData.length
            });
            
        }
    }else if(this.ins.ins==1){
        this.searchForm.u_name = this.inputContent;
        if (this.searchForm.u_name=='') {
            this.getList();
        }else{
            this.api.post('/getUserByName', this.searchForm).then(res => {
                this.tableData = [];
  
                if(res){
                  console.log(res);
                res.forEach(item=>this.tableData.push(item))
              }          
              this.query.total = this.tableData.length
                // this.tableData.push(res);
                  // console.log(this.tableData);
            });
            
        }
    }
    },
    consult() {
    //   console.log(this.form)
      this.api.post('/selectBy', this.form).then((res) => {
        // console.log(this.searchForm);
        // console.log(res);
        // this.tableData = []
        // this.tableData = res
        this.stable=[]
        this.stable = res
        const sDataAll = this.stable
        //每次执行方法，将展示的数据清空
        this.tableData = []
        //1、当前页的第一条数据在总数据中的位置
        let strlength = (this.query.pageNum - 1) * this.query.pageSize + 1
        //2、当前页的最后一条数据在总数据中的位置
        let endlength = this.query.pageNum * this.query.pageSize
        //3、此判断很重要，执行时机：当分页的页数在最后一页时，进行重新筛选获取数据时
        //获取本次表格最后一页第一条数据所在的位置的长度
        let resStrLength = 0
        if (sDataAll.length % this.query.pageSize == 0) {
          resStrLength =
            (parseInt(sDataAll.length / this.query.pageSize) - 1) *
              this.query.pageSize +
            1
        } else {
          resStrLength =
            parseInt(sDataAll.length / this.query.pageSize) *
              this.query.pageSize +
            1
        }
        //如果上一次表格的最后一页第一条数据所在的位置的长度 大于 本次表格最后一页第一条数据所在的位置的长度，则将本次表格的最后一页第一条数据所在的位置的长度 为最后长度
        if (strlength > resStrLength) {
          strlength = resStrLength
        }
        //4、当分页的页数切换至最后一页，如果最后一页获取到的数据长度不足最后一页设置的长度，则将设置的长度 以 获取到的数据长度 为最后长度
        if (endlength > sDataAll.length) {
          endlength = sDataAll.length
        }
        //5、循环获取当前页数的数据，放入展示的数组中
        for (let i = strlength - 1; i < endlength; i++) {
          this.tableData.push(sDataAll[i])
        }
        this.tableData.forEach((item) => {
          // console.log(item);
          if (item.s_id == 2) {
            item.s_id = '学生'
          } else if(item.s_id==3){
            item.s_id = '教师'
          }else{
            item.s_id = '管理员'
          }
        })
        //数据的总条数
        this.query.total = sDataAll.length
      })
    },
  },
  // 页面一加载就得调用
  created() {
    this.getList()
    // console.log(this.tableData);
    // let obj=this.tableData.find(item=>item.s_id==2)
    // console.log(obj);
  },
}
</script>

<style>
.manage{
margin-top: 5px;
}
.manage-header {
  /* display: flex;
justify-content: space-between;
align-items: center; */
  /* height:"calc(100vh - 300px)"; */
  position: relative;
}
.content {
  position: relative;
}
.head {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  height: 40px;
  margin-top: 5px;
  padding: 5px 20px;
}
.luse{
  margin-top: 5px;
  padding: 0 10px;
}
.head > span {
  font-size: 30px;
}
.option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: #fff;
  margin-top: 5px;
  padding: 0 20px;
  /* margin-left: 5px; */
}
.chaxun{
  margin-left: 5px;
}
.el-select {
  margin-right: 10px;
}
.sea {
    /* float: left; */
position: absolute;
width: 336px;
right: 0;
padding: 0 20px;

}
.opt{
float: left;
}
.sea button{
    float: right;
}
.sea .inp{
    margin: 0 -12px;
}
.search{
  background-color: red;
}
/* .perData .el-dialog__body{
  padding: 0 50px !important;
} */
.dadd .el-dialog{
  border-radius: 8px;
}
.el-dialog{
  border-radius: 8px;

  border: 1px solid rgb(13, 210, 236);
}
/* .el-dialog.el-dialog--center {
    border-radius: 8px !important;
  }
  */
  .dadd .el-dialog__title{
    color: #338fcc;
  }
  .dadd .el-dialog__header{
    /* text-align: center; */
  }
.dadd .el-dialog__body{
  /* padding:20px 80px ; */
}
</style>
