<template>
  <div id="app">
    <transition name="slide-fade">
      <Header :key="$route.fullPath" v-if="showHeader"></Header>
    </transition>

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
    data() {
        return {
            isRouterAlive: true,
            showHeader: true,
            scrollTop: 0
        }
    },
    provide() {
        return {
            reload: this.reload
        }
    },
    components: { Header, Footer },
    methods: {
        reload() {
            this.isRouterAlive = false
            this.$nextTick(() => {
                this.isRouterAlive = true
            })
        },
        handleScroll(e) {
            let header = this.$refs.header
            let curentScrollTop =
                document.documentElement.scrollTop ||
                window.pageYOffset ||
                document.body.scrollTop ||
                document.querySelector(this.el).scrollTop

            if (curentScrollTop < 20) {
                this.showHeader = true
                return
            }
            if (curentScrollTop > this.scrollTop) {
                this.showHeader = false
            } else this.showHeader = true

            this.scrollTop = curentScrollTop
        },
        throttle(fn, interval) {
            let lasttime = 0
            return function() {
                let nowtime = Date.now()
                if (nowtime - lasttime > interval) {
                    fn()
                    lasttime = nowtime
                }
            }
        }
    },
    mounted() {
        window.addEventListener(
            'scroll',
            this.throttle(this.handleScroll, 200),
            true
        )
    }
}
</script>

<style lang="scss">
#app {
    height: 100%;
    box-sizing: border-box;
    font-family: 'SF Pro SC', 'SF Pro Display', 'SF Pro Icons', 'PingFang SC',
        'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
}

i {
    margin-top: -3px;
}
a {
    color: #fff;
}
a:hover {
    color: rgb(175, 50, 60);
}
html,
body {
    height: 100%;
    background-color: rgb(47, 58, 62);
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

.article img {
    max-width: 100%;
    display: block;
    max-height: 500px !important;
    width: auto;
    margin: 5px auto !important;
}

.v-note-wrapper .v-note-panel {
    border: none !important;
    .v-note-show {
        .v-show-content {
            background-color: transparent;
            pre {
                padding: 0;
                .hljs {
                    background: rgb(30, 33, 39);
                    color: #fff;
                    padding: 1em;

                    .hljs-keyword {
                        color: rgb(166, 71, 82);
                    }

                    .hljs-title {
                        color: rgb(131, 178, 98);
                    }
                    .hljs-string {
                        color: rgb(176, 145, 87);
                    }
                    .hljs-tag {
                        color: #999;
                    }
                    .hljs-name {
                        color: rgb(166, 71, 82);
                    }
                }
            }
            blockquote {
                border-left: 5px solid #444;
            }
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
                background: #444;
                color: #fff;
                padding: 5px;
            }
        }
    }
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

.slide-fade-enter-active {
    transition: all 0.5s ease;
}
.slide-fade-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-60px);
    opacity: 0;
}

#card-box .ivu-card {
    background: rgba(255, 255, 255, 0.7);
}
.ivu-select-dropdown {
    background-color: rgb(47, 58, 62);
    .ivu-dropdown-item {
        color: #fff;
    }
}
.ivu-input {
    background-color: rgba(255, 255, 255, 0.2);
}
</style>
