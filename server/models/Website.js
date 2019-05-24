const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 实例化数据模版
const WebsiteSchema = new Schema({ 
    user:{
        type:String,
        default:'匿名'
    },
    title:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }, 
    info:{
        type:String,
        default:''
    },
    note:{
        type:String,
        default:''
    },
    show:{
        type:Boolean,
        default:true
    },
    view:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        required:true
    },
    cover:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0
    },
    c_date:{
        type:Date,
        default:Date.now
    }
});

module.exports = Website = mongoose.model("website",WebsiteSchema);
