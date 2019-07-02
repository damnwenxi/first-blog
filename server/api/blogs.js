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
    const page = parseInt(ctx.query.page);
    // 如果有id，获取单条blog
    if (id) {
        try {
            const blog = await Blog.findOne({ _id: id });
            ctx.status = 200;
            ctx.body = blog;
        } catch (e) {
            // console.log(e);
            ctx.status = 200;
            ctx.body = { msg: "你要查看的blog不存在或已被删除" };
        }
        // 没有id则是普通用户获取可展示的blog
    } else {
        try {
            const blogs = await Blog.find({}, { 'content': 0 }).sort({ _id: -1 }).limit(10).skip(page * 10 - 10);
            const count = await Blog.find().countDocuments();
            ctx.status = 200;
            ctx.body = { blogs, count };
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
            await Blog.find({}, { 'content': 0 }).limit(10).then(res => {
                ctx.status = 200;
                ctx.body = { msg: 'success.', blogs: res };
            });
        } else {
            ctx.status = 400;
            ctx.body = { msg: 'access denied.' };
        }
    } catch (e) {
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
            // console.log(data.categories);
            // 验证数据然后添加到数据库
            const blog = {
                "author": ctx.state.user.name,
                "summary": data.summary || '',
                "title": data.title || 'No title',
                "category": data.category || '乱八七糟',
                "content": data.content || 'air',
                "cover": data.cover || '',
                "last_change_time": new Date()
            };

            // 数据验证
            await Blog.updateOne(
                { _id: data._id },
                { $set: blog }
            ).then(res => {
                if (res.n == 1) {
                    ctx.status = 200;
                    ctx.body = { msg: 'edit blog success.', blog_back: res };
                }
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


/**
 * @desc 点赞接口
 * @port /blogs/vote
 * @query id
 * @access public
 */
router.get('/vote', async ctx => {
    try {
        const id = ctx.query.id;
        await Blog.updateOne({ "_id": id }, { $inc: { "likes": 1 } }).then(res => {
            if (res.nModified == 1) {
                ctx.status = 200;
                ctx.body = { msg: "唔该晒！" };
            } else {
                ctx.status = 500;
                ctx.body = { msg: "服务器出错" };
            }
        });
    } catch (e) {
        ctx.status = 500;
        ctx.body = { msg: "服务器出错" };
    }
});

/**
 * @desc 访问接口
 * @port /blogs/view
 * @query id
 * @access public
 */
router.get('/view', async ctx => {
    try {
        const id = ctx.query.id;
        await Blog.updateOne({ "_id": id }, { $inc: { "view": 1 } }).then(res => {
            console.log(res);
            if (res.nModified == 1) {
                ctx.status = 200;
                ctx.body = { msg: "success" };
            } else {
                ctx.status = 500;
                ctx.body = { msg: "服务器出错" };
            }
        });
    } catch (e) {
        ctx.status = 500;
        ctx.body = { msg: "服务器出错" };
    }
})

/**
 *  @GET '/blog/search'
 *  @关键字查找
 */
router.get('/search', async ctx => {
    try {
        const keywords = ctx.query.k.toString();
        //正则匹配查询 
        const searchResult = await Blog.find({ $or: [{ title: { $regex: keywords } }, { summary: { $regex: keywords } }, { content: { $regex: keywords } }] });
        if (searchResult.length > 0) {
            ctx.status = 200;
            ctx.body = { msg: 'success', blogs: searchResult };
        } else {
            ctx.status = 200;
            ctx.body = { msg: 'nothing to match.' }
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = { msg: 'not found.' };
    }
});

module.exports = router.routes();
