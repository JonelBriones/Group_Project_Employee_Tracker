const TaskController = require("../controllers/task.controller")
const {authenticate} = require('../config/jwt.config')
module.exports = (app) =>{
    app.get("/api/task", TaskController.findAllTasks)
    app.post("/api/task", authenticate, TaskController.createTask)
    
    app.get("/api/task/:id", TaskController.findOneTask)
    app.put("/api/task/:id", TaskController.updateTask)
    app.delete("/api/task/:id", TaskController.deleteTask)
    app.get("/api/taskByUser/:username", authenticate, TaskController.findAllTasksByUser);
}