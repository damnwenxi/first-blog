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
        <!-- blog.last_change_time -->
        <span>{{time}}</span>
      </p>
      <Divider dashed/>
      <h1 class="title">
        {{blog.title}}
        <router-link :to="{name:'edit',query:{id:blog._id}}">编辑</router-link>
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
    <div class="comment"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      blog: {},
      time: ""
    };
  },
  created() {
    this.axios.get("/blogs?id=" + this.$route.query.id).then(response => {
      this.blog = response.data;
      // console.log(response.data);
      var time = response.data.last_change_time;
      var date = new Date(time).toLocaleString();
      this.time = date;
    });
  }
};
</script>
<style scoped>
#title {
  max-height: 200px;
  box-shadow: 5px 5px 30px 10px #f0f0f0;
  padding: 20px;
  margin: 0 auto;
}
#text {
  min-height: 560px;
  box-shadow: 5px 5px 30px 10px #f0f0f0;
  /* padding: 20px 30px; */
  margin: 20px auto;
}
.v-note-wrapper .v-note-panel {
  border: none !important;
}
#author {
  font-size: 1.4em;
}
#title .title {
  display: block;
  margin: 5px 0;
  border-left: 5px solid rgb(175, 50, 60);
  padding-left: 1em;
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
