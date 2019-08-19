<template>
  <!-- footer -->
  <div class="container">
    <Divider />
    <div class="row">
      <div class="col-lg-12">
        <p>
          Made by
          <a class="contact" href="https://www.weibo.com/u/5785591031">低端人口</a>.
        </p>
        <p>
          Code released under the
          <a href="https://github.com/Kefeng2017/news.git">
            MIT
            License
          </a>.
        </p>
        <p>
          Based on
          <a href="https://getbootstrap.com" rel="nofollow">Bootstrap</a>. Icons from
          <a href="http://fontawesome.io/" rel="nofollow">Font Awesome</a>. Web fonts from
          <a href="https://fonts.google.com/" rel="nofollow">Google</a>.
        </p>
        <p>
          © 2019 | author:
          <a class="contact" href="#">1396956549@qq.com</a> |
          <a href="http://www.miitbeian.gov.cn/">鄂ICP备19008087号</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            name: ''
        }
    }
}
</script>

<style scoped>
.container {
    width: 1080px;
    margin: 5em auto;
    font-size: 1.2em;
}
</style>