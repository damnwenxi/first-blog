<template>
  <div id="tem" style="background:#eee;">
    <Card class="card" :bordered="false">
      <h4 slot="title">
        <a :href="website.url" target="_blank">
          <Icon type="md-link"/>
          {{website.title}}
        </a>
        
        <Icon v-if="website.note" type="ios-information-circle-outline" />
      </h4>
      <p>由{{website.user}}分享</p>
      <img :src="website.cover" :alt="website.title">
      <p>{{website.info}}</p>
      <p class="link">
        <a :href="website.url" target="_blank">{{website.url}}</a>
      </p>
      <div id="icons">
        <div style="float:left">
          <span>
            <Icon type="md-calendar"/>
            <Time :time="time" type="date"/>
          </span>
        </div>

        <div class="vote" style="float:right">
          <span>
            <Icon type="md-eye"/>
            {{website.view}}
          </span>
          <span>
            <Icon type="ios-bookmark"/>
            {{website.likes}}
          </span>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
export default {
  props: ["website"],
  data() {
    return {
      time: this.website.c_date
    };
  }
};
</script>

<style scoped>
.link{
    position: absolute;
    bottom: 4em;
    left: 0;
    right: 0;
}
h4 i:hover{
    cursor: pointer;
    color: rgb(175, 50, 60);
}
.card p a{
    color:rgb(175, 50, 60);
}
.card p a:hover,.vote i:hover{
    color: rgb(175, 50, 60);
    cursor: pointer;
}
.card {
  position: relative;
  height: 320px;
  margin-bottom: 1em;
}
i {
  margin-top: -3px;
}
#tem {
  box-sizing: border-box;
  margin: 0.5em 1em;
}
#icons {
    left: 1em;
    right: 1em;
    position: absolute;
    bottom: 1em;
}
#icons span {
  margin-right: 5px;
}
img {
  display: block;
  margin: 30px auto;
  width: 32px;
  height: 32px;
}

p {
  text-align: center;
}
</style>
