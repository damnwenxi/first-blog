<template>
  <div id="aboutme">
    <div>
      <h3>About Me</h3>
      <div style="width:100%">
        <p style="float:left">一名前端开发的自我修养</p>
        <p style="float:right">关于我</p>
      </div>
    </div>

    <div class="bg-img">
      <div class="introduction">
        <p class="info">
          <Icon type="md-list"/>姓名：柯锋
        </p>
        <p class="info">
          <Icon type="md-calendar"/>生日：1998.10.26
        </p>
        <p class="info">
          <Icon type="md-school"/>学历：湖北大学（计算机科学与技术）
        </p>
        <p class="info">
          <Icon type="md-call"/>电话：17362752315
        </p>
        <p class="info">
          <Icon type="md-mail"/>邮箱：1396956549@qq.com
        </p>
        <p class="info">
          <Icon type="ios-hammer"/>主要技术栈：Node.js&Vue
        </p>
        <br>
        <p>个人能力：</p>
        <p>1.熟练使用JavaScript语言，掌握ES6语法、HTML5、CSS3、JSON、ajax等相关技术; 2.熟练使用jquery、bootstrap等前端框架; 3.熟练使用Vue、Vuex、Vue-Router，对vue的生命周期、组件通信、数据绑定有一定理解; 4.对JavaScript相关知识诸如闭包、原型、跨域、性能优化等有一定的理解; 5.理解MVP、MVC、MVVC等框架的思想; 6.对用户体验、交互操作流程、及用户需求有一定了解，能进行必要的交互设计; 7.掌握Node.js的使用，熟练使用node爬虫工具，能编写常用的接口，如注册登录、数据验证、文件上传等; 8.熟悉linux基本操作;</p>
      </div>

      <div class="personal">
        <img id="avatar" src="../../assets/avatar.png" alt>
        <h2>solotor</h2>
        <p>永远年轻 永远热泪盈眶</p>

        <img v-if="showQQ" class="code" src="../../assets/qqcode.jpg" alt="QQ二维码">
        <img v-if="showWX" class="code" src="../../assets/wxcode.jpg" alt="微信二维码">

        <ul>
          <li>
            <a href="https://github.com/Kefeng2017">
              <img src="../../assets/github.png" alt="github地址">
            </a>
            <br>
            <a href>GitHub</a>
          </li>
          <li>
            <a href="https://www.weibo.com/u/5785591031">
              <img src="../../assets/weibo.png" alt="微博链接">
            </a>
            <b></b>
            <a href>微博</a>
          </li>
          <li @mouseleave="BothHide" @mouseover="QqControl">
            <a v- id="qq" href="#">
              <img src="../../assets/qq.png" alt="QQ">
            </a>
            <br>
            <a href="#">QQ</a>
          </li>
          <li @mouseleave="BothHide" @mouseover="WxControl">
            <a id="weixin" href="#">
              <img src="../../assets/weixin.png" alt="微信">
            </a>
            <br>
            <a href="#">微信</a>
          </li>
        </ul>
      </div>
      <div style="clear:both"></div>
    </div>

    <div style="margin-top:2em;">
      <h3 style="margin-top:2em">关于本站</h3>
      <Divider dashed/>
      <p class="info" style="color:#2c3e50">本站技术栈：Node.js+Vue+MongoDB，前端UI：iView，后端框架：Koa2</p>
      <br>
      <p
        class="info"
        style="color:#2c3e50"
      >起初是在B站看到一个up主在分享自己的工作经历，里面有提到Hexo这款一键部署个人博客网站的框架，自己照着官方文档试了一下，有许多主题确实非常的简介美观，但是也有许多不方便的地方。比如用Hexo发布只能是在本地编辑好markdown文档再放到Hexo服务端的指定文件夹下，这样才能渲染出来。并且markdown里面要插入图片的话还得是网络资源，这是不符合我的需求的，于是就萌生了自己写一个博客网站的想法，能在线编辑markdown并且上传本地图片，并且能管理这些内容。正好当时学了有Node.js和Vue，又接触到了mongoDB。后面又去了解了一下markdown的相关知识，然后就一步步从设计数据库、搭建后端框架（Koa）、写接口、调试、前端结构搭建、写组件、最后连调、部署发布。这个过程并不是连续的，中间也有帮助朋友写了两个基于Vue和Node和Mysql的小应用，也有一些学业上的事情。断断续续这个应用写了两个多月，最终才部署上线。期间也有一些有意思的想法，我也放到了网站上用于丰富网站内容。比如那个共享书签，平时网络上遇到的一些好的资源网站我会保存在上面，还有临时文件仓库等。下一个想法是做一个踩坑记录，用来记录平时开发中遇到的疑难杂症。</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showQQ: false,
      showWX: false
    };
  },
  methods: {
    QqControl() {
      this.showQQ = true;
      this.showWX = false;
    },
    WxControl() {
      this.showQQ = false;
      this.showWX = true;
    },
    BothHide() {
      this.showQQ = false;
      this.showWX = false;
    }
  }
};
</script>

<style scoped>
#aboutme .bg-img {
  margin-top: 3em;
  width: 100%;
  box-shadow: 5px 5px 30px 10px #d7d7d7;
  border-radius: 0.5em;
  height: auto;
  background-image: url("../../assets/about.jpg");
  height: 550px;
  background-size: 100%;
}

.introduction {
  padding: 5em;
  width: 70%;
  height: 100%;
  float: left;
  /* background-color: #eee; */
}
.introduction p,
.info {
  font-size: 1.4em;
  font-weight: 600;
  color: #fff;
  border-left: 5px solid rgb(201, 160, 114);
  margin-bottom: 0.5em;
  padding-left: 5px;
  line-height: 2em;
}
.introduction p i {
  margin-top: -3px;
  margin-right: 5px;
  color: rgb(201, 160, 114);
}
.personal {
  position: relative;
  text-align: center;
  /* background-color: #fff; */
  width: 30%;
  height: 100%;
  float: right;
  padding: 5em 0;
  color: #fff;
  font-weight: 600;
}

#avatar {
  width: 90px;
  height: 90px;
  border-radius: 45px;
  border: 5px solid #fff;
}
.code {
  border: 5px solid #fff;
  max-width: 120px;
  max-height: 120px;
  margin: 0 auto;
  display: block;
}
.personal h2 {
  line-height: 3em;
  font-weight: 700;
}

.personal p {
  line-height: 2em;
  font-size: 1.4em;
}

.personal ul {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5em;
  display: flex;
  align-content: space-between;
  width: 80%;
  margin: 0 auto;
}

.personal ul li {
  width: 50px;
  display: inline-block;
  margin: 0 auto;
}

.personal ul li a {
  color: #fff;
}

.personal ul li img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #fff;
}
</style>
