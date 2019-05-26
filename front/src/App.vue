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

import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  data(){
    return{
      isRouterAlive:true
    }
  },
  provide(){
    return{
      reload:this.reload
    }
  },
  components:{Header,Footer},
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(()=>{
        this.isRouterAlive = true;
      })
    }
  }
}
</script>

<style>
#app {
  height: 100%;
  box-sizing: border-box;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
label{
  margin-bottom: 0 !important;
}
a{
  color: #2c3e50 !important;
}
a:hover{
  color: rgb(175, 50, 60) !important;
}
html,body{
  width: 100%;
  height: 100%;
  font-size: 10px !important;
}
#btn1 {
  background-color: rgb(175, 50, 60);
}
#btn1,
#btn2 {
  border: 1px solid rgb(175, 50, 60);
}
.center{
  max-width: 1080px;
  margin: 90px auto 0;
  min-height: 100%;
}
.article img{
  border: 5px solid #fff !important;
  border-radius: 5px !important;
  max-width: 100%;
  display: block;
  max-height: 500px !important;
  width: auto;
  margin: 5px auto !important;
}
.v-note-wrapper .v-note-panel{
  border: none !important;
}
</style>
