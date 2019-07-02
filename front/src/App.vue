<template>
  <div id="app">
    <Header v-if="isRouterAlive" :key="$route.fullPath"></Header>
    <div class="center">
      <router-view v-if="isRouterAlive" />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  data() {
    return {
      isRouterAlive: true
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  components: { Header, Footer },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  },
  created() {
    // 在线时间更新
    this.axios
      .get({
        method: "get",
        url: "/login/valid",
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(response => {
        if (response.data.user) {
          this.$Message.success("登录成功!");
          // 将用户信息传递给bus事件总线，然后再传递到header
          window.localStorage.setItem("user", response.data.user.name);
          // 登录成功保存token到localstorage
          window.localStorage.setItem("token", response.data.token);
          this.$router.push({ path: "/" });
        } else {
          this.$Message.error(response.data.msg);
        }
      });
  }
};
</script>

<style>
#app {
  box-sizing: border-box;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
label {
  margin-bottom: 0 !important;
}
a {
  color: #2c3e50;
}
a:hover {
  color: rgb(175, 50, 60);
}
html,
body {
  width: 100%;
  font-size: 10px !important;
}
#btn1 {
  background-color: rgb(175, 50, 60);
}
#btn1,
#btn2 {
  border: 1px solid rgb(175, 50, 60);
}
.center {
  max-width: 1080px;
  margin: 90px auto 0;
  min-height: 100%;
}
.article img {
  border: 5px solid #fff !important;
  border-radius: 5px !important;
  max-width: 100%;
  display: block;
  max-height: 500px !important;
  width: auto;
  margin: 5px auto !important;
}
.v-note-wrapper .v-note-panel {
  border: none !important;
}

/* 清除浮动 */
.clearfix {
  clear: both;
}

/* 移动端适配 媒体查询 */
@media (max-width: 540px) {
  .nav_right {
    display: none;
  }

  #website .tip {
    display: none;
  }

  #website .search {
    width: 100% !important;
  }

  #btn2 {
    width: 100% !important;
    margin: 5px 0 !important;
  }

  .phone-nav {
    height: 70px !important;
    line-height: 70px !important;
    display: block !important;
  }

  .ivu-menu-light {
    background: none !important;
  }
  .ivu-menu-horizontal {
    height: 70px !important;
    line-height: 70px !important;
  }
}
</style>
