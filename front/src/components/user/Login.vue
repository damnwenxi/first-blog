<template>
  <Form id="login" :label-width="80">
    <FormItem label="E-mail">
      <Input v-model="mail" placeholder="Enter your e-mail"></Input>
    </FormItem>
    <FormItem label="Password" prop="password">
      <Input type="password" v-model="password" placeholder="Enter your password"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit">Submit</Button>
      <Button @click="handleReset" style="margin-left: 8px">Reset</Button>
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
              sessionStorage.user = response.data.user.name;
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
  max-width: 50%;
  margin: 200px auto;
}
</style>

