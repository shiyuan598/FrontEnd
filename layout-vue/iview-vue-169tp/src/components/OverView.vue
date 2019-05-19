<template>
  <div class="container">
    <div class="img">
      <Carousel dots="outside" autoplay loop :autoplay-speed="speed">
        <CarouselItem>
          <div class="demo-carousel">
            <img class="logo-img" src="../../static/images/1_06300146261S1.jpg" alt="">
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
            <img class="logo-img" src="../../static/images/1_06300221451300.jpg" alt="">
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
            <img class="logo-img" src="../../static/images/1_0630021IAO4.jpg" alt="">
          </div>
        </CarouselItem>
      </Carousel>
    </div>
    <div class="list">
      <h3>每日鲜图</h3>
      <ul>
        <li><strong class="num01">1</strong> <a
          href="javascript:;" target="view_window" title="颓废的私人玩物美眉">颓废的私人玩物美眉</a>
          <em>05-18 </em>
        </li>
        <li><strong class="num01">2</strong> <a
          href="javascript:;" target="view_window" title="有故事的女同学波多野結衣">有故事的女同学波多野結衣</a>
          <em>05-18 </em>
        </li>
        <li><strong class="num01">3</strong> <a
          href="javascript:;" target="view_window" title="日系学妹思淇Sukiiii">日系学妹思淇Sukiiii</a>
          <em>05-18 </em>
        </li>
        <li><strong class="num01">4</strong> <a
          href="javascript:;" target="view_window" title="楚楚可人的美体晓梦may">楚楚可人的美体晓梦may</a>
          <em>05-18 </em>
        </li>
        <li><strong class="num01">5</strong> <a
          href="javascript:;" target="view_window" title="心心念念的姑娘栗子Riz">心心念念的姑娘栗子Riz</a>
          <em>05-18 </em>
        </li>
        <li><strong class="num01">6</strong> <a
          href="javascript:;" target="view_window" title="正点九妹的红色高跟鞋">正点九妹的红色高跟鞋</a>
          <em>05-18 </em>
        </li>
        <li><strong class="num01">7</strong> <a
          href="javascript:;" target="view_window" title="超可爱女孩的美腿白丝袜">超可爱女孩的美腿白丝袜</a>
          <em>05-18 </em>
        </li>
        <li><strong class="num01">8</strong> <a
          href="javascript:;" target="view_window"
          title="让人目不转睛的表妹">让人目不转睛的表妹</a>
          <em>05-18 </em>
        </li>
        <li><strong class="num01">9</strong> <a
          href="javascript:;" target="view_window" title="豪乳女神温心怡高清写真集">豪乳女神温心怡高清写真集</a>
          <em>05-17 </em>
        </li>
        <li><strong class="num01">10</strong> <a
          href="javascript:;" target="view_window" title="娜露Selena的惬意时刻">娜露Selena的惬意时刻</a>
          <em>05-17 </em>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OverView',
  data () {
    return {
      speed: 4000
    }
  }
}
</script>

<style scoped>
.container {
  margin: 1rem auto;
  height: 360px;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.img {
  width: calc( 45vw - 20px);
  margin-right: 20px;
  justify-content: center;
}

img {
  width: 45vw;
  height: 320px;
}

.list {
  width: 20vw;
  background-color: #ffffff;
  padding: 10px 10px;
  height: 320px;
}

h3 {
  display: -webkit-flex;
  display: flex;
  justify-content: flex-start;
}

ul, li {
  list-style: none;
  font-size: 0.875rem;
}

li {
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  line-height: 1.8rem;
  justify-content: flex-start;
  align-items: center;
}

li strong {
  color: #ffffff;
  background-color: #ef4c79;
  width: 1.2rem;
  height: 1.2rem;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

li a {
  display: -webkit-flex;
  display: flex;
  align-items: center;
  color: #323436;
  text-decoration: none;
  font-size: 0.875rem;
  width: 16vw;
}
li a:hover {
  color: #ef4c79;
  text-decoration: #ef4c79 solid underline;
}

li em {
  color: #888888;
  font-style: normal;
  font-size: 0.875rem;
  width: 3vw;
}
</style>
