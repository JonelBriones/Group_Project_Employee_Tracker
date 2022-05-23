const EmployeeController = require('../controllers/employee.controller');
const {authenticate} = require("../config/jwt.config");

module.exports = (app) => {

    app.post('/api/employee/register', EmployeeController.register);
    app.post('/api/employee/login', EmployeeController.login);
    app.post('/api/employee/logout', EmployeeController.logout);
    app.get('/api/employees/employee',authenticate,EmployeeController.getLoggedInEmployee) 
    app.get('/api/employees/',EmployeeController.getAllEmployees) 
    app.put('/api/employee/edit/:id',EmployeeController.updateEmployee) 
    app.delete('/api/employee/delete/:id',EmployeeController.deleteEmployee) 
}