<template>
  <div class="login">
    <div class="container">
      <div class="title">{{title}}</div>
      <div class="darkbannerwrap"></div>
      <div class="input-container">
        <el-input prefix-icon="el-icon-user" class="input" placeholder="用户名" v-model="username" clearable></el-input>
        <el-input prefix-icon="el-icon-lock" class="input" placeholder="密码" v-model="password" show-password clearable></el-input>
        <el-button class="button" type="primary">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
export default {
  name: 'login',
  data () {
    return {
      title: 'NavInfo Transportation Platform',
      username: '',
      password: ''
    }
  }
}
</script>

<style scoped>
.login{
  background-color: #fff;
  height: 360px;
  width: 420px;
  border-radius: 4px;
  margin-top: 20vh;
  margin-left: 15vw;
  position: relative;
  font-size: 18px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.container{
  position: absolute;
  height: 100%;
  width: 100%;
}
.title {
  margin: 40px 40px 0 -20px;
  padding: 18px 10px 18px 60px;
  background: #409EFF;
  color: #fff;
}
.darkbannerwrap {
  position: absolute;
  background: url(../../static/images/aiwrap.png);
  width: 18px;
  height: 10px;
  margin-left: -18px;
}

.input-container{
  margin-top: 20px;
}

.input{
  border-color: #f40;
}

.input, .button{
  margin: 10px 40px 10px 40px;
  width: 340px;
}

</style>
