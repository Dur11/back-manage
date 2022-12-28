<template>
  <div class="login-warp">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="login-form"
    >
      <h2
        class="login_title"
        label-position="top"
        label-width="80px"
        :model="form"
      >
        用户登录
      </h2>
      <!-- prop：定义在form中对应的字段 -->
      <el-form-item label="账号" prop="u_id" class="username">
        <!-- autocomplete：表单是否启用自动完成功能。自动完成允许浏览器对字段的输入，是基于之前输入过的值。 -->
        <el-input
          type="input"
          v-model="form.u_id"
          autocomplete="off"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="u_password">
        <el-input
          type="password"
          v-model="form.u_password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code" class="yzm">
        <div class="yan">
          <el-input
            type="input"
            v-model="form.code"
            autocomplete="off"
            placeholder="验证码"
            class="yan"
          ></el-input>
          <img id="yzm" :src="this.vCode" @click="changeCodeImg()" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin" class="login-btn"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
    <!-- <el-dialog :visible.sync="isMsg" width="20%" class="dadd msg">
      {{ msg }}
    </el-dialog> -->
    <el-dialog :visible.sync="isOpen" width="20%" class="dadd">
      {{ msg }}
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {
        u_id: '',
        u_password: '',
        code: '',
      },
      // 表单校验的定义
      rules: {
        u_id: [
          // 用户名校验：必需、没有输入会有提示、失去焦点触发
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 3,
            message: '账号长度不能小于3位',
            trigger: 'blur',
          },
        ],
        // 密码校验：必需、提示、失去焦点触发
        u_password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
      menu: [],
      token: '',
      vCode: '/api/vCode',
      msg: '',
      isMsg: false,
      isOpen: false,
    }
  },
  created() {
   
  },
  methods: {
    changeCodeImg() {
      this.vCode = '/api/vCode?count=' + Math.random()
    },
    //登录请求
    handleLogin() {
      this.api.post('/login', this.form).then((res) => {
        // console.log(res.code)
      
        this.token = res.code
        // console.log(this.token)
        this.$store.commit('setToken', this.token)
        if (res.code == 200) {
          (this.menu = [
            {
              name: '首页',
              order: '1',
              path: 'show',
              icon:'s-home',
            },
            {
              name: '用户管理',
              order: '1',
              path: 'user',
              icon:'user-solid',
            },
            {
              name: '角色管理',
              order: '1',
              path: 'role',
              icon:'s-custom'
            },
            {
              name: '用户权限管理',
              order: '1',
              path: 'permission',
              icon:'s-tools'
            },{
              name: '权限管理',
              order: '1',
              path: 'power',
              icon:'setting'
            },
          ]),
            console.log(res.data.s_id)
          if (res.data.s_id == 1) {
            this.$router.push({ path: '/home' })
            this.$store.commit('setMenu', this.menu)
            // this.isOpen = true
            this.msg = '管理员登陆成功'
            this.$message({
            type: 'success',
            message:  this.msg,
          })
          } else {
            // this.isOpen = true
            this.msg = '用户登陆成功'
            this.$message({
            type: 'success',
            message:  this.msg,
          })
            this.changeCodeImg()
          }
        }else{
          if(res.code == 500){
            this.$message({
            type: 'warning',
            message: '输入格式错误，请重新输入',
          })
            // alert('输入格式错误，请重新输入')
          }else{
            // this.isMsg = true
            this.msg = res.msg
            this.$message({
            type: 'error',
            message:  this.msg,
          })
            // console.log(res.msg)
            this.changeCodeImg()
          }
          } 
      })
    },
  },
}
</script>

<style scoped>
.login-warp {
  height: 100%;
  background: url(@/assets/back.jpg) no-repeat;
  background-size: 100% 100%;
    background-attachment: fixed;/* 不设置的话页面滑动时，背景会不铺满*/
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-warp .login_title {
  margin-left: 150px;
}
.login-warp .login-form {
  width: 400px;
  background-color: #00000060;
  border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
  padding: 30px;
}
.login-warp .login-btn {
  width: 100%;
  background-image: linear-gradient(to right, #30cfd0, #330867);
}
h2{
  color: #fff;
}
.yan {
  display: flex;
  /* position: relative;
  top: 0; */
  /* width: 150px; */
}
.yan > el-input {
  width: 150px;
}
.msg .el-dialog__body{
  font-size: 40px;
}

</style>
