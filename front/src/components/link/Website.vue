<template>
  <div id="website">
    <div id="option" style="width:60%;margin:20px auto">
      <Input placeholder="搜索书签..." style="width: 300px"/>
      <Button id="btn1" type="primary">搜索</Button>
      <router-link to="/addweb"><Button id="btn2">添加书签</Button></router-link>
    </div>
    <Divider dashed/>
    <Row
      type="flex"
      justify="space-around"
      class="code-row-bg"
      v-for="(row,index) in webForRow"
      :key="index"
    >
      <Col span="6" v-for="(item,index) in row" :key="index">
        <Cardweb :website="item"></Cardweb>
      </Col>
    </Row>
  </div>
</template>

<script>
import Cardweb from "./Card-web";

export default {
  data() {
    return {
      webForRow: []
    };
  },
  components: { Cardweb },
  methods: {},
  created() {
    this.axios.get("/websites").then(res => {
      const webs = res.data.webs;
      for (var i = 0; i < webs.length; i += 3) {
        this.webForRow.push(webs.slice(i, i + 3));
      }
    });
  }
};
</script>

<style scoped>
#website {
  width: 80%;
  margin: 0 auto;
}

#btn1 {
  background-color: rgb(175, 50, 60);
}
#btn1,
#btn2 {
  margin-left: 10px;
  border: 1px solid rgb(175, 50, 60);
}
</style>
