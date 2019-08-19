<template>
  <div class="container">
    <Divider orientation="right" style="color:#fff">添加博客</Divider>
    <Form label-position="top">
      <div id="form_lable">
        <label>标题</label>
        <FormItem>
          <Input v-model="formData.title"></Input>
        </FormItem>
        <label for>编辑内容（由Mavon-Editor提供Markdown支持）</label>
        <!-- markdown -->
        <mavon-editor
          :toolbars="markdownOption"
          @imgAdd="$imgAdd"
          @imgDel="$imgDel"
          class="markdown"
          ref="md"
          v-model="formData.content"
        />

        <label for>摘要</label>
        <FormItem>
          <Input
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="Enter something..."
            type="textarea"
            v-model="formData.summary"
          ></Input>
        </FormItem>
        <label for>标签</label>
      </div>
      <FormItem>
        <Input placeholder="在此输入标签，以逗号隔开" type="text" v-model="formData.category"></Input>
      </FormItem>
      <!-- 提交 -->
      <FormItem>
        <Button @click="handleSubmit('formData')" id="btn1" type="primary">立即发布</Button>
        <Button @click="handleReset" id="btn2" style="margin-left: 8px">重置</Button>
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
                summary: '',
                title: '',
                content: '',
                categories: [],
                category_add: ''
            },
            img_file: {},
            markdownOption: {
                fontSize: '14px',
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
        }
    },
    methods: {
        // 图片添加完成后统一上传
        // 添加触发
        $imgAdd(pos, $file) {
            // 缓存图片信息
            this.img_file[pos] = $file
        },
        // 删除触发
        $imgDel(pos) {
            delete this.img_file[pos]
        },

        // 发布博客
        handleSubmit(name) {
            // 第一步.将图片上传到服务器.
            var formdata = new FormData()
            for (var _img in this.img_file) {
                formdata.append(_img, this.img_file[_img])
            }

            // 有图片，先上传图片到服务器
            if (formdata) {
                this.axios({
                    url: '/upload/img',
                    method: 'post',
                    data: formdata,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: localStorage.getItem('token')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        var url_list = res.data.urls
                        /**
                         * 例如：返回数据为 res = [[pos, url], [pos, url]...]
                         * pos 为原图片标志（0）
                         * url 为上传后图片的url地址
                         */
                        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                        for (var i = 0; i < url_list.length; i++) {
                            // $vm.$img2Url 详情见本页末尾
                            // console.log(url_list[i]);
                            this.$refs.md.$img2Url(
                                parseInt(url_list[i].key),
                                url_list[i].url
                            )
                        }
                        // 图片上传成功走这里，继续完成内容上传
                        //内容上传
                        this.axios({
                            method: 'post',
                            url: '/blogs/add',
                            data: this.formData,
                            headers: {
                                Authorization: localStorage.getItem('token')
                            }
                        }).then(response => {
                            this.$Notice.success({
                                title: '博客发布成功'
                            })
                        })
                    } else {
                        nodesc = res.data.msg
                        this.$Notice.error({
                            title: '图片上传失败',
                            desc: nodesc ? '' : '图片上传失败，请检查服务器'
                        })
                    }
                })
            }
        },

        handleReset() {
            this.formData = {
                summary: '',
                title: '',
                content: '',
                categories: [],
                category_add: ''
            }
        }
    }
}
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
    margin-bottom: 16px;
    color: beige;
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
    max-width: 1080px;
    margin: 0 auto;
    padding-top: 80px;
}
</style>
