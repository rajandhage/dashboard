const mongoose = require('mongoose');


const IdSchema = new mongoose.Schema({
    id_name : {
        type : String, 
        required : true,
        unique : true
    },
    id : {
        type : Number,
        required : true
    }
})

const Id = mongoose.model('Id', IdSchema);
module.exports = Id;