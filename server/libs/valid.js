const Validator = require('validator');

// 验证是否为空
const isEmpty = function(value){
    return (
        value == undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
};

module.exports = {
    // 登录验证
    loginValid:(data)=>{
        const errors = {};
        data.email = !isEmpty(data.email)?data.email:'';

        if(!Validator.isEmail(data.email)){
            errors.email = '邮箱格式错误！';
        }

        return{
            errors,
            isValid: isEmpty(errors)
        }
    },

    // 注册验证
    RegisterValid:(data)=>{
        const errors = {};

        data.email = !isEmpty(data.email)?data.email:'';
        data.name = !isEmpty(data.name)?data.name:'';
        data.password1 = !isEmpty(data.password1)?data.password1:'';
        data.password2 = !isEmpty(data.password2)?data.password2:'';

        if(!Validator.isEmail(data.email)){
            errors.email = '邮箱格式错误！';
        }

        if(!Validator.isLength(data.name,{max:20})){
            errors.name = '昵称最好在20位以内哦';
        }

        if(!Validator.isLength(data.password1,{min:6,max:16})){
            errors.password1 = '密码应在6-16位之间';
        }

        if(!Validator.equals(data.password1,data.password2)){
            errors.password2 = '两次密码不一致';
        }

        return{
            errors,
            isValid: isEmpty(errors)
        }
    }

    // // 评论验证
    // loginValid:(data)=>{
    //     const errors = {};
    //     data.email = !isEmpty(data.email)?data.email:'';

    //     if(!Validator.isEmail(data.email)){
    //         errors.email = '邮箱格式错误！';
    //     }

    //     return{
    //         errors,
    //         isValid: isEmpty(errors)
    //     }
    // }
};