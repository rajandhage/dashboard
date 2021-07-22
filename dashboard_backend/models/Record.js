const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    case_number :{
        type : Number,
        required : true,
        unique : true
    },
    patient_name:{
        type: String,
        required : true
    },
    diagnosis:{
        type : String,
        required : true
    },
    medicle_record_number : {
        type : Number,
        // min : 1000000000,
        // max : 9999999999,
        required : true,
        // unique : true
    },
    date_admitted : {
        type : Date,
        required : true
    }
})

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;