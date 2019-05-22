<template>
  <div id="blog">
      <Row type="flex" justify="space-around" class="code-row-bg" v-for="(blog,index) in this.blogs" :key="index">
        <Col span="18">
          <Cardblog :summary=blog></Cardblog>
        </Col>
      </Row>
  </div>
</template>

<script>
import Cardblog from "./Card-blog";
export default {
  data(){
      return {
          blogs:[]
      }
  },
  components: { Cardblog },
  created() {
    this.axios.get("/blogs").then(response => {
      this.blogs = response.data;
    });
  }
};
</script>

<style scoped>
#tip {
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>
