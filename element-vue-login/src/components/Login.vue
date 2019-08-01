<template>
  <div class="background">
    <div class="login">
      <div class="container">
        <div class="title">{{title}}</div>
        <div class="darkbannerwrap"></div>
        <el-form :ref="loginForm"
                 :model="form"
                 :rules="rules"
                 label-width="40px"
                 class="form">
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user"
                      class="input"
                      placeholder="用户名"
                      v-model="form.username"
                      clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock"
                      class="input"
                      placeholder="密码"
                      v-model="form.password"
                      show-password
                      clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// import constConfig from '@/utils/constConfig'
// import Cookies from 'js-cookie'
// import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      title: 'NavInfo Transportation Platform',
      loginForm: 'loginForm',
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名！', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码！', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs[this.loginForm].validate((valid) => { // ref 和 model属性必须
        if (valid) {
          console.log(valid)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    login () {
      // Cookies.set(constConfig.cookie.USER_INFO, this.userName, { expires: 1.0 / 24 / 12 })
      // this.$router.push('/');
      // // TODO: 缺少后端接口
      // let that = this
      // let url = that.baseConfig.baseURL + 'login'
      // let params = {
      //     userName: that.userName,
      //     password: that.password
      // }
      // let errorMsg = that.$t('login.errorMsg')
      // let loginError = that.$t('login.loginError')
      // axios.post(url, params).then(result => {
      //     let res = result.data
      //     if (res == -1) {
      //         that.errorMsg = errorMsg
      //         that.showError = true
      //     } else {
      //         Cookies.set(constConfig.cookie.USER_INFO, that.userName, { expires: 1.0 / 24 / 30})
      //         that.$router.push('/');
      //     }
      // }).catch(e => {
      //     that.errorMsg = loginError
      //     that.showError = true
      // })
    }
  }
}
</script>

<style scoped>
/* .cover{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
    background: rgba(3, 3, 3 , 0.45);
}
.background::before {
    background:url(../../assets/img/th01.jpg) no-repeat center;
    background-size: cover;
    width: 100%;
    height: 100%;
    content: "";
    position: absolute;
    z-index: -1;
    opacity: 0.15;
} */

.background {
  width: 100vw;
  height: 100vh;
  background-color: #555;
}
.login {
  background-color: #fff;
  height: 360px;
  width: 420px;
  border-radius: 4px;
  margin-top: 20vh;
  margin-left: 15vw;
  position: absolute;
  font-size: 18px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.container {
  position: absolute;
  height: 100%;
  width: 100%;
}
.title {
  margin: 40px 40px 0 -20px;
  padding: 18px 10px 18px 60px;
  background: #409eff;
  color: #fff;
}
.darkbannerwrap {
  position: absolute;
  background: url(../../static/images/aiwrap.png);
  width: 18px;
  height: 10px;
  margin-left: -18px;
}

.form {
  margin-top: 30px;
  padding-right: 40px;
}
</style>
