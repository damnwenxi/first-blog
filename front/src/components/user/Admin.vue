<template>
  <div id="admin">
    <Divider orientation="right">后台管理</Divider>
    <Table
      @on-selection-change="selectChange"
      ref="selection"
      stripe
      :columns="columns"
      :data="blogs"
    ></Table>

    <br>
    <Button @click="handleDelete()">删除所选</Button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 50,
          align: "center"
        },
        {
          title: "发布时间",
          key: "c_date",
          sortable: true
        },
        {
          title: " 标题",
          key: "title",
          ellipsis: true
        },
        {
          title: "分类",
          key: "category"
        },
        {
          title: "作者",
          key: "author",
          maxWidth: 100
        },
        {
          title: "简介",
          key: "summary",
          ellipsis: true
        },
        {
          width: 200,
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "detail",
                        query: { id: params.row._id }
                      });
                    }
                  }
                },
                "预览"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "default",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      // console.log(params.row._id);
                      this.$router.push({
                        name: "edit",
                        query: { id: params.row._id }
                      });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "删除博客",
                        content:
                          "<p>确定要删除该条博客吗？该操作不可恢复。</p>",
                        onOk: () => {
                          this.handleDelete(params.row._id);
                        },
                        onCancel: () => {
                          this.$Message.info("取消删除");
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      blogs: [],
      selectList: [],
      delStr: ""
    };
  },
  created() {
    this.axios({
      method: "get",
      url: "/blogs/all",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(response => {
      this.blogs = response.data.blogs;
    });
  },
  methods: {
    selectChange(res) {
      //   先将list设置为空
      this.selectList = [];
      for (var i = 0; i < res.length; i++) {
        this.selectList.push(res[i]._id);
      }
    },
    handleDelete(id) {
      if (id) {
        // console.log(id);
        this.delStr = id;
      } else if (this.selectList) {
        // console.log(this.selectList);
        this.delStr = this.selectList.join(",");
      }
      // console.log(this.delStr);
      this.axios({
        method: "post",
        url: "/blogs/delete",
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: {
          idList: this.delStr
        }
      }).then(res => {
        if (res.status == 200) {
          this.$Notice.success({
            title: "删除成功",
            desc: res.data.msg
          });

          this.axios({
            method: "get",
            url: "/blogs/all",
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }).then(response => {
            this.blogs = response.data.blogs;
          });
        } else {
          this.$Notice.error({
            title: "删除失败",
            desc: res.data.msg
          });
        }
      });
    }
  }
};
</script>


<style scoped>
</style>
