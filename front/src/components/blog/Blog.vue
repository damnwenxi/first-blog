<template>
  <div id="blog">
    
    <Row
      :key="index"
      class="code-row-bg"
      justify="space-around"
      type="flex"
      v-for="(blog,index) in this.blogs"
    >
      <Col :lg="18" :md="16" :sm="24" :xs="24">
        <Cardblog :summary="blog"></Cardblog>
      </Col>
    </Row>

    <p style="text-align:center">
      <Page :current="page" :page-size="10" :total="all" @on-change="pageJump" />
    </p>
    <a href="#" ref="top" style="display:none">top</a>
  </div>
</template>

<script>
import Cardblog from './Card-blog'
export default {
    data() {
        return {
            all: 100,
            page: 1,
            blogs: [],
            tempblogs: [],
            length: 0,
            keyWords: '',
            allblogs: []
        }
    },
    components: { Cardblog },
    created() {
        this.axios.get('/blogs?page=1').then(response => {
            this.blogs = response.data.blogs
            // console.log(response.data);
            this.tempblogs = response.data.blogs
            this.all = parseInt(response.data.count)
            this.allblogs.push(response.data.blogs)
        })
    },
    methods: {
        getBlogs(page) {
            // 有缓存，先走缓存
            if (this.allblogs[page]) {
                this.blogs = this.allblogs[page - 1]
                this.$refs.top.click()
                this.tempblogs = this.allblogs[page - 1]
            } else {
                this.axios.get('/blogs?page=' + page).then(response => {
                    this.blogs = response.data.blogs
                    this.allblogs.push(response.data.blogs)
                    // console.log(response.data);
                    this.tempblogs = response.data.blogs
                    this.total = response.data.count
                    this.$refs.top.click()
                })
            }
        },
        pageJump(i) {
            this.page = i
            this.getBlogs(i)
        },
        search() {
            var re = /\S+/
            if (re.test(this.keyWords)) {
                this.axios.get('/blogs/search?k=' + this.keyWords).then(res => {
                    if (res.status == 200) {
                        // 找到记录
                        if (res.data.blogs) {
                            const items = res.data.blogs
                            this.blogs = items
                        } else {
                            this.blogs = []
                        }
                    } else {
                        this.$Notice.error({
                            title: '服务器错误',
                            desc: '服务器开小差啦，请稍后再试试'
                        })
                    }
                })
            } else {
                this.blogs = this.tempblogs
            }
        }
    }
}
</script>

<style scoped>
#blog {
    color: rgb(81, 90, 110);
    margin: 0 auto;
    max-width: 1080px;
}
</style>
