<template>
  <div class="container">
    <h1>{{$store.state.count}}</h1>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {}
  }
}
</script>
<style scoped>
.container{
  border: 1px #0094ff solid;
  border-radius: 3px;
  height: 100px;
  margin: 5px 200px;
}
</style>
