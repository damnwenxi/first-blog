<template>
  <div class="article">
    <div id="title">
      <p id="author">
        <span id="author">
          <Icon type="ios-person-add"/>
        </span>
        由
        <router-link id="title_a" to="blogs/detail">{{blog.author}}</router-link>发布
        <span>&nbsp</span>
        最后编辑于
        <span>{{blog.last_change_time}}</span>
      </p>
      <Divider dashed/>
      <h1 class="title">
        {{blog.title}}
        <a href="javascript:void(0);">编辑</a>
        <a href="javascript:void(0);">删除</a>
      </h1>
    </div>

    <!-- <article id="text" v-html="blog.content">
    </article>-->
    <mavon-editor
      :toolbarsFlag="false"
      :ishljs="true"
      :editable="false"
      :boxShadow="false"
      :subfield="false"
      defaultOpen="preview"
      id="text"
      v-model="blog.content"
    />

    <Divider dashed/>
    <div class="comment"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      blog: {}
    };
  },
  created() {
    this.axios
      .get("/blogs?id=" + this.$route.query.id)
      .then(response => {
        this.blog = response.data;
      });
  }
};
</script>
<style scoped>
#title {
  max-height: 200px;
  box-shadow: 5px 5px 30px 10px #f0f0f0;
  width: 80%;
  padding: 20px;
  margin: 0 auto;
}
#text {
  min-height: 560px;
  border: 1px solid #eee;
  box-shadow: 5px 5px 30px 10px #f0f0f0;
  /* padding: 20px 30px; */
  margin: 20px auto;
  width: 80%;
}
.v-note-wrapper .v-note-panel{
  border:none !important;
}
#author {
  font-size: 16px;
}
#title .title {
  display: block;
  margin: 5px 0;
}
#title .title a {
  float: right;
  display: inline-block;
  font-size: 14px;
  margin-left: 20px;
}
a {
  color: rgb(175, 50, 60);
}
</style>
