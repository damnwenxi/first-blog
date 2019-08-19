<template>
  <div id="tem" style="background:#eee;">
    <Card :bordered="false" class="card bg-opacity" ref="card">
      <div style="position:absolute; left:1em; right:1em;">
        <h4 slot="title">
          <a :href="website.url" @click="viewIt(website._id)" target="_blank">
            <Icon type="md-link" />
            {{website.title}}
          </a>

          <Icon type="ios-information-circle-outline" v-if="website.note" />
        </h4>
        <br />
        <p>由{{website.user}}分享</p>
        <a :href="website.url" target="_blank">
          <!-- <img src="../../assets/default.png" :alt="website.title"> -->
          <img :alt="website.title" :onerror="defaultImg" :src="website.cover" />
        </a>
        <p>{{website.info}}</p>
      </div>
      <p class="link">
        <a :href="website.url" @click="viewIt(website._id)" target="_blank">{{website.url}}</a>
      </p>
      <div id="icons">
        <div style="float:left">
          <span>
            <Icon type="md-calendar" />
            <Time :time="time" type="date" />
          </span>
        </div>

        <div class="vote" style="float:right">
          <span>
            <Icon :class="{voted:viewd}" type="md-eye" />
            {{website.view}}
          </span>
          <span @click="voteIt(website._id)">
            <Icon :class="{voted:liked}" type="md-heart" />
            {{website.likes}}
          </span>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
export default {
    props: ['website', 'index'],
    data() {
        return {
            time: this.website.c_date,
            viewd: false,
            liked: false,
            defaultImg:
                'this.src="' + require('../../assets/default.png') + '"',
            bgc_img: ''
        }
    },
    mounted() {
        this.$refs.card.$el.style.backgroundImage = 'url(' + this.bgc_img + ')'
    },
    methods: {
        voteIt(id) {
            this.axios.get('/websites/vote?id=' + id).then(res => {
                if (res.status == 200) {
                    this.$Message.success(res.data.msg)
                    this.website.likes += 1
                    this.liked = true
                }
            })
        },
        viewIt(id) {
            this.axios.get('/websites/view?id=' + id).then(res => {
                if (res.status == 200) {
                    this.website.view += 1
                    this.viewd = true
                }
            })
        }
    },
    created() {
        const list = window.localStorage.getItem('imgStr').split(',')
        this.bgc_img = list[this.index]
    }
}
</script>

<style scoped>
.link {
    position: absolute;
    bottom: 5em;
    left: 0;
    right: 0;
}
.voted {
    color: #ff6b6b !important;
}
h4 i:hover {
    cursor: pointer;
    color: rgb(175, 50, 60);
}

.card p a:hover,
.vote i:hover {
    color: rgb(175, 50, 60);
    cursor: pointer;
}
.card {
    background-repeat: no-repeat;
    background-size: cover;
    color: #ccc;
    border-radius: 0 !important;
    border: none !important;
    position: relative;
    height: 320px;
    margin-bottom: 1em;
    box-shadow: 0 0 30px #222;
}

.card:hover {
    transform: scale(1.05);
    -ms-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -webkit-transform: scale(1.05);
    -o-transform: scale(1.05);
}
i {
    margin-top: -3px;
}
#tem {
    box-sizing: border-box;
    margin: 0.5em 1em;
}
#icons {
    color: #fff;
    left: 0;
    right: 0;
    position: absolute;
    bottom: 0;
    padding: 1em;
    background-color: rgba(0, 0, 0, 0.5);
}
#icons span {
    margin-right: 5px;
}
img {
    display: block;
    margin: 30px auto;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    border: 5px solid #fff;
    background-color: rgba(0, 0, 0, 0.5);
    /* box-shadow: 0 0 10px #777; */
}

img:hover {
    cursor: pointer;
}

p {
    text-align: center;
}

.bg-opacity::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
