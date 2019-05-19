<template>
  <div class="container">
    <div class="title">
      <div class="title-text">{{title}}</div>
      <div class="title-more">更多{{title}}&gt;&gt;</div>
    </div>
    <div class="img-container">
      <div :key="item.name" class="img-list" v-for="item in imgList">
        <div class="img">
          <img :src="item.src" :alt="item.name">
        </div>
        <div class="info">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryItem',
  data () {
    return {
      title: '手机壁纸',
      imgList: [
        {
          name: '插画中的美女',
          src: '../../static/images/1_10060612251102.jpg'
        },
        {
          name: '手机壁纸收藏',
          src: '../../static/images/1_1006061034TU.jpg'
        },
        {
          name: '怡然美景美不胜收壁纸欣赏',
          src: '../../static/images/1_10060609459629.jpg'
        },
        {
          name: '沙漠掠影高清图片下载',
          src: '../../static/images/1_1006060R613O.jpg'
        },
        {
          name: '山河美色iphone plus壁纸',
          src: '../../static/images/1_1006060I0DH.jpg'
        }
      ]
    }
  }
}
</script>

<style scoped>
.container {
  height: 300px;
  border-top: solid 3px #323436;
  margin: 15px auto 0px auto;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  width: 65vw;
}

.title {
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 4rem;
}
.title-text {
  display: -webkit-flex;
  display: flex;
  flex-basis: 32vw;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 1.5rem;
}

.title-more {
  display: -webkit-flex;
  display: flex;
  flex-basis: 32vw;
  justify-content: flex-end;
  align-items: flex-end;
  color: #888888;
}
.title-more:hover {
  text-decoration: solid #8888 underline;
}
.img-container{
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.img-list{
  width: 180px;
  height: 320px;
  background-color: #fff;
}
img{
  width: 180px;
  height: 280px;
}
</style>
