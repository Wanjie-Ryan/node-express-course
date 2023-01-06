const Task = require('../models/task')

const getTasks = async (req, res)=>{


    try{


        // gets all the documents in the collection of the database
     const tasks = await Task.find({})
        res.status(200).json({tasks})
    }

    catch(error){

        res.status(500).json({msg:error})
    }


    
}


const postTasks = async (req, res)=>{

    try{
        
        const task = await Task.create(req.body)
    
        // res.send('create a task')
    
        res.status(201).json({task})
    }
    catch (error){

        res.status(500).json({msg: error })

        // res.status(500).json({msg:'An error has occurred' })



    }


}

const getSingleTask = async (req, res)=>{

    // res.send('Get a single task by id')
    // res.json({id:req.params.id})

    try{

        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID})

        if(!task){
            return res.status(404).json({msg: `No task with id ${taskID} found`})
        }

        res.status(200).json({task})


    }

    catch(error){

        res.status(500).json({msg:error})
    }


}

const updateTask = (req, res)=>{

    res.send('Update a task using patch')
}

const deleteTask =  async (req, res)=>{

    // res.send('delete a task using id')

    try{
        
        const {id:taskID} = req.params
        const task = await Task.findOneAndDelete({_id:taskID})
    
        if(!task){
            return res.status(404).json({message: `task with ${taskID} not found`})
        }
    
        res.status(200).json({task})
    }

    catch(error){

        res.status(500).json({msg: error})
    }



}




module.exports ={

    getTasks,
    postTasks,
    getSingleTask,
    updateTask,
    deleteTask
}