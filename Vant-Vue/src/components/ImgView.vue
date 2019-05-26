<template>
  <div>
    <van-icon class="iconfont icon-kefu1"/>
    <van-button
      type="primary"
      @click="showImagePreview"
    >
      <van-icon name="like-o"/>
      显示照片
    </van-button>
  </div>
</template>

<script>
import {ImagePreview} from 'vant'

export default {
  methods: {
    showImagePreview () {
      const imgList = [
        'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
        'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
        'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg',
        'https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg',
        'http://hbimg.b0.upaiyun.com/16880e1f05dc8807c3e5336d1d8eb4eeeb6130ac3423e-xa0xnN_fw658',
        'http://www.33lc.com/uploadfile/2014/0421/20140421065215190.jpg'
      ]
      ImagePreview({
        images: imgList,
        showIndicators: true,
        startPosition: 3
      })
    }
  }
}
</script>

<style scoped>

</style>
