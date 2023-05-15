const express=require("express");
const { TaskModel } = require("../models/task.model");

const TaskRouter=express.Router();

TaskRouter.get("/",async(req,res)=>{
    try{
        let tasks=await TaskModel.find();
        res.send(tasks);
    }catch(err){
        res.send("Something Went Wrong");
        console.log(err);
    }
})

TaskRouter.get("/single/:id",async (req,res)=>{
    const id=req.params.id
    try{
        const task=await TaskModel.findById({_id:id});
        res.send(task);
    }catch(err){
        res.send("Something Went Wrong");
        console.log(err);
    }
})

TaskRouter.post("/add",async(req,res)=>{
    let payload=req.body;
    try{
        const task=new TaskModel(payload);
        await task.save();
        res.send("Added Task");
    }catch(err){
        res.send("Something Went Wrong");
        console.log(err);
    }
})

TaskRouter.patch("/edit/:id",async(req,res)=>{
    const id=req.params.id;
    const payload=req.body;
    try{
        await TaskModel.findByIdAndUpdate({_id:id},payload,{new:true});
        res.send(`Updated Task with id ${id}`);
    }catch(err){
        res.send("Something Went Wrong");
        console.log(err);
    }
})

TaskRouter.put("/replace/:id",async (req,res)=>{
    const id=req.params.id
    const payload=req.body;
    try{
        await TaskModel.findOneAndReplace({_id:id},payload);
        res.send(`Replaced Task with id ${id}`);
    }catch(err){
        res.send("Something Went Wrong");
        console.log(err);
    }
})

TaskRouter.delete("/delete/:id",async (req,res)=>{
    const id=req.params.id
    try{
        await TaskModel.findByIdAndDelete({_id:id});
        res.send(`Deleted Task with id ${id}`);
    }catch(err){
        res.send("Something Went Wrong");
        console.log(err);
    }
})

module.exports={TaskRouter};