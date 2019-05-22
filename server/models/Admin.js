const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 实例化数据模版
const AdminSchema = new Schema({  
    name:{
        type:String,
        default:"admin"
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    c_date:{
        type:Date,
        default:Date.now
    }
});

module.exports = Admin = mongoose.model("admin",AdminSchema);
