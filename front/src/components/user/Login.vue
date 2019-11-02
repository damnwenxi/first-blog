<template>
  <Form id="login">
    <FormItem label="邮箱">
      <Input v-model="mail" placeholder="请输入邮箱..."></Input>
    </FormItem>
    <FormItem label="密码" prop="password">
      <Input type="password" v-model="password" placeholder="请输入密码..."></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit">登录</Button>
      <Button @click="handleReset" style="margin-left: 8px">重置</Button>
    </FormItem>
  </Form>
</template>
<script>
// import Vue from 'vue'
export default {
  data() {
    return {
      mail: "",
      password: ""
    };
  },
  methods: {
    handleSubmit() {
      if (!this.mail || !this.password) {
        this.$Message.warning("用户名或密码不得为空");
      } else {
        this.axios
          .post("/login", {
            email: this.mail,
            password: this.password
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
    },
    // 重置
    handleReset() {
      this.password = "";
      this.mail = "";
    }
  }
};
</script>

<style>
#login {
  max-width: 360px;
  padding: 1em;
  margin: 100px auto;
}

.ivu-form .ivu-form-item-label{
    color: #fff !important;
}

.ivu-input{
  color: #fff;
}
</style>

