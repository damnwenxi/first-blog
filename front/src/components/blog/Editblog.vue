<template>
  <div class="container">
    <Divider orientation="right">编辑博客</Divider>
    <Form label-position="top">
      <div id="form_lable">
        <label for>标题</label>
        <FormItem>
          <Input v-model="formData.title"></Input>
        </FormItem>
        <label for>编辑内容（由Mavon-Editor提供Markdown支持）</label>
        <!-- markdown -->
        <mavon-editor
          class="markdown"
          ref="md"
          @imgAdd="$imgAdd"
          @imgDel="$imgDel"
          :toolbars="markdownOption"
          v-model="formData.content"
        />

        <label for>摘要</label>
        <FormItem>
          <Input
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="Enter something..."
            v-model="formData.summary"
          ></Input>
        </FormItem>
        <label for>分类</label>
      </div>
      <FormItem prop="interest">
        <CheckboxGroup v-model="formData.categories">
          <Checkbox label="JavaScript"></Checkbox>
          <Checkbox label="Vue"></Checkbox>
          <Checkbox label="React"></Checkbox>
          <Checkbox label="CSS"></Checkbox>
          <Checkbox label="HTML"></Checkbox>
          <Checkbox label="Andriod"></Checkbox>
          <Checkbox label="JAVA"></Checkbox>
          <Checkbox label="乱八七糟"></Checkbox>
          <Input type="text" placeholder="在此输入其他分类" v-model="formData.category_add"></Input>
        </CheckboxGroup>
      </FormItem>
      <!-- 提交 -->
      <FormItem>
        <Button id="btn1" type="primary" @click="handleSubmit('formData')">立即发布</Button>
        <Button id="btn2"  @click="handleReset" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 表单数据
      formData: {
        summary: "",
        title: "",
        content: "",
        categories: [],
        category_add: ""
      },
      img_file: {},
      markdownOption: {
        fontSize: "14px",
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        // fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    };
  },
  created() {
      console.log(this.$route);
      this.axios
      .get("/blogs?id=" + this.$route.query.id)
      .then(response => {
        this.formData = response.data;
        this.formData.categories = [response.data.category];
      });
  },
  methods: {
    // 图片添加完成后统一上传
    // 添加触发
    $imgAdd(pos, $file) {
      // 缓存图片信息
      this.img_file[pos] = $file;
    },
    // 删除触发
    $imgDel(pos) {
      delete this.img_file[pos];
    },

    // 发布博客
    handleSubmit(name) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      for (var _img in this.img_file) {
        formdata.append(_img, this.img_file[_img]);
      }

      // 有图片，先上传图片到服务器
      if (formdata) {
        this.axios({
          url: "/upload/img",
          method: "post",
          data: formdata,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token")
          }
        }).then(res => {
          if (res.status == 200) {
            var url_list = res.data.urls;
            console.log(url_list);
            /**
             * 例如：返回数据为 res = [[pos, url], [pos, url]...]
             * pos 为原图片标志（0）
             * url 为上传后图片的url地址
             */
            // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
            for (var i=0; i<url_list.length; i++) {
              // $vm.$img2Url 详情见本页末尾
              // console.log(url_list[i]);
              this.$refs.md.$img2Url(parseInt(url_list[i].key), url_list[i].url);
            }
            // 图片上传成功走这里，继续完成内容上传
            // 将自定义分类加入分类数组
            if (this.formData.category_add)
              this.formData.categories.push(this.formData.category_add);
            //内容上传
            console.log("send");  
            this.axios({
              method: "post",
              url: "/blogs/edit",
              data: this.formData,
              headers: {
                Authorization: localStorage.getItem("token")
              }
            }).then(response => {
              console.log(response);
              this.$Notice.success({
                    title: '博客更新成功'
                });
            });
          } else {
            this.$Notice.error({
              title: "图片上传失败",
              desc: "由于服务器原因导致图片上传失败"
            });
          }
        });
      }
    },

    handleReset() {
      this.formData = {
        summary: "",
        title: "",
        content: "",
        categories: [],
        category_add: ""
      };
    }
  }
};
</script>


<style scoped>


#tip {
  text-align: left;
  margin: 0 0 10px;
}

#form_lable label {
  padding-left: 20px;
  text-align: left;
  display: block;
  margin-left: 0;
  margin-bottom: 5px;
  /* float: left; */
  border-left: 4px solid rgb(175, 50, 60);
}
#form_lable .markdown {
  border-radius: 5px;
  margin-bottom: 20px;
  height: 500px;
  max-height: 500px;
}
#form_lable .v-note-wrapper {
  z-index: 0;
}
.container {
  max-width: 90%;
}

</style>
