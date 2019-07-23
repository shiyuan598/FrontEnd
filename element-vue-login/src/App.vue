<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}

body, html, #app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

body, html {
  height: 100%;
  overflow: hidden;
}

body::before {
  background: url(../static/images/OuOpTbVC_MjE5.jpg) no-repeat center;
  background-size: cover;
  width: 100%;
  height: 100%;
  content: "";
  position: absolute;
  z-index: -1;
  opacity: 0.45;
}

</style>
