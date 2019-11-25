<template>
  <div class="container">
    <h1>{{$store.state.count}}</h1>
    <div>{{value}}</div>
    <show></show>
    <operation></operation>
  </div>
</template>
<script>
import show from './Show.vue'
import operation from './Operation.vue'
export default {
  name: 'Home',
  components: { show, operation },
  data () {
    let that = this
    return {
      value: that.$store.state.count
    }
  }
}
</script>
<style scoped>
.container {
  border: 1px #0094ff solid;
  border-radius: 3px;
  height: 100px;
  margin: 0 200px;
}
</style>
