const Task = require("../models/task.model");
const jwt = require("jsonwebtoken");
const Employee = require("../models/employee.model");

module.exports = {
    findAllTasks: (req,res) =>{
        Task.find()
            .populate("createdBy", "username email")
            .then((allTasks)=>{
                console.log(allTasks)
                res.json(allTasks)
            })
            .catch((err)=>{
                console.log("FindAllTasks has failed!")
                res.json(err)
            })
    },
    createTask: (req, res) =>{
        const newTaskObject = new Task(req.body);
        console.log(req.body)
        console.log(req.cookies.usertoken);
        const decodedJWT = jwt.decode(req.cookies.employeetoken,{
            complete:true
        })
        newTaskObject.createdBy = decodedJWT.payload.id;
        newTaskObject.save()
            .then((newTask) =>{
                console.log(newTask)
                res.json(newTask)
            })
            .catch((err)=>{
                console.log("CreateTask has failed!")
                res.json(err)
            })
    },
    findOneTask: (req,res)=>{
        Task.findOne({_id: req.params.id})
            .then((oneTask)=>{
                console.log(oneTask)
                res.json(oneTask)
            })
            .catch((err)=>{
                console.log("findOneTask has failed!")
                res.json(err)
            })
    },
    updateTask: (req, res) =>{
        Task.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators: true})
            .then((updateTask)=>{
                console.log(updateTask);
                res.json(updateTask);
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json(err);
            })
    },
    deleteTask: (req,res) =>{
        Task.findOneAndDelete({_id: req.params.id})
            .then((deletedTask)=>{
                console.log('hello');
                res.json(deletedTask)
            })
            .catch((err)=>{
                console.log('deleteEntry has failed!')
                res.json(err)
            })
    },
    findAllTasksByUser: (req, res)=>{
        if(req.jwtpayload.username !== req.params.username){
            console.log("Not the user!");
            Employee.findOne({username: req.params.username})
                .then((userNotLoggedIn)=>{
                    Task.find({createdBy: userNotLoggedIn._id})
                        .populate("createdBy", "username")
                        .then((allTasksFromUser)=>{
                            console.log(allTasksFromUser);
                            res.json(allTasksFromUser);
                        })
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(400).json(err);
                })
        }
        else{
            Task.find({createdBy: req.jwtpayload.id})
                .populate("createdBy", "username")
                .then((allTasksFromLoggedInUser)=>{
                    console.log(allTasksFromLoggedInUser)
                    res.json(allTasksFromLoggedInUser);
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(400).json(err);
                })
        }
    }
}