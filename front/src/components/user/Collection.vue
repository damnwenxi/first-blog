<template>
  <div class="coolection">
    <Divider orientation="left">作品集</Divider>

    <div>
      <Row type="flex" justify="start" align="top">
        <!-- 临时文件仓库 -->
        <Col :xs="24" :sm="24" :md="12" :lg="8">
          <div class="collection-card">
            <a
              class="enter-tag"
              href="http://files.kkboom.cn"
              @mouseenter="show1 = true"
              @mouseleave="show1 = false"
              target="_blank"
            >
              <img src="../../assets/files.jpg" alt>

              <transition name="down">
                <p v-if="show1">一个在线文件暂存网站，它能帮你暂存一些小的文件，以便你在不同的设备之间下载它们。请不要上传任何私密文件，本站对由此造成的损失概不负责！</p>
              </transition>

              <div class="text">
                <h4>临时文件仓库</h4>
                <div style="float:left">
                  <span>
                    <Icon type="md-calendar"/>
                    <!-- <Time :time="time" type="date"/> -->
                    2019-12-12
                  </span>
                </div>

                <div class="vote" style="float:right">
                  <span>
                    <Icon type="md-eye"/>
                    <!-- {{website.view}} -->
                    123
                  </span>
                  <span>
                    <Icon @click.stop.prevent="handleLike()" type="ios-bookmark"/>
                    <!-- {{website.likes}} -->
                    123
                  </span>
                </div>
              </div>
            </a>
          </div>
        </Col>

        <!-- 中国电竞行业的产业化进程 -->
        <Col :xs="24" :sm="24" :md="12" :lg="8">
          <div class="collection-card">
            <a
              class="enter-tag"
              href="http://news.kkboom.cn"
              @mouseenter="show6 = true"
              @mouseleave="show6 = false"
              target="_blank"
            >
              <img src="../../assets/news.jpg" alt>

              <transition name="down">
                <p
                  v-if="show6"
                >这是一个基于原生JS和Echarts写的一个静态页面，也是一个比赛的参赛作品。作品内容反映中国电竞行业的产业化进程，涉及部分数据交互和文件下载操作。</p>
              </transition>

              <div class="text">
                <h4>电竞行业的产业化进程</h4>
                <div style="float:left">
                  <span>
                    <Icon type="md-calendar"/>
                    <!-- <Time :time="time" type="date"/> -->
                    2019-12-12
                  </span>
                </div>

                <div class="vote" style="float:right">
                  <span>
                    <Icon type="md-eye"/>
                    <!-- {{website.view}} -->
                    123
                  </span>
                  <span>
                    <Icon @click.stop.prevent="handleLike()" type="ios-bookmark"/>
                    <!-- {{website.likes}} -->
                    123
                  </span>
                </div>
              </div>
            </a>
          </div>
        </Col>

        <!-- 监控网站 -->
        <Col :xs="24" :sm="24" :md="12" :lg="8">
          <div class="collection-card">
            <a
              class="enter-tag"
              href="http://watch.kkboom.cn"
              @mouseenter="show2 = true"
              @mouseleave="show2 = false"
              target="_blank"
            >
              <img src="../../assets/watch.jpg" alt>
              <transition name="down">
                <p
                  v-if="show2"
                >一个基于jQ和Echarts的流量监控网站。做这个的原因是当时参加了一个活动，参赛作品需要投票支持，结果发现许多队伍有刷票的行为，于是做了一个网站来监控实时投票信息。后台是nodeJS写的，包括爬虫部分和服务端以及连接数据库，数据库用的是mysql。目前由于比赛结束已经停止数据收集，仅展示。</p>
              </transition>

              <div class="text">
                <h4>流量监控网站</h4>
                <div style="float:left">
                  <span>
                    <Icon type="md-calendar"/>
                    <!-- <Time :time="time" type="date"/> -->
                    2019-12-12
                  </span>
                </div>

                <div class="vote" style="float:right">
                  <span>
                    <Icon type="md-eye"/>
                    <!-- {{website.view}} -->
                    123
                  </span>
                  <span>
                    <Icon @click.stop.prevent="handleLike()" type="ios-bookmark"/>
                    <!-- {{website.likes}} -->
                    123
                  </span>
                </div>
              </div>
            </a>
          </div>
        </Col>

        <!-- 电竞报道统计 -->
        <Col :xs="24" :sm="24" :md="12" :lg="8">
          <div class="collection-card">
            <a
              class="enter-tag"
              href="http://kkboom.cn"
              @mouseenter="show7 = true"
              @mouseleave="show7 = false"
              target="_blank"
            >
              <img src="../../assets/report.jpg" alt>
              <transition name="down">
                <p
                  v-if="show7"
                >一个用nodeJS写的爬虫项目，每天定时的向各大新闻网站发送请求任务，获取相关新闻。整理后存入到数据库中，并在前端加载显示。PS：由于活动已停止，爬虫任务已在服务端停止，现仅提供展示功能。</p>
              </transition>

              <div class="text">
                <h4>电竞新闻爬虫</h4>
                <div style="float:left">
                  <span>
                    <Icon type="md-calendar"/>
                    <!-- <Time :time="time" type="date"/> -->
                    2019-12-12
                  </span>
                </div>

                <div class="vote" style="float:right">
                  <span>
                    <Icon type="md-eye"/>
                    <!-- {{website.view}} -->
                    123
                  </span>
                  <span>
                    <Icon @click.stop.prevent="handleLike()" type="ios-bookmark"/>
                    <!-- {{website.likes}} -->
                    123
                  </span>
                </div>
              </div>
            </a>
          </div>
        </Col>

        <!-- 高清图库 -->
        <Col :xs="24" :sm="24" :md="12" :lg="8">
          <div class="collection-card">
            <a
              class="enter-tag"
              href="http://images.kkboom.cn"
              @mouseenter="show8 = true"
              @mouseleave="show8 = false"
              target="_blank"
            >
              <img src="../../assets/images.jpg" alt>
              <transition name="down">
                <p
                  v-if="show8"
                >利用nodeJS爬虫定时爬取pixabay网站上的流行图片。提供了API支持，可以快速的批量获取指定数量的高清图片或缩略图，省去你挑选图片的时间。</p>
              </transition>

              <div class="text">
                <h4>高清图库</h4>
                <div style="float:left">
                  <span>
                    <Icon type="md-calendar"/>
                    <!-- <Time :time="time" type="date"/> -->
                    2019-12-12
                  </span>
                </div>

                <div class="vote" style="float:right">
                  <span>
                    <Icon type="md-eye"/>
                    <!-- {{website.view}} -->
                    123
                  </span>
                  <span>
                    <Icon @click.stop.prevent="handleLike()" type="ios-bookmark"/>
                    <!-- {{website.likes}} -->
                    123
                  </span>
                </div>
              </div>
            </a>
          </div>
        </Col>

        <!-- 视频播放器 -->
        <Col :xs="24" :sm="24" :md="12" :lg="8">
          <div class="collection-card">
            <a
              class="enter-tag"
              href="http://demo.kkboom.cn/video.html"
              @mouseenter="show3 = true"
              @mouseleave="show3 = false"
              target="_blank"
            >
              <img src="../../assets/video.jpg" alt>
              <transition name="down">
                <p v-if="show3">一个用原生JS写的在线视频播放组件，能加载本地资源和网络资源并播放。</p>
              </transition>

              <div class="text">
                <h4>视频播放器</h4>
                <div style="float:left">
                  <span>
                    <Icon type="md-calendar"/>
                    <!-- <Time :time="time" type="date"/> -->
                    2019-12-12
                  </span>
                </div>

                <div class="vote" style="float:right">
                  <span>
                    <Icon type="md-eye"/>
                    <!-- {{website.view}} -->
                    123
                  </span>
                  <span>
                    <Icon @click.stop.prevent="handleLike()" type="ios-bookmark"/>
                    <!-- {{website.likes}} -->
                    123
                  </span>
                </div>
              </div>
            </a>
          </div>
        </Col>

        <!-- 日历待办 -->
        <Col :xs="24" :sm="24" :md="12" :lg="8">
          <div class="collection-card">
            <a
              class="enter-tag"
              href="http://demo.kkboom.cn/clander.html"
              @mouseenter="show4 = true"
              @mouseleave="show4 = false"
              target="_blank"
            >
              <img src="../../assets/clander.jpg" alt>
              <transition name="down">
                <p v-if="show4">基于原生JS写的一个日历待办小组件。</p>
              </transition>

              <div class="text">
                <h4>日历待办</h4>
                <div style="float:left">
                  <span>
                    <Icon type="md-calendar"/>
                    <!-- <Time :time="time" type="date"/> -->
                    2019-12-12
                  </span>
                </div>

                <div class="vote" style="float:right">
                  <span>
                    <Icon type="md-eye"/>
                    <!-- {{website.view}} -->
                    123
                  </span>
                  <span>
                    <Icon @click.stop.prevent="handleLike()" type="ios-bookmark"/>
                    <!-- {{website.likes}} -->
                    123
                  </span>
                </div>
              </div>
            </a>
          </div>
        </Col>

        <!-- 3D翻转相册 -->
        <Col :xs="24" :sm="24" :md="12" :lg="8">
          <div class="collection-card">
            <a
              class="enter-tag"
              href="http://demo.kkboom.cn/3dimg.html"
              @mouseenter="show5 = true"
              @mouseleave="show5 = false"
              target="_blank"
            >
              <img src="../../assets/3dimg.jpg" alt>
              <transition name="down">
                <p
                  v-if="show5"
                >基于原生JS写的一个3D动画相册，通过向pixabay发送请求获得随机的网络资源图片。Pixabay是一个免费可商用的高清图库网站，非常感谢该网站提供的高清图片。</p>
              </transition>

              <div class="text">
                <h4>3D动画相册</h4>
                <div style="float:left">
                  <span>
                    <Icon type="md-calendar"/>
                    <!-- <Time :time="time" type="date"/> -->
                    2019-12-12
                  </span>
                </div>

                <div class="vote" style="float:right">
                  <span>
                    <Icon type="md-eye"/>
                    <!-- {{website.view}} -->
                    123
                  </span>
                  <span>
                    <Icon @click.stop.prevent="handleLike()" type="ios-bookmark"/>
                    <!-- {{website.likes}} -->
                    123
                  </span>
                </div>
              </div>
            </a>
          </div>
        </Col>
      </Row>
    </div>

    <br>
    <h4>
      努力更新完善中...(PS:如果你觉得有什么地方不足或者有更好的建议的话，欢迎
      <a href="http://localhost:9002/collection#/about">和我联系</a>^_^)
    </h4>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show7: false,
      show8: false
    };
  },
  methods: {
    handleLike() {
      alert("aa");
    }
  }
};
</script>

<style scoped>
.collection-card {
  position: relative;
  width: 90%;
  min-height: 300px;
  max-height: 400px;
  margin: 1em auto;
  box-shadow: 5px 10px 10px #;
}
.collection-card img {
  max-height: 400px;
  min-height: 300px;
  width: 100%;
  overflow: hidden;
}
.collection-card a {
  color: #bbb !important;
}

.collection-card a:hover {
  color: #fff !important;
}
.text {
  left: 1em;
  right: 1em;
  position: absolute;
  bottom: 1em;
}
.text span {
  margin-right: 5px;
}
i {
  margin-top: -3px;
}

.vote {
  z-index: 2;
}

h4 a {
  color: #444;
}

h4 {
  margin: 1em;
}
.collection-card p {
  font-size: 1.4em;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  color: #444;
  font-weight: 500;
  line-height: 1.6em;
  padding: 1em;
  bottom: 2em;
  margin-bottom: 3em;
  background-color: rgba(255, 255, 255, 0.7);
}

/* 动画 */
.down-enter-active,
.down-leave-active {
  transition: opacity 0.5s;
}
.down-enter, .down-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
