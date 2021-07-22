const mongoose = require('mongoose');
const Id = require('../models/Id')

const setIdInit = async () => {
    try{
        const id = await Id.findOne({id_name:'case_number'});
        if(!id){
            const case_number = new Id({id_name : 'case_number', id : 1});
            const case_number_obj = await case_number.save();
            return case_number_obj;
        }
        return id;
    }catch{
        throw new Error('database connection error')
    }
}


//this function returns id and increments id by 1
const getCurrentId = async (id_name)=>{
    const id = await Id.findOne({id_name});
    const current_id = id.id;
    //increment id
    id.id += 1;
    await id.save();
    return current_id;
}

const decrementCurrentId = async(id_name)=>{
    const id = await Id.findOne({id_name});
    id.id -= 1;
    await id.save();
}

module.exports = {
    setIdInit,
    getCurrentId,
    decrementCurrentId
}