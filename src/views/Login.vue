<template>
  <div class="ruleForm_wrapper">
    <el-form
      ref="ruleForm2"
      :model="ruleForm2"
      :rules="rules2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container">
      <h3 class="title">智能公寓系统登录</h3>
      <el-form-item prop="admin_name">
        <el-input
          v-model="ruleForm2.admin_name"
          type="text"
          auto-complete="off"
          placeholder="用户名"/>
      </el-form-item>
      <el-form-item prop="admin_password">
        <el-input
          v-model="ruleForm2.admin_password"
          type="password"
          auto-complete="off"
          placeholder="密码" show-password/>
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
          @click.native.prevent="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>

import { requestLogin } from '../api/api'
export default {
  data () {
    return {
      logining: false,
      ruleForm2: {
        admin_name: '',
        admin_password: ''
      },
      rules2: {
        admin_name: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        admin_password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      checked: false
    }
  },
  mounted(){
    this.getCookie()
  },
  methods: {
    //登录
    handleLogin () {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.logining = true
          //记住密码
          if(this.checked ===true){
            //传入账号密码和保存参数
            this.setCookie(this.ruleForm2.admin_name,this.ruleForm2.admin_password,7)
          }else {
            this.clearCookie()
          }
          var loginParams = {
            admin_name: this.ruleForm2.admin_name,
            admin_password: this.ruleForm2.admin_password
          }
          requestLogin(loginParams).then(res => {
            this.logining = false
            if (res.data.code !== 0) {
              this.$message({
                message: res.data.message,
                type: 'error'
              })
            } else {
              sessionStorage.setItem('user', JSON.stringify(res.data.data.admin_name))
              sessionStorage.setItem('user_kind', JSON.stringify(res.data.data.admin_kind))
              this.$router.push({
                path: '/roomManage'
              })
              window.document.cookie = "login" + "=" +new Date().getTime() + ";path=/;expires=" + 'Fri, 31 Dec 9999 23:59:59 GMT'
            }
          })
        } else {
          return false
        }
      })
    },
    //读取Cookie
    getCookie(){
      if(document.cookie.length > 0 ){
        console.log(document.cookie)
        var arr = document.cookie.split('; ')
        //cookie是这样一串： userName = root; userPwd=root
        for(var i = 0;i<arr.length;i++){
          console.log(arr[i])
          var arr2 = arr[i].split('='); //再次切割
          //判断查找相对应的值
          if (arr2[0] == 'userName') {
            this.ruleForm2.admin_name = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == 'userPwd') {
            this.ruleForm2.admin_password = arr2[1];
          }
        }
      }
    },
    //设置Cookie
    setCookie(c_name, c_pwd, exdays){
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //清空cookie
    clearCookie(){
      this.setCookie("","", -1)
    }
  }
}

</script>

<style lang="scss" scoped>
    .login-container {
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
