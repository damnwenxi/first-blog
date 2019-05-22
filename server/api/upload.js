const Router = require('koa-router');
const fs = require('fs');
const passport = require('koa-passport');
const Admin = require('../models/Admin');
const path = require('path');
const router = new Router();

/**
 *  @POST '/upload/img'
 *  @上传博客图片接口 接口是私密的 需要token验证
 */
router.post('/img', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const admin = await Admin.find({ _id: ctx.state.user.id });
        if (admin.length > 0) {
            const files = ctx.request.files;  //从表单数据中获取文件
            const urls=[];
            for (var i in files) {
                const file = files[i];
                // 创建可读流
                const rs = fs.createReadStream(file.path);
                // 重命名(时间戳拼接)
                const date = new Date();
                const newFileName = date.getTime() + '_' + file.name;
                // 创建可写流
                const ws = fs.createWriteStream(path.resolve(__dirname, '../upload/blog-img/', newFileName));
                // 管道链接传输
                await rs.pipe(ws);
                urls.push({
                    key:i,
                    url:'http://' + ctx.header.host + '/upload/blog-img/' + newFileName
                });
            }
            ctx.status = 200;
            ctx.body = { urls: urls };
        } else {
            ctx.status = 404;
            ctx.body = { msg: '该账户不存在或不允许上传照片' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = { msg: '崩了！' };
    };
});

module.exports = router.routes();