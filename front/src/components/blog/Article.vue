<template>
  <div class="article">
    <div class="title-wrap">
      <div class="layer"></div>
      <h1 class="title">
        <Icon type="ios-pulse" />
        {{blog.title}}
      </h1>

      <p class="author">
        <Icon type="md-clipboard" />
        Author:{{blog.author}}&nbsp;|&nbsp;
        <Icon type="md-calendar" />
        Edit At:
        {{time}}
      </p>

      <!-- <p>
        <router-link :to="{name:'edit',query:{id:blog._id}}">编辑</router-link>
        <a href="javascript:void(0);">删除</a>
      </p>-->
    </div>

    <mavon-editor
      :boxShadow="false"
      :editable="false"
      :ishljs="true"
      :subfield="false"
      :toolbarsFlag="false"
      class="text"
      defaultOpen="preview"
      v-model="blog.content"
    />
    <div class="comment"></div>

    <div class="back-top">
      <a href="#top">
        <Icon type="ios-arrow-dropup" />
      </a>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            blog: {},
            time: ''
        }
    },
    created() {
        this.axios.get('/blogs?id=' + this.$route.query.id).then(response => {
            this.blog = response.data
            // console.log(response.data);
            var time = response.data.last_change_time
            var date = new Date(time).toLocaleString()
            this.time = date
        })
    }
}
</script>
<style lang="scss" scoped>
.title-wrap {
    width: 100%;
    height: 480px;
    margin: 0 auto;
    background-image: url(../../assets/nginx.jpg);
    background-size: cover;
    text-align: center;
    position: relative;

    .layer {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        top: 0;
        left: 0;
        bottom: 0;
        top: 0;
    }

    .title {
        position: absolute;
        width: 100%;
        height: 80px;
        line-height: 80px;
        color: #fff;
        font-size: 40px;
        top: 0;
        margin-top: -40px;
        animation-name: fadeDown;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
    }
    @keyframes fadeDown {
        0% {
            top: 0;
            opacity: 0;
        }
        100% {
            top: 50%;
            opacity: 1;
        }
    }

    @keyframes fadeUp {
        0% {
            bottom: -56px;
            opacity: 0;
        }
        100% {
            bottom: 56px;
            opacity: 1;
        }
    }

    .author {
        position: absolute;
        width: 100%;
        bottom: 56px;
        font-size: 14px;
        color: #fff;
        animation-name: fadeUp;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
    }
}

// markdown自定义样式
.text {
    max-width: 960px;
    margin: 1em auto;
    z-index: 0;
}

.back-top {
    position: fixed;
    bottom: 48px;
    right: 48px;
    font-size: 36px;
    a {
        font-weight: 900;
        color: #444;
    }
}
</style>