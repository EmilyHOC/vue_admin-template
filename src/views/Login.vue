<template>
  <div class="ruleForm_wrapper">
    <el-form
      ref="ruleForm2"
      :model="ruleForm2"
      :rules="rules2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="aAccount">
        <el-input
          v-model="ruleForm2.aAccount"
          type="text"
          auto-complete="off"
          placeholder="用户名"/>
      </el-form-item>
      <el-form-item prop="aPassword">
        <el-input
          v-model="ruleForm2.aPassword"
          type="password"
          auto-complete="off"
          placeholder="密码"/>
      </el-form-item>
      <el-checkbox
        v-model="checked"
        checked
        class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          :loading="logining"
          type="primary"
          style="width:100%;"
          @click.native.prevent=" handleSubmit2">登录</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>

import { requestLogin,testcontent } from '../api/api'
export default {
  data () {
    return {
      logining: false,
      ruleForm2: {
        aAccount: '123456',
        aPassword: '123456'
      },
      rules2: {
        aAccount: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        aPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },
  methods: {

    handleSubmit2 (ev) {
      var _this = this
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.logining = true
          var loginParams = { aAccount: this.ruleForm2.aAccount, aPassword: this.ruleForm2.aPassword }
          requestLogin(loginParams).then(res => {
            this.logining = false
            console.log(res.data.code)
            if (res.data.code !== 600) {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            } else {
              sessionStorage.setItem('user', JSON.stringify(res.data.data.aAccount))
              this.$router.push({
                path: '/roomManage'
              })
            }
          })
        } else {
          return false
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0px 0px 35px 0px;
        }
    }
    .ruleForm_wrapper{
        z-index: 10000;
        height: 100%;
        width: 100%;
        margin-left: -100px;
    }
</style>
