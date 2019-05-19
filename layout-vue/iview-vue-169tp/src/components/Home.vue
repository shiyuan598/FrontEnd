<template>
  <div class="container">
    <div class="title">
      <div class="logo">
        <img class="logo-img" src="../../static/images/logo.gif" alt="">
      </div>
      <div class="title-info">
        <a href="javascript:;">加入收藏</a>
        <a href="javascript:;">联系我们</a>
      </div>
    </div>
    <div class="layout">
      <Layout>
        <Header class="header">
          <div class="category">
            <div class="layout-nav">
              <MenuItem class="category-item" :class="currentItem==index?'category-item-current':''" :key="item.name" v-for="(item, index) in catagory" :name="index">
                {{item.name}}
              </MenuItem>
            </div>
          </div>
        </Header>
        <Content class="content">
          <OverView></OverView>
          <CategoryItem></CategoryItem>
        </Content>
        <Footer class="footer">Copyright © 2007-2019 169美女图片网 皖ICP备17023633号-1</Footer>
      </Layout>
    </div>
  </div>
</template>

<script>
import OverView from '@/components/OverView'
import CategoryItem from '@/components/CategoryItem'
export default {
  name: 'Home',
  components: {OverView, CategoryItem},
  data () {
    return {
      currentItem: 0,
      catagory: [
        {
          name: '首页',
          href: 'https://www.169tp.com'
        },
        {
          name: '性感美女',
          href: 'https://www.169tp.com/xingganmeinv/'
        },
        {
          name: '网友自拍',
          href: 'https://www.169tp.com/wangyouzipai/'
        },
        {
          name: '高跟丝袜',
          href: 'https://www.169tp.com/gaogensiwa/'
        },
        {
          name: '国内美女',
          href: 'https://www.169tp.com/guoneimeinv/'
        },
        {
          name: '手机壁纸',
          href: 'https://www.169tp.com'
        },
        {
          name: '电脑壁纸',
          href: 'https://www.169tp.com'
        },
        {
          name: '人体艺术',
          href: 'https://www.169tp.com'
        }
      ]
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  border: 0;
  width: 100%;
}
.container{
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  background-color: #f0f1f1;
}
.title{
  min-height: 70px;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  border-top: solid 3px #ef4c79;
}
.logo{
  justify-content: center;
  flex-basis: 40vw;
  min-width: 270px;
}
.logo-img{
  height: 70px;
  width: 265px;
}
.title-info{
  justify-content: center;
  flex-basis: 40vw;
  align-self: flex-end;
}
.title-info a{
  color: #323436;
  text-decoration: none;
  font-size: 0.875rem;
  width: 100px;
}
.title-info a:hover{
  color: #ef4c79;
  text-decoration: #ef4c79 solid underline;
}
.layout{
  height: calc(100vh - 70px);
  display: -webkit-flex;
  display: flex;
}

.category{
  width: 85vw;
  justify-content: center;
}
.layout-nav{
  /*width: 80vw;*/
  min-width: 600px;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
}
.category-item{
  color: #999999;
  width: 100px;
  min-width: 60px;
  justify-content: center;
  align-items: center;
}
.category-item:hover{
  background-color: #ef4c79;
  font-weight: 800;
  color: #ffffff;
  text-decoration: #fff solid underline;
}
.category-item-current{
  background-color: #ef4c79;
  font-weight: 800;
  color: #ffffff;
}

.header {
  height: 64px;
  background-color: #323436;
}

.content{
  flex-direction: column;
  justify-content: center;
  background-color: #f0f1f1;
}

.footer {
  height: 10vh;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 1rem;
  background-color: #323436;
}
</style>
