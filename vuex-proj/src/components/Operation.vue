<template>
  <div class="container">
    <h1>{{$store.state.count}}</h1>
    <button @click="handleReduce">Commit -</button>
    <button @click="handleAdd">Commit +</button>
    <button @click="handleReduceDispatch">Dispatch -</button>
    <button @click="handleAddDispatch">Dispatch +</button>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {}
  },
  methods: {
    handleAdd () {
      this.$store.commit('mutationsAddCount', 1)
    },
    handleReduce () {
      this.$store.commit('mutationsReduceCount', 1)
    },
    handleAddDispatch () {
      this.$store.dispatch('actionsAddCount', 1)
    },
    handleReduceDispatch () {
      this.$store.dispatch('actionsReduceCount', 1)
    }
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
