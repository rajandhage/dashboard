const express = require('express')
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const Record = require('./models/Record');
require('./db_connect/connect')
const recordOps = require('./routes/RecordOperations')
const IdOps = require('./routes/IdOps')
const cors = require("cors");

dotenv.config();
const port = process.env.BACKEND_PORT || 4000;

var corsOptions = {
    origin: "*"
  };
  
app.use(cors(corsOptions));

const setIdInit = async ()=>{
    const a = await IdOps.setIdInit();
    // console.log(a);
}
setIdInit();

app.use(express.json())
app.use(recordOps);


app.listen(port, ()=>console.log('server is running on port ', port));