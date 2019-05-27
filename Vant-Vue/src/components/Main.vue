<template>
  <div class="container">
    <van-tag>标签1</van-tag>
    <van-tag type="danger">标签2</van-tag>
    <van-tag type="primary">标签3</van-tag>
    <van-tag type="success">标签4</van-tag>
    <van-icon class="iconfont icon-kefu1"/>
    <van-swipe :autoplay="3000" :height="300" class="swipe">
      <van-swipe-item v-for="(img, index) in images" :key="index">
        <img v-lazy="img" />
      </van-swipe-item>
    </van-swipe>
    <van-button plain type="primary" @click="showImagePreview">
      <van-icon class="iconfont icon-kefu1"/>
      朴素按钮
    </van-button>
    <van-search
      placeholder="请输入搜索关键词"
      show-action
    />
    <van-button @click="changeGlobalView">国际化</van-button>
    <div class="audio-container">
      <Icon type="md-play" @click="clickControl"/>
      <Button type="text" disabled>0:00</Button>
      <Slider v-model="currentTime" class="slider" :max="duration" @on-change="changeSlider"></Slider>
      <Button type="text" disabled>{{duration}}</Button>
      <audio @canplay="getDuration" @timeupdate="updateTime" ref="audio" src="../../static/audio/audio.mp3" controls></audio>
    </div>
    <Icon type="md-pause" />
  </div>
</template>

<script>
import Vue from 'vue'
import { ImagePreview, Locale, Lazyload } from 'vant'

import enUS from 'vant/lib/locale/lang/en-US'

Vue.use(ImagePreview)
Vue.use(Lazyload)

// 引用外部incofont分三步
// 1.下载iconfont到本地，在系统中加入iconfont相关的文件
// 2.引用import './assets/iconfont/iconfont.css'文件
// 3.main.vue 加入
// .icon {
// width: 1em; height: 1em;
// vertical-align: -0.15em;
// fill: currentColor;
// overflow: hidden;
// }
// 之后就可以在button，icon等组件中使用了，注意iconfont前加icon
// 如  <van-icon class="iconfont icon-kefu1"/>

// Locale.use('en-US', enUS)
// i18n 国际化
export default {
  name: 'Main',
  data () {
    return {
      images: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558847683569&di=04cae433dc75c10cf5e2f973d3c7849d&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180615%2F1098c8a6c333468f921b5277d56a43d6.jpeg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558847610955&di=9a135208c5586ee506d75df61f73c16f&imgtype=0&src=http%3A%2F%2Fimg2.ph.126.net%2F2zB3_wWPXlEW0RdwQa8d6A%3D%3D%2F2268688312388037455.jpg'
      ],
      value1: 30,
      duration: 0,
      currentTime: 0,
      ended: false
    }
  },
  mounted () {
    // https://juejin.im/post/5c8a4a586fb9a049b507b0d5
    var audio = this.$refs.audio
    this.$nextTick(() => {
      this.duration = audio.duration
      console.log(this.duration)
    })
  },
  methods: {
    clickControl () {
      // 1
    },
    changeSlider (value) {
      this.currentTime = value
      var audio = this.$refs.audio
      audio.currentTime = value
    },
    getDuration () {
      var audio = this.$refs.audio
      this.$nextTick(() => {
        this.duration = audio.duration
        console.log(this.duration)
      })
    },
    updateTime () {
      var audio = this.$refs.audio
      this.$nextTick(() => {
        this.currentTime = audio.currentTime
        console.log(this.currentTime)
      })
    },
    showImagePreview () {
      var imgList = [
        'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
        'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
        'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg',
        'https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg',
        'http://hbimg.b0.upaiyun.com/16880e1f05dc8807c3e5336d1d8eb4eeeb6130ac3423e-xa0xnN_fw658',
        'http://www.33lc.com/uploadfile/2014/0421/20140421065215190.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558847683569&di=04cae433dc75c10cf5e2f973d3c7849d&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180615%2F1098c8a6c333468f921b5277d56a43d6.jpeg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558847610955&di=9a135208c5586ee506d75df61f73c16f&imgtype=0&src=http%3A%2F%2Fimg2.ph.126.net%2F2zB3_wWPXlEW0RdwQa8d6A%3D%3D%2F2268688312388037455.jpg'
      ]
      ImagePreview({
        images: imgList,
        closeOnPopstate: true,
        // asyncClose: true, // 添加此asyncClose属性后必须通过imagePreview的实例才能关闭
        showIndicators: true,
        startPosition: 1
      })
    },
    changeGlobalView () {
      Locale.use('en-US', enUS)
    }
  }
}
</script>

<style scoped>
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.swipe{
  height: 20vh;
}
.audio-container{
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}
.slider{
  width: 50vw;
}
</style>
