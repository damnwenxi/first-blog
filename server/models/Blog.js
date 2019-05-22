const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 实例化数据模版
const BlogSchema = new Schema({  
    title:{
        type:String,
        required:true
    }, 
    author:{
        type:String,
        ref:'admin',
        required:true
    },
    last_change_time:{
        type:Date,
        default:Date.now
    },
    view:{
        type:Number,
        default:0
    },
    comments:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true       
    },
    summary:{
        type:String,
        required:true       
    },
    cover:{
        type:String
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

module.exports = Blog = mongoose.model("blog",BlogSchema);
