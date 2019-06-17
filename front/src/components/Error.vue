<template>
  <div id="error">
    <div class="error">
      <div class="error-block">
        <img class="main-img" src="../assets/404.png" alt="Img 404">
        <h3>您要找的页面不存在</h3>
        <div class="sub-title">可能是因为您的链接地址有误、您要找的内容已被删除或您没有权限查看。</div>
        <a class="follow" href="/">返回首页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
body {
  background: #5b5d8e;
  color: #d5d6e2;
  font-family: "Microsoft YaHei", "Segoe UI", "Lucida Grande", Helvetica, Arial,
    sans-serif;
}
a {
  color: #333333;
  cursor: pointer;
  text-decoration: none;
}
a:hover,
a:focus {
  color: #2f2f2f;
  text-decoration: none;
}
a:focus {
  outline: none;
}
.error-page-logo {
  position: absolute;
  left: 40px;
  top: 40px;
  width: 300px;
}
.error {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  text-align: center;
}
.error-block {
  padding-top: 80px;
  padding-bottom: 20px;
}
.main-img {
  width: 220px;
}
h3 {
  margin: 40px 0 20px 0;
  font-weight: bold;
}
.sub-title {
  margin: 10px 0 30px 0;
  font-size: 14px;
}
.sub-title a {
  color: #3194d0;
}
.follow {
  padding: 13px 0;
  width: 160px;
  font-size: 15px;
  border-radius: 40px;
  color: #ffffff;
  background-color: #42c02e;
  border-color: #42c02e;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  user-select: none;
}
.follow:hover,
.follow:focus {
  color: #ffffff;
  background-color: #28a014;
  border-color: #28a014;
}
.error-footer {
  margin-top: 40px;
  border-top: 1px solid #f0f0f0;
}
.part {
  float: left;
  width: 33%;
  padding: 30px 0;
}
.part:nth-child(2) {
  border-left: 1px solid #f0f0f0;
  border-right: 1px solid #f0f0f0;
}
.part:last-child {
  padding: 20px 0;
}
.res-warp {
  display: inline-block;
}
.res-warp img {
  margin-right: 15px;
  width: 80px;
  height: 80px;
  vertical-align: middle;
}
.res-warp .app,
.res-warp .weibo {
  width: auto;
  height: 60px;
}
.info {
  padding-top: 10px;
  text-align: left;
  vertical-align: middle;
  display: inline-block;
}
.info {
  font-size: 14px;
}
.info p {
  font-size: 12px;
  color: #9b9b9b;
}
@media (max-width: 768px) {
  .error-page-logo,
  .error-footer {
    display: none;
  }
}
</style>


