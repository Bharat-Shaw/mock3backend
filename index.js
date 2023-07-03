const express = require('express');
require('dotenv').config();
const { connection } = require('./config/db');
const cors = require('cors');
const { authRouter } = require('./routes/auth');
const { dashRouter } = require('./routes/dashroute');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', authRouter);
app.use('/employees', dashRouter);

app.listen(4000, async () => {
    try {
        await connection;
        console.log('connected to db');
    } catch (error) {
        console.log(error)
    }
    console.log('server started at 4000')
})

