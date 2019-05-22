const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 实例化数据模版
const FilesSchema = new Schema({  
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    size:{
        type:String
    },
    c_date:{
        type:Date,
        default:Date.now
    }
});

module.exports = Files = mongoose.model("files",FilesSchema);
