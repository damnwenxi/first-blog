const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 实例化数据模版
const UserSchema = new Schema({  
    name:{
        type:String,
        default:"passer"
    },
    email:{
        type:String
    },
    ip:{
        type:String
    },
    source:{
        type:String
    },
    avatar:{
        type:String
    },
    c_date:{
        type:Date,
        default:Date.now
    }
});

module.exports = User = mongoose.model("user",UserSchema);
