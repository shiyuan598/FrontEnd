<template>
  <div class="container">
    <div class="title">
      <div class="logo">
        <img class="logo-img" src="" alt="">
      </div>
      <div class="title-info">
        <a href="javascript:;">加入收藏</a>
        <a href="javascript:;">联系我们</a>
      </div>
    </div>
    <div class="layout">
      <div>
        <div class="header">
          <div class="layout-nav">
            <MenuItem class="category-item" :class="currentItem==index ? 'category-item-current' : ''" :key="item.name"
                      v-for="(item, index) in catagory" :name="index">
              {{item.name}}
            </MenuItem>
          </div>
        </div>
        <div class="content">
          <OverView></OverView>
          <CategoryItem :key="item.title" :category="item" v-for="item in categoryDetails"></CategoryItem>
          <TabsItem :tabs-list="tabsList"></TabsItem>
        </div>
        <div class="footer">Copyright © 2007-2019 169美女图片网 皖ICP备17023633号-1</div>
      </div>
    </div>
  </div>
</template>

<script>
import OverView from '@/components/OverView'
import CategoryItem from '@/components/CategoryItem'
import TabsItem from '@/components/TabsItem'

export default {
  name: 'Home',
  components: {OverView, CategoryItem, TabsItem},
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
          name: '日本美女',
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
        },
        {
          name: '手机版',
          href: 'https://www.169tp.com'
        }
      ],
      categoryDetails: [
        {
          title: '手机壁纸',
          imgList: [
            {
              name: '插画中的美女',
              src: ''
            },
            {
              name: '手机壁纸收藏',
              src: ''
            },
            {
              name: '怡然美景美不胜收壁纸欣赏',
              src: ''
            },
            {
              name: '沙漠掠影高清图片下载',
              src: ''
            },
            {
              name: '山河美色iphone plus壁纸',
              src: ''
            }
          ]
        },
        {
          title: '性感美女',
          imgList: [
            {
              name: '女神在大自然里華村あ',
              src: ''
            },
            {
              name: '心往神驰的小萝莉瀬名きら',
              src: ''
            },
            {
              name: '东瀛女孩的日常塩地美澄',
              src: ''
            },
            {
              name: '美女山崎真実写真大片',
              src: ''
            },
            {
              name: '极致感性女神戸田れい',
              src: ''
            }
          ]
        },
        {
          title: '网友自拍',
          imgList: [
            {
              name: '颓废的私人玩物美眉',
              src: ''
            },
            {
              name: '可爱小猫咪牛仔裤美臀',
              src: ''
            },
            {
              name: '发条少女勇敢露脸爆照',
              src: ''
            },
            {
              name: '蕾丝萝莉妹妹懒洋洋',
              src: ''
            },
            {
              name: '白富美小姐姐节日狂欢',
              src: ''
            }
          ]
        }
      ],
      tabsList: [
        {
          name: '友情链接',
          content: [
            {
              name: '妹子图',
              href: 'javascript:;'
            },
            {
              name: '漂漂美术馆',
              href: 'javascript:;'
            },
            {
              name: '性感美女',
              href: 'javascript:;'
            }
          ]
        },
        {
          name: '合作伙伴',
          content: [
            {
              name: '百度一下',
              href: 'javascript:;'
            },
            {
              name: '美图秀秀',
              href: 'javascript:;'
            }
          ]
        },
        {
          name: '网站导航',
          content: [
            {
              name: '性感美女',
              href: 'javascript:;'
            },
            {
              name: '高跟丝袜',
              href: 'javascript:;'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  border: 0;
  width: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.container {
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  background-color: #f0f1f1;
}

.title {
  min-height: 70px;
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  border-top: solid 3px #ef4c79;
}

.logo {
  justify-content: center;
  flex-basis: 45vw;
  min-width: 270px;
}

.logo-img {
  height: 70px;
  width: 265px;
}

.title-info {
  justify-content: center;
  flex-basis: 45vw;
  align-self: flex-end;
  flex-direction: column;
}

.title-info a {
  color: #323436;
  text-decoration: none;
  font-size: 0.875rem;
  padding: 0px 0px 0px 20px;
  flex-basis: 15vw;
}

.title-info a:hover {
  color: #ef4c79;
  text-decoration: #ef4c79 solid underline;
}

.layout-nav {
  height: 64px;
  min-width: 600px;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
}

.category-item {
  height: 100%;
  color: #999999;
  width: 100px;
  min-width: 60px;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
}

.category-item:hover {
  background-color: #ef4c79;
  font-weight: 800;
  color: #ffffff;
  text-decoration: #fff solid underline;
}

.category-item-current {
  background-color: #ef4c79;
  font-weight: 800;
  color: #ffffff;
}

.header {
  height: 64px;
  background-color: #323436;
}

.content {
  flex-direction: column;
  justify-content: center;
  background-color: #f0f1f1;
}

.footer {
  height: 10vh;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 1rem;
  background-color: #323436;
}
</style>
