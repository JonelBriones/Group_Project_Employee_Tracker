const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [
            true,
            "Task requires a name!"
        ],
    },
    description:{
        type: String,
        required: [
            true,
            "Give a short description"
        ],
        minlength:[3, "Description must be at least 3 characters long!"
        ]
    },
    dueDate: {
        type: Date,
        required: [
            true,
            "Needs a due date!"
        ]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    }
}, {timestamps: true})

const Task = mongoose.model("Task", TaskSchema)
module.exports = Task