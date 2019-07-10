<template>
  <header>
    <div class="container">
      <div class="nav_left">
        <router-link to="/">
          <img
            src="../assets/logo2.png"
            style="verticle-align:middle ;width:50px;display:inline-block"
            alt
          />Solotor
        </router-link>
      </div>

      <!-- 大屏设备 -->
      <div class="nav_right">
        <ul class="menu">
          <li class="menu_item">
            <router-link to="/">
              <Icon type="ios-bookmark-outline" />共享书签
            </router-link>
          </li>

          <li class="menu_item">
            <router-link to="/blogs">
              <Icon type="ios-list-box-outline" />博客总览
            </router-link>
          </li>

          <li class="menu_item" v-if="user">
            <Dropdown>
              <a href="javascript:void(0)">
                <Icon type="ios-hammer-outline" />
                {{user}}
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem>
                  <router-link :to="{name:'add'}">写博客</router-link>
                </DropdownItem>
                <DropdownItem>
                  <router-link :to="{name:'admin'}">后台管理</router-link>
                </DropdownItem>
                <DropdownItem>用户授权</DropdownItem>
                <DropdownItem>
                  <span @click="logout">退了</span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>

          <li class="menu_item">
            <Dropdown>
              <a href="javascript:void(0)">
                <Icon type="ios-infinite-outline" />关于
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem>
                  <router-link to="/about">我的信息</router-link>
                </DropdownItem>
                <DropdownItem>
                  <router-link to="/collection">作品集</router-link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>

          <li class="menu_item" v-if="!user">
            <router-link to="/login">
              <Icon type="ios-contact-outline" />登录
            </router-link>
          </li>

          <!-- <li class="menu_item">
            <span id="button">
              <Icon type="ios-search" />Search
            </span>
          </li>-->
        </ul>
      </div>

      <!-- 移动端 -->
      <div style="float:right;display:none" class="phone-nav">
        <Menu mode="horizontal">
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-cog" />操作
            </template>
            <MenuGroup title="进入">
              <MenuItem name="3-1">
                <router-link to="/blogs">
                  <Icon type="md-list-box" />博客总览
                </router-link>
              </MenuItem>
              <MenuItem name="3-4">
                <router-link to="/">
                  <Icon type="md-bookmark" />书签
                </router-link>
              </MenuItem>
              <MenuItem name="3-2">
                <router-link to="/collection">
                  <Icon type="md-albums" />作品集
                </router-link>
              </MenuItem>
              <MenuItem name="3-3">
                <router-link to="/about">
                  <Icon type="md-information-circle" />我的信息
                </router-link>
              </MenuItem>
            </MenuGroup>
          </Submenu>
        </Menu>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      user: ""
    };
  },
  inject: ["reload"],
  mounted() {
    this.user = localStorage.user;
  },
  methods: {
    logout() {
      localStorage.clear();
      this.reload();
    }
  }
};
</script>

<style scoped>
header {
  background: rgba(255, 255, 255, 0.94);
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  z-index: 1;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}
.container {
  width: 1080px;
  max-width: 100%;
  margin: 0 auto;
  height: 100%;
  color: #3c3c3c;
}

.nav_left {
  font-size: 20px;
  line-height: 70px;
  float: left;
}
.nav_right {
  float: right;
}
.menu {
  line-height: 70px;
  display: flex;
}
.menu_item {
  font-weight: 400;
  font-size: 14px;
  list-style: none;
  margin-left: 40px;
  float: left;
}
#button {
  margin-top: -3px;
  font-size: 16px;
}
#button:hover {
  cursor: pointer;
}

a {
  color: #2c3e50;
}

i {
  margin-top: -2px;
}
.menu_item :hover {
  color: rgb(175, 50, 60);
}
</style>

