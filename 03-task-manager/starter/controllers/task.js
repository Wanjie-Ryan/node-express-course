const Task = require('../models/task')

const getTasks = async (req, res)=>{


    try{


        // gets all the documents in the collection of the database
     const tasks = await Task.find({})

        // res.status(200).json({tasks})

        //option 2

        res.status(200).json({success: true, data:{tasks}})
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

        res.status(error.status).json({msg: error })

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

const updateTask = async (req, res)=>{
    
    // res.send('Update a task using patch')

    try{

        const {id:taskID} = req.params
        const task = await Task.findOneAndUpdate({_id:taskID}, req.body,{
            new:true, // helps you get the new value back
            runValidators: true // activates the validators
        })

        if(!task){
            res.status(404).json({message:`Task with id:${taskID} cannot be found`})
        }
        res.status(200).json({task})
    }

    catch(error){

        res.status(500).json({msg:error})


    }
}
    

// const editTask = async(req, res)=>{



//     try{

//         const {id:taskID} = req.params
//         const task = await Task.findOneAndUpdate({_id:taskID}, req.body,{
//             new:true, // helps you get the new value back
//             runValidators: true,
//             overwrite:true // activates the validators
//         })

//         if(!task){
//             res.status(404).json({message:`Task with id:${taskID} cannot be found`})
//         }
//         res.status(200).json({task})
//     }

//     catch(error){

//         res.status(500).json({msg:error})


//     }

// }

// editTask is a put method where put updates and replaces the existing resource using the overwrite method
// patch method only partially updates the existing resource


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