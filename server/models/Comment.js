const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 实例化数据模版
const CommentSchema = new Schema({  
    user:{
        type:String,
        ref:'user',
        required:true
    },
    content:{
        type:String,
        default:''
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

module.exports = Comment = mongoose.model("comment",CommentSchema);
