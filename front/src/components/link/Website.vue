<template>
  <div id="website">
    <div id="option" style="margin:1em">
      <Input
        class="search"
        v-model="keywords"
        v-on:input="searchByWords"
        placeholder="搜索书签..."
        style="width: 300px"
      />
      <!-- <Button id="btn1" type="primary" @click="searchByWords">搜索</Button> -->

      <router-link to="/addweb">
        <Button id="btn2">添加书签</Button>
      </router-link>

      <div @mouseenter="show = true" @mouseleave="show = false" class="tip">
        <Icon type="md-ionic"/>提示
      </div>
    </div>

    <transition name="slide-fade">
      <div v-if="show" class="tip-box">
        <p>
          你可以点击添加书签按钮来分享你觉得还不错的网站。我们会为你分享的每一个记录生成一张精美的卡片，所有人都可以在这个网站上看到它，或者你也可以将卡片导出为图片以分享给你的朋友们(该功能正在开发中...)。每一张卡片的背景都是随机生成的，它们都来自我的另一个网站：
          <a
            href="http：//images.kkboom.cn"
            target="_blank"
          >http：//images.kkboom.cn</a>。需要的话，我们还为你们准备了api接口去获取这些图片的地址。PS：网站的所有图片均来自
          <a href>免费可商用的高清图库Pixabay。</a>
        </p>
      </div>
    </transition>

    <Divider dashed/>
    <Row justify="start" type="flex" class="code-row-bg">
      <Col :xs="24" :sm="24" :md="12" :lg="6" v-for="(item,index) in webForRow" :key="index">
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
      tempRow: [],
      show: false
    };
  },
  components: { Cardweb },
  methods: {
    searchByWords() {
      // 匹配非空字符
      var re = /\S+/;
      if (re.test(this.keywords)) {
        this.axios.get("/websites/search?k=" + this.keywords).then(res => {
          if (res.status == 200) {
            // 找到记录
            if (res.data.webs) {
              const item = res.data.webs;
              this.webForRow = item;
            } else {
              this.webForRow = [];
            }
          } else {
            this.$Notice.error({
              title: "服务器错误",
              desc: "服务器开小差啦，请稍后再试试"
            });
          }
        });
      } else {
        this.webForRow = this.tempRow;
      }
    }
  },
  created() {
    this.axios.get("/websites").then(res => {
      const webs = res.data.webs;
      this.webForRow = webs;
      // 设置一个临时变量用于存储第一次获取的值，避免每次输入关键词为空的时候发送无效请求
      this.tempRow = webs;
    });
  }
};
</script>

<style scoped>
#website {
  width: 100%;
  margin: 0 auto;
}

#btn2 {
  background-color: rgb(175, 50, 60);
  color: #f9f7f4;
}
#btn1,
#btn2 {
  margin-left: 10px;
  border: 1px solid rgb(175, 50, 60);
}

.tip {
  float: right;
  font-size: 1.6em;
}
.tip:hover {
  color: #9aa899;
  cursor: pointer;
}
.tip i {
  margin-top: -3px;
}

.tip-box {
  background-color: #f9f7f4;
  margin: 1em;
  padding: 1em;
  font-size: 1.6em;
  box-shadow: 5px 5px 10px #ccc;
}

.tip-box a {
  color: #ff6b6b;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
