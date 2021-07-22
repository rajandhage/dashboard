const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/dashboard-patient-data', {
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useCreateIndex : true
}, ()=> console.log('connected to database'))