<template>
  <div class="container">
    <Tabs class="tabs">
      <TabPane :key="item.name" v-for="item in tabsList" :label="item.name">
        <div class="tab-content">
          <a :key="data.name" :href="data.href" v-for="data in item.content">
            {{data.name}}
          </a>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  name: 'TabsItem',
  props: ['tabsList']
}
</script>

<style scoped>
.container {
  margin: 15px auto 20px auto;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  width: 65vw;
}

.tabs {
  background-color: #fff;
}

.tab-content {
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  height: 3rem;
}

.tab-content a {
  display: -webkit-flex;
  display: flex;
  flex-basis: 6rem;
  color: #323436;
  font-size: 0.875rem;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
}

.tab-content a:hover {
  color: #ef4c79;
  text-decoration: #ef4c79 solid underline;
}
</style>
