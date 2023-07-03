const mongoose = require('mongoose');

const connection=mongoose.connect('mongodb+srv://bharat:bharat1234@mock3.irwuhsq.mongodb.net/?retryWrites=true&w=majority');

module.exports={connection};