<template>
  <div id="blog">
    <Row type="flex" justify="space-around">
      <Col :xs="24" :sm="24" :md="16" :lg="18">
        <Input
          style="z-index:0"
          v-model="keyWords"
          v-on:input="search"
          search
          placeholder="关键字搜索..."
        />
        <hr style="margin:10px 0" />
        <h4 v-if="keyWords">匹配记录：{{blogs.length}} 条。</h4>
        <br />
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

    <p style="text-align:center">
      <Page :total="all" :page-size="10" :current="page" @on-change="pageJump" />
    </p>
    <a ref="top" href="#app" style="display:none">top</a>
  </div>
</template>

<script>
import Cardblog from "./Card-blog";
export default {
  data() {
    return {
      all: 100,
      page: 1,
      blogs: [],
      tempblogs: [],
      length: 0,
      keyWords: "",
      allblogs: []
    };
  },
  components: { Cardblog },
  created() {
    this.axios.get("/blogs?page=1").then(response => {
      this.blogs = response.data.blogs;
      // console.log(response.data);
      this.tempblogs = response.data.blogs;
      this.all = parseInt(response.data.count);
      this.allblogs.push(response.data.blogs);
    });
  },
  methods: {
    getBlogs(page) {
      // 有缓存，先走缓存
      if (this.allblogs[page]) {
        this.blogs = this.allblogs[page - 1];
        this.$refs.top.click();
        this.tempblogs = this.allblogs[page - 1];
      } else {
        this.axios.get("/blogs?page=" + page).then(response => {
          this.blogs = response.data.blogs;
          this.allblogs.push(response.data.blogs);
          // console.log(response.data);
          this.tempblogs = response.data.blogs;
          this.total = response.data.count;
          this.$refs.top.click();
        });
      }
    },
    pageJump(i) {
      this.page = i;
      this.getBlogs(i);
    },
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

#blog {
  margin: 0 1em;
}
</style>
