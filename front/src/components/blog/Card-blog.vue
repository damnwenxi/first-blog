<template>
  <div id="card-box">
    <Card class="card" :bordered="false">
      <p id="title" slot="title">
        <span id="author">
          <Icon type="ios-person-add"/>
          {{summary.author}}
        </span>

        <span @click="viewIt(summary._id)">
        <router-link id="title_a" :to="{name:'detail',query:{id:summary._id}}">{{summary.title}}</router-link>
        </span>
      </p>
      <p id="context">
        <span class="red">摘要：</span>
        {{summary.summary}}
        <span @click="viewIt(summary._id)">
        <router-link class="red" :to="{name:'detail',query:{id:summary._id}}">...【详情】</router-link>
        </span>
      </p>
      <div id="icons">
        <div class="left">
          <span>
            <Icon type="md-calendar"/>
            <Time :time="time" type="datetime"/>
          </span>
        </div>
        <div class="right">
          <span>
            <Icon :class="{voted:viewd}" type="md-eye"/>
            {{summary.view}}
          </span>
          <span>
            <Icon :class="{voted:liked}" @click="voteIt(summary._id)" type="ios-thumbs-up"/>
            {{summary.likes}}
          </span>
          <span>
            <Icon type="ios-text"/>0
          </span>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
export default {
  props: ["summary"],
  data() {
    return {
      blog: this.summary,
      time: this.summary.c_date,
      viewd: false,
      liked: false
    };
  },
  methods: {
    voteIt(id) {
        console.log(this.summary);
      this.axios.get("/blogs/vote?id=" + id).then(res => {
        if (res.status == 200) {
          this.$Message.success(res.data.msg);
          this.summary.likes += 1;
          this.liked = true;
        }
      });
    },
    viewIt(id) {
      this.axios.get("/blogs/view?id=" + id).then(res => {
        if (res.status == 200) {
          this.summary.view += 1;
          this.viewd = true;
        }
      });
    }
  }
};
</script>

<style scoped>
#card-box {
  width: 100%;
  margin: 25px auto;
}

.voted{
  color: #FF6B6B !important;
}
.card {
  max-height: 200px;
  border-radius: 10px;
}
i {
  margin-top: -3px;
}
#title {
  text-align: justify;
}
#context {
  margin-bottom: 36px;
  display: block;
}
#context .red {
  color: rgb(175, 50, 60);
}
#title a {
  color: rgb(175, 50, 60);
}
#author {
  width: 30%;
  display: inline-block;
}
#title_a {
  max-width: 40%;
}
#author i {
  font-size: 18px;
}

#icons {
  width: 100%;
  display: block;
  position: absolute;
  bottom: 10px;
}
#icons .left {
  float: left;
  margin-left: 0px;
}

#icons .right {
  margin-right: 32px;
  float: right;
}
.right i:hover{
    cursor: pointer;
    color: rgb(175, 50, 60);
}
#icons .right span {
  margin-left: 20px;
}
</style>
