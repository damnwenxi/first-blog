const Router = require('koa-router');
const router = new Router();
const gravatar = require('gravatar');
const Admin = require('../models/Admin');
const Valid = require('../libs/valid');
const md5 = require('../libs/md5');

/**
 *  @POST '/register'
 *  @注册接口，接口是公开的
 */
router.post('/', async ctx => {
    const data = ctx.request.body;
    console.log(data);
    // 验证
    const { errors, isValid } = await Valid.RegisterValid(data);
    if (!isValid) {
        ctx.status = 400;
        ctx.body = errors;
        return;
    }
    // 验证用户名是否存在
    const registerResult = await Admin.find({eamil:data.email});
    if(registerResult.length>0){
        ctx.status = 500;
        ctx.body = {msg:'改用户名已被占用！'}; 
    }else{
        const avatar = gravatar.url(data.email, {s: '200', r: 'pg', d: 'retro'});
        const newUser = new Admin({
            name:data.name,
            email:data.email,
            avatar,
            password:md5(data.password1)
        });
        await newUser.save().then(user=>{
            ctx.body = user;
        }).catch(err=>{
            console.log(err);
        });
    }
});

module.exports = router.routes();
