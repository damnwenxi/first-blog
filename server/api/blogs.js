const Router = require('koa-router');
const router = new Router();
const Blog = require('../models/Blog');
const passport = require('koa-passport');
const Admin = require('../models/Admin');

/**
 *  @GET '/blogs'
 *  @获取blog数据接口，接口是公开的
 */
router.get('/', async ctx => {
    const id = ctx.query.id;
    // 如果有id，获取单条blog
    if (id) {
        try {
            const blog = await Blog.findOne({ _id: id });
            ctx.status = 200;
            ctx.body = blog;
        } catch (e) {
            console.log(e);
            ctx.status = 500;
            ctx.body = { msg: "你要查看的blog不存在或已被删除" };
        }
        // 没有id则是普通用户获取可展示的blog
    } else {
        try {
            const blogs = await Blog.find({}, { 'content': 0 }).sort({ _id: -1 });
            ctx.status = 200;
            ctx.body = blogs;
        } catch (e) {
            console.log(e);
            ctx.status = 500;
            ctx.body = { msg: "数据库获取数据失败。" };
        }
    }
});


/**
 * @desc 管理员获取所有blog接口
 * @access private
 */
router.get('/all', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const admin = await Admin.find({ _id: ctx.state.user.id });
        if (admin.length > 0) {
            await Blog.find().limit(20).then(res => {
                ctx.status = 200;
                ctx.body = { msg: 'success.', blogs: res };
            });
        } else {
            ctx.status = 400;
            ctx.body = { msg: 'access denied.' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 404;
        ctx.body = { msg: 'err' };
    }
});


/**
 *  @GET '/blogs/add'
 *  @添加blog验证接口，接口是私密的，需要token验证
 */
router.get('/add', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const admin = await Admin.find({ _id: ctx.state.user.id });
        // console.log(admin);
        ctx.status = 200;
        ctx.body = admin[0];
    } catch (e) {
        ctx.status = 500;
        ctx.body = { msg: 'err.' };
    };

});


/**
 *  @POST '/blogs/add'
 *  @添加blog数据接口，接口是私密的，需要token验证
 */
router.post('/add', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const admin = await Admin.find({ _id: ctx.state.user.id });
        // console.log(admin);
        if (admin.length > 0) {
            const data = ctx.request.body;
            console.log(data);
            // 验证数据然后添加到数据库
            const blog = {
                author: ctx.state.user.name,
                summary: data.summary || '',
                title: data.title || 'No title',
                category: data.category || 'other',
                content: data.content || " ",
                cover: data.cover || ''
            };


            // 数据验证
            await new Blog(blog).save().then(blog => {
                ctx.status = 200;
                ctx.body = { msg: 'add blog success.', blog_back: blog };
            });
        } else {
            ctx.status = 400;
            ctx.body = { msg: '你不是系统用户，请不要尝试危险操作！' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = { msg: 'err.' };
    };
});

/**
 *  @post '/blogs/delete'
 *  @管理员删除blog
 *  @接口是私密的
 */

// passport.authenticate('jwt', { session: false }),
router.post('/delete', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const idList = ctx.request.body.idList;
        // console.log(idList);
        const admin = await Admin.find({ _id: ctx.state.user.id });

        if (admin.length > 0) {
            // 删除操作
            const delList = idList.split(',');
            var delCount = 0;
            // console.log(delList);
            for (var i = 0; i < delList.length; i++) {
                await Blog.deleteOne({ _id: delList[i] }).then((del) => {
                    if (del.ok) {
                        delCount = delCount + 1;
                    }
                });
            }
            ctx.status = 200;
            ctx.body = { msg: `成功删除${delCount}条记录。` };
        } else {
            ctx.status = 400;
            ctx.body = { msg: 'access denied.' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 404;
        ctx.body = { msg: 'err.' };
    }
});

/**
 *  @GET '/blogs/edit'
 *  @管理员编辑blog页面
 *  @接口是私密的
 */
router.get('/edit', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const admin = await Admin.find({ _id: ctx.state.user.id });
        if (admin.length > 0) {
            const edit_id = ctx.query.id;
            // 找到要修改的blog并将旧的内容返回到前台
            await Blog.find({ _id: edit_id }).then(blog => {
                ctx.status = 200;
                ctx.body = { blog_back: blog };
                // console.log(blog);
            });
        } else {
            ctx.status = 400;
            ctx.body = { msg: '你不是管理员用户。' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = { msg: 'err.' };
    }
});



/**
 *  @POST '/blogs/edit'
 *  @编辑blog，接口是私密的，需要token验证
 */
router.post('/edit', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const admin = await Admin.find({ _id: ctx.state.user.id });
        // console.log(admin);
        if (admin.length > 0) {
            const data = ctx.request.body;
            // 验证数据然后添加到数据库
            const blog = {};
            blog.author = ctx.state.user.name;
            blog.summary = data.summary || '';
            blog.title = data.title || 'No title';
            blog.category = data.category || '乱八七糟';
            blog.content = data.content || 'air';
            blog.cover = data.cover || '';
            blog.last_change_time = new Date();

            // 数据验证
            await Blog.findOneAndUpdate(
                { _id: data.id },
                { $set: blog },
                { new: true }
            ).then(blog => {
                ctx.status = 200;
                ctx.body = { msg: 'edit blog success.', blog_back: blog };
            });
        } else {
            ctx.status = 400;
            ctx.body = { msg: 'nice try' };
        }
    } catch (e) {
        ctx.status = 500;
        console.log(e);
        ctx.body = { msg: 'err.' };
    };
});

module.exports = router.routes();
