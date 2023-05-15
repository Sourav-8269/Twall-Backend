const mongoose=require("mongoose");

const taskSchema=mongoose.Schema({
    title:String,
    description:String,
    status:{
        type:Boolean,
        default:false
    }
});

const TaskModel=mongoose.model("task",taskSchema);

module.exports={TaskModel};