const express =require('express')
const router=express.Router()
const Task=require('../models/task');

router.post('/tasks',async(req,res)=>{
    try {
        const{title,description,status,priority}=req.body;
        const task=new Task({title,description,status,priority})
        await task.save();
        res.status(201).json({message:'Task created successfully',task})
    } catch (error) {
        console.error('Error creating task',error)
        res.status(500).json({message:'Failed to create task '})
    }
})

router.get('/tasks',async(req,res)=>{
    try {
        const tasks=await Task.find()
        res.status(200).json({message:'tasks fetched successfully',tasks})
    } catch (error) {
        console.error('Error fetching tasks')
        res.status(500).json({message:'tasks fetching failed'})
    }
})

router.put('/tasks/:id',async(req,res)=>{
    try {
        const {taskId}=req.params
        const {title,description,status,priority}=req.body
        const updatedTask=await Task.findOneAndUpdate({taskId},{
            title,description,status,priority
        },{new:true})
        if(!updatedTask){
            res.status(404).json({message:'Error finding task'})
        }
        else{
            res.status(200).json({task:updatedTask})
        }
    } catch (error) {
        console.error('Failed to update task ',error)
    res.status(500).json({message:'Task updation failed'})
    }
})

router.delete ('/tasks/:id',async(req,res)=>{
    try {
        const {taskId}=req.params;
        const deletedTask=await Task.findOneAndDelete({taskId})
        if(!deletedTask){
            res.status(404).json({message:'Error finding task'})
        }
        else{
            res.status(200).json({message:'Task deleted successfully'})
        }
    } catch (error) {
        console.error('Failed to delete task ',error)
        res.status(500).json({message:'task deletion failed'})
    }
})

module.exports=router
    
