const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');
const Admin = require('../models/Admin');
const Website = require('../models/Website');
const request = require('request-promise');
const { DEFAULT_WEBSITE_ICON } = require('../config');

/**
 *  @GET '/websites/show'
 *  @获取公开websites数据接口，接口是公开的
 */
router.get('/', async ctx => {
    try {
        const webs = await Website.find();
        // console.log(webs);
        ctx.status = 200;
        ctx.body = { webs: webs, msg: 'get websites data from table websites.' };
    } catch (e) {
        console.log(e);
        ctx.status = 404;
        ctx.body = { msg: 'not found.' };
    }
});

/**
 *  @GET '/websites/hide'
 *  @获取隐藏websites数据接口，接口是私密的
 */
router.get('/hide', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const admin = await Admin.find({ _id: ctx.state.user.id });
        if (admin.length > 0) {
            const webs = await Website.find({ show: true });
            console.log(webs);
            ctx.status = 200;
            ctx.body = { msg: 'get websites data from table websites.' };
        } else {
            ctx.status = 400;
            ctx.body = { msg: '你不是管理员用户。' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 404;
        ctx.body = { msg: 'not found.' };
    }
});


/**
*  @POST '/websites/add'
*  @浏览用户添加
*  @添加blog数据接口，接口是公开的，需要token验证
*  @添加到暂存表，管理员审核通过后展示
*/
router.post('/add', async ctx => {
    try {
        const data = ctx.request.body;
        // 验证数据然后添加到数据库
        const web = {};
        web.user = data.email || "匿名用户";
        web.title = data.title || '';
        web.info = data.description || 'No description';
        web.category = data.category || '其他';
        web.url = data.url || "";

        // 请求url网站icon，保存iconURL
        const res = await request.get(data.url + '/favicon.ico');
        // console.log(typeof res);
        if (typeof(res) == 'string') {
            web.cover = data.url + "\/favicon.ico";
        } else {
            web.cover = DEFAULT_WEBSITE_ICON;
        }
        // session验证
        if (ctx.session.user) {
            web.show = true;
        }
        // 数据验证
        const saveWeb = await new Website(web).save();
        if (saveWeb) {
            ctx.status = 200;
            ctx.body = { msg: "添加成功", saveWeb };
        } else {
            ctx.status = 500;
            ctx.body = { msg: '添加失败' };
        }
        
    } catch (e) {
        ctx.status = 500;
        console.log(e);
        ctx.body = { msg: '崩了！' };
    };
});

/**
 *  @GET '/websites/delete'
 *  @管理员删除website
 *  @接口是私密的
 */
router.get('/delete', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const admin = await Admin.find({ _id: ctx.state.user.id });
        if (admin.length > 0) {
            const id = ctx.query.id;
            console.log(id);
            // 删除操作
            ctx.status = 200;
            ctx.body = { msg: 'get websites data from table websites.' };
        } else {
            ctx.status = 400;
            ctx.body = { msg: '你不是管理员用户。' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 404;
        ctx.body = { msg: 'not found.' };
    }
});

module.exports = router.routes();
