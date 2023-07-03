const express = require("express");
const { Employeemodel } = require("../models/Employee.modal");
const dashRouter = express.Router();

dashRouter.get("/", async (req, res) => {
    const query = req.query;
    const user_id=req.employeeId;
    const employee = await Employeemodel.find({ author_id: user_id, ...query})
    res.status(200).send(employee)
})

dashRouter.post("/create", async (req, res) => {
    const { firstName, lastName, email, department, salary } = req.body
    const empId = req.employeeId;
    const employee = new Employeemodel({
        firstName,
        lastName,
        email,
        department,
        salary,
        empId
    })
    await employee.save();
    res.status(201).send({ "msg": "Employee data added" })
})

dashRouter.put("/edit/:_id", async (req, res) => {
    const { _id } = req.params
    const employeeID = req.employeeID
    const employee = await Employeemodel.findOne({ _id: _id })
    const emp_id = employee.emp_id

    if (emp_id === employeeID) {
        const { firstName, lastName, email, department, salary } = req.body;
        try {
            const updatedDetails = await Employeemodel.findByIdAndUpdate(_id, {
                firstName,
                lastName,
                email,
                department,
                salary,
                emp_id
            })

            if (!updatedDetails) {
                res.status(404).send("Employee data not found")
            } else {
                res.status(200).send("Employee data updated")
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        res.send("You are not Authorised")
    }
})

dashRouter.delete("/delete/:_id", async (req, res) => {
    const { _id } = req.params
    const employeeID = req.employeeID
    const employee = await Employeemodel.findOne({ _id: _id })
    const emp_id = employee.emp_id

    if (emp_id === employeeID) {
        await Employeemodel.findOneAndDelete({ _id: _id })
        res.status(200).send("Employee data deleted")
    } else {
        res.send("You are not Authorised")
    }
})

module.exports = {dashRouter}