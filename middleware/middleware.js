require('dotenv').config();
var jwt = require('jsonwebtoken');

const authmiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    console.log(token)
    if(!token){
         res.send("Please Login")
    }else {
        jwt.verify(token, process.env.SECRET, (err, decoded)=>{
            const {employeeId} = decoded
            req.employeeId = employeeId;
            if(decoded) {
                next();
            } else {
                res.status(400).send("Please Login");
            }
        })
    }
    
}

module.exports = {authmiddleware}
