<template>
  <div id="blog">
    <Row type="flex" justify="space-around">
      <Col :xs="24" :sm="24" :md="16" :lg="18">
        <Input v-model="keyWords" v-on:input="search" search placeholder="关键字搜索..."/>
        <hr style="margin:10px 0">
        <h4 v-if="keyWords">匹配记录：{{blogs.length}} 条。</h4>
        <br>
      </Col>
    </Row>

    <Row
      type="flex"
      justify="space-around"
      class="code-row-bg"
      v-for="(blog,index) in this.blogs"
      :key="index"
    >
      <Col :xs="24" :sm="24" :md="16" :lg="18">
        <Cardblog :summary="blog"></Cardblog>
      </Col>
    </Row>
  </div>
</template>

<script>
import Cardblog from "./Card-blog";
export default {
  data() {
    return {
      blogs: [],
      tempblogs: [],
      length: 0,
      keyWords: ""
    };
  },
  components: { Cardblog },
  created() {
    this.axios.get("/blogs").then(response => {
      this.blogs = response.data;
      // console.log(response.data);
      this.tempblogs = response.data;
    });
  },
  methods: {
    search() {
      var re = /\S+/;
      if (re.test(this.keyWords)) {
        this.axios.get("/blogs/search?k=" + this.keyWords).then(res => {
          if (res.status == 200) {
            // 找到记录
            if (res.data.blogs) {
              const items = res.data.blogs;
              this.blogs = items;
            } else {
              this.blogs = [];
            }
          } else {
            this.$Notice.error({
              title: "服务器错误",
              desc: "服务器开小差啦，请稍后再试试"
            });
          }
        });
      } else {
        this.blogs = this.tempblogs;
      }
    }
  }
};
</script>

<style scoped>
#tip {
  margin-top: 20px;
  margin-bottom: 50px;
  min-height: 100%;
}
</style>
