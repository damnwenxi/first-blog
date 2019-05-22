const Router = require('koa-router');
const router = new Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Valid = require('../libs/valid');
const md5 = require('../libs/md5');
const config = require('../config');
const passport = require('koa-passport');

/**
 *  @POST '/login'
 *  @登录接口，接口是公开的
 *  登录成功生成token
 */
router.post('/', async ctx => {
    const data = ctx.request.body;
    // 验证
    const { errors, isValid } = await Valid.loginValid(data);
    if (!isValid) {
        ctx.status = 400;
        ctx.body = errors;
        return;
    }
    // 登陆信息校验
    const loginResult = await Admin.find({email:data.email});
    const user = loginResult[0];

    if(!user){
        ctx.status = 404;
        ctx.body = {msg:'用户不存在！'}; 
    }else{
        // 验证密码
        if(md5(data.password) == user.password){
            // 密码对，生成token
            const payload = {id:user.id,name:user.name,avatar:user.avatar};
            const token = jwt.sign(payload,config.TOKEN_KEY,{expiresIn:3600});
            // 设置session
            ctx.session.user = user.name;
            ctx.session.id = user._id;
            ctx.status = 200;
            ctx.body = {success:true,token: "Bearer " + token,user:user};
        }else{
            ctx.status = 400;
            ctx.body = {msg:'密码错误！'};
        }
    }
});


/**
 *  @GET '/login/valid'
 *  @admin认证，接口是私密的，需要token验证
 */
router.get('/valid',passport.authenticate('jwt',{session:false}),async ctx=>{
    try{
        const admin = await Admin.find({_id:ctx.state.user.id});
        // console.log(admin);
        ctx.status = 200;
        ctx.body = admin[0];
    }catch(e){
        ctx.status = 500;
        ctx.body = {msg:'崩了！'};
    };
    
});

module.exports = router.routes();
