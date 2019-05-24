<template>
  <div id="website">
    <div id="option" style="margin:1em">
      <Input v-model="keywords" v-on:input="searchByWords" placeholder="搜索书签..." style="width: 300px"/>
      <Button id="btn1" type="primary" @click="searchByWords">搜索</Button>
      <router-link to="/addweb">
        <Button id="btn2">添加书签</Button>
      </router-link>
    </div>

    <Divider dashed/>
    <Row 
      justify="start"
      type="flex"
      class="code-row-bg"
      v-for="(row,index) in webForRow"
      :key="index"
    >
      <Col span="6" v-for="(item,index) in row" :key="index">
        <Cardweb :website="item"></Cardweb>
      </Col>
    </Row>
    <!-- 无匹配结果 -->
    <div v-if="!webForRow.length">
      <h4>没有相关书签</h4>
    </div>
  </div>
</template>

<script>
import Cardweb from "./Card-web";

export default {
  data() {
    return {
      webForRow: [],
      keywords: "",
      tempRow: []
    };
  },
  components: { Cardweb },
  methods: {
    searchByWords() {
      // 匹配非空字符
      var re = /\S+/;
      if (re.test(this.keywords)) {
        this.axios.get("/websites/search?k=" + this.keywords).then(res => {
          if(res.status == 200){
            // 找到记录
            if(res.data.webs){
              const item = [res.data.webs];
              this.webForRow = item;
            }else{
              this.webForRow = [];
            }
          }else{
            this.$Notice.error({
              title: "服务器错误",
              desc: "服务器开小差啦，请稍后再试试"
            });
          }
        });
      }else{
        this.webForRow = this.tempRow;
      }
    }
  },
  created() {
    this.axios.get("/websites").then(res => {
      const webs = res.data.webs;
      for (var i = 0; i < webs.length; i += 4) {
        this.webForRow.push(webs.slice(i, i + 4));
        // 设置一个临时变量用于存储第一次获取的值，避免每次输入关键词为空的时候发送无效请求
        this.tempRow.push(webs.slice(i, i + 4));
      }
    });
  }
};
</script>

<style scoped>
#website {
  width: 100%;
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
