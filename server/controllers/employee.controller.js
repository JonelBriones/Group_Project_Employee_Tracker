const Employee = require('../models/employee.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {
    register: (req,res)=> {
        const employee = new Employee(req.body);
        employee.save()
            .then((newEmployee)=> {
                console.log(newEmployee)
                console.log("Successfully Registered")
                res.json({
                    successMessage: "Thank you for registering",
                    employee: newEmployee
                });
            })
            .catch((err)=> {
                console.log("Register not successfull!")
                res.status(400).json(err);
            })
    },
    login: (req,res)=> {
        Employee.findOne({username: req.body.username})
            .then((employeeRecord)=> {
                if(employeeRecord === null){
                    res.status(400).json({message:"Invalid Login Attempt"})
                }
                else {
                    bcrypt.compare( req.body.password,employeeRecord.password)
                        .then((isPasswordValid)=> {
                            if(isPasswordValid) {
                                console.log("Password is valid")
                                res.cookie(
                                    "employeetoken",
                                    jwt.sign(
                                        {
                                            id: employeeRecord._id, 
                                            username: employeeRecord.username
                                        },
                                        process.env.JWT_SECRET
                                    ),
                                    {
                                        httpOnly:true,
                                        expires: new Date(Date.now()+ 28800000)
                                    },

                                ).json({
                                    message: "Successfully Login",
                                    employeeLoggedIn: employeeRecord.username,
                                    employeeId: employeeRecord._id
                                });
                                console.log("Login Successful")
                            }
                            else {
                                res.status(400).json({
                                    message:"Invalid Login Attempt"
                                })
                            }
                        })
                        .catch((err)=>{
                            console.log(err)
                            res.status(400).json({message:"Invalid Login Attempt"})
                        })
                }
            })
            .catch((err)=> {
                console.log(err)
                res.status(400).json({message:"Invalid Login Attempt"})
            })
    },
    logout: (req,res)=> {
        console.log("logging out");
        res.clearCookie("employeetoken");
        res.json({
            message:"You have successfully logged out!"
        })
    },
    getLoggedInEmployee: (req,res) => {
        Employee.findOne({_id:req.jwtpayload.id})
            .then((findLoggedInEmployee)=>res.json(findLoggedInEmployee))
            .catch((err)=>res.json(err))
        },
}




/* ------ CRUD FUNCTIONS ------*/

module.exports.createEmployee= (req,res) => {
    Employee.create(req.body)
        .then((createEmployee)=> {
            res.json(createEmployee)
            console.log(createEmployee);
        })
        .catch((err)=>{
            res.status(400).json(err)
            console.log("Something went wrong in creating employee");
        })
}
module.exports.getEmployee = (req,res) => {
    Employee.findOne({_id:req.params.id})
        .then((findOneEmployee) => {
            res.json(findOneEmployee)
            console.log(findOneEmployee);
        })
        .catch((err)=> {
            res.status(400).json(err)
            console.log("Something went wrong in finding employee");
        })
}
module.exports.updateEmployee = (req,res) => {
    Employee.findOneAndUpdate({_id:req.params.id},req.body)
        .then((updateEmployee) => {
            res.json(updateEmployee)
            console.log(updateEmployee);
        })
        .catch((err)=> {
            res.status(400).json(err)
            console.log("Something went wrong in updating employee");
        })
}
module.exports.getAllEmployees = (req,res) => {
    Employee.find({})
        .then((AllEmployees) => {
            res.json(AllEmployees)
            console.log(AllEmployees);
        })
        .catch((err)=> {
            res.status(400).json(err)
            console.log("Something went wrong in finding all employees");
        })
}

module.exports.deleteEmployee = (req,res) => {
    Employee.deleteOne({_id:req.params.id})
        .then((deleteEmployee) => {
            res.json(deleteEmployee)
            console.log(deleteEmployee);
        })
        .catch((err)=> {
            res.status(400).json(err)
            console.log("Something went wrong in deleting employee");
        })
}