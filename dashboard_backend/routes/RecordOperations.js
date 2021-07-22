const router = require('express').Router();
const Record = require('../models/Record');
const IdOps = require('../routes/IdOps')

router.post('/record', async (req, res) => {
    try{
        const record = new Record();
        record.case_number = await IdOps.getCurrentId('case_number');
        record.patient_name = req.body.patient_name.toString().trim();
        record.diagnosis = req.body.diagnosis.toString().trim();
        record.medicle_record_number = parseInt(req.body.medicle_record_number);
        record.date_admitted = new Date(req.body.date_admitted);

        const reply = await record.save();
        res.status(201).send(reply)
    }catch(err){
        await IdOps.decrementCurrentId('case_number');
        res.send(err);
    }
})

router.get('/records', async(req, res)=>{
    try {
        const allRecord = await Record.find({}).sort({case_number : -1});
        res.status(200).send(allRecord);
    } catch (err) {
        res.send(err)
    }
})

router.put('/record/:case_number', async(req, res)=>{
    try {
        // console.log(req.params.case_number);
        const updates = Object.keys(req.body);
        const record = await Record.findOne({case_number : req.params.case_number})
        if(!record){
            res.status(404).send();
        }
        updates.forEach((update)=>record[update]= req.body[update])
        await record.save();
        return res.send(record);
    } catch (err) {
        return res.status(400).send();
    }
})
module.exports = router;