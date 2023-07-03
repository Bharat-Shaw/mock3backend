const mongoose = require('mongoose');

const employeeschema = mongoose.Schema({
    firstName: { required: true, type: String },
    lastName: { required: true, type: String },
    email: { required: true, type: String },
    department: { required: true, type: String },
    salary: { required: true, type: String }
})

const Employeemodel=mongoose.model('employee', employeeschema);

module.exports={Employeemodel};