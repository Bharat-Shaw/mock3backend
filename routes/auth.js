const express = require('express');
let jwt = require('jsonwebtoken');
const { Usermodel } = require('../models/User.model');
require('dotenv').config();
const bcrypt = require('bcrypt')

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const User = await Usermodel.findOne({ email })
    if (User) {
        res.send('User already exist');
    } 
    else {
        const hashPasswordPassword = bcrypt.hashSync(password, 6);
        const newUser = new Usermodel({
            email,
            password: hashPasswordPassword,
        });
        await newUser.save();
        res.send("Signup Successful");
    }
})

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await Usermodel.findOne({ email });
    if (!user) {
        res.send('Please Signup');
    } else {
        const hashPassword = user.password;
        const verifiedUser = bcrypt.compareSync(password, hashPassword);
        if (verifiedUser) {
            const token = jwt.sign({ employeeId: user._id }, process.env.SECRET);
            res.send({ msg: token });
        }
    }
})

module.exports = {authRouter};
