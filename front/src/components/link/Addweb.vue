<template>
  <div class="add">
    <h2>Add Bookmark</h2>
          <Divider dashed/>

    <Form ref="formItem" :model="formItem" :label-width="80" :rules="ruleValidate">
      <FormItem label="名称" prop="title">
        <Input v-model="formItem.title" placeholder="请输入网站名称..."></Input>
      </FormItem>
      <FormItem label="网址" prop="url">
        <Input v-model="formItem.url" placeholder="请输入网址..."></Input>
      </FormItem>
      <FormItem label="网站icon" prop="cover">
        <Input v-model="formItem.cover" placeholder="将网站的icon拷贝至这里"></Input>
      </FormItem>
      <FormItem label="分类" prop="category">
        <Select v-model="formItem.category">
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>

      <FormItem label="E-mail" prop="email">
        <Input v-model="formItem.email" placeholder="输入您的邮箱(选填)"></Input>
      </FormItem>

      <FormItem label="描述" prop="description">
        <Input
          v-model="formItem.description"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="Enter something..."
        ></Input>
      </FormItem>

      <FormItem label="信息">
        <Input
          v-model="formItem.note"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="Enter something..."
        ></Input>
      </FormItem>

      <FormItem>
        <Button id="btn1" @click="handleSubmit('formItem')" type="primary">提交</Button>
        <Button id="btn2" @click="handleReset" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formItem: {
        title: "",
        url: "",
        category: "",
        email: "",
        description: "",
        cover: "",
        note: ""
      },

      ruleValidate: {
        title: [
          {
            required: true,
            message: "The title cannot be empty",
            trigger: "blur"
          }
        ],
        url: [
          {
            required: true,
            message: "The url cannot be empty",
            trigger: "blur"
          }
        ],
        category: [
          {
            required: true,
            message: "The category cannot be empty",
            trigger: "blur"
          }
        ],
        description: [
          {
            required: true,
            message: "The description cannot be empty",
            trigger: "blur"
          },
          {
            type: "string",
            max: 40,
            message: "Introduce no less than 10 words",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.axios({
            method: "post",
            url: "/websites/add",
            data: this.formItem
          }).then(response => {
            if(response.status==200){
              this.$Message.success("添加书签成功!");
            }else{
              this.$Message.error(res.data.msg);
            }
          });
        } else {
          this.$Message.error("输入有误或URL不合法！");
        }
      });
    },
    handleReset() {
      this.formData = {
        title: "",
        url: "",
        category: "",
        email: "",
        description: ""
      };
    }
  }
};
</script>

<style scoped>
.add {
  margin: 100px auto;
  width: 60%;
}
</style>

