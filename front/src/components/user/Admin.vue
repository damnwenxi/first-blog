<template>
  <div id="admin">
    <Tabs style="z-index:0" value="name1">
      <TabPane label="博客管理" name="name1">
        <blogManege></blogManege>
      </TabPane>
      <TabPane label="书签管理" name="name2">
        <linkManege></linkManege>
      </TabPane>
      <TabPane label="用户管理" name="name3">
        <userManege></userManege>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import BlogManege from "./BlogManege";
import LinkManege from "./LinkManege";
import UserManege from "./UserManege";
export default {
  data() {
    return {};
  },
  components: { BlogManege, UserManege, LinkManege }
};
</script>


<style scoped>
</style>
