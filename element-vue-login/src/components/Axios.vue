<template>
  <div class="container">
    <el-button @click="click">点点</el-button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Axios',
  data () {
    return {}
  },
  methods: {
    click () {
      let urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3'
      ]
      let axiosList = []
      urls.forEach(url => {
        axiosList.push(axios.get(url))
      })
      axios.all(axiosList).then(function (res) {
        let p1 = (res[0].data)
        let p2 = (res[1].data)
        console.info(p1)
        console.info(p2)
      })

      axios.all(axiosList).then(axios.spread(function (res1, res2, res3, res4) {
        let p1 = (res1.data)
        let p2 = (res2.data)
        console.info(p1)
        console.info(p2)
      }))
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 20px;
}
</style>
