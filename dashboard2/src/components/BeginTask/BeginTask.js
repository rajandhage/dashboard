import React, { useEffect, useState } from 'react'
import {withRouter} from 'react-router';
import axios from 'axios';
import './BeginTask.css'

import Modal from "react-bootstrap/Modal";
// import "bootstrap/dist/css/bootstrap.min.css";

const BeginTask = ({history}) => {
    const [patientName, setPatientName] = useState('');
    const [diagnosis, setDiagnosis] = useState('')
    const [medicalRecordNumber, setMedicalRecordNumber] = useState('')
    const [dateAdmitted, setDateAdmitted] = useState('');
    const [showMessageOfAddData, setShowMessageOfAddData] = useState(false)
    const successMessage = "Record added successfully!!"
    const today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    const yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd;
    } 
    if(mm<10) {
        mm='0'+mm;
    }
    const maxDate = yyyy + '-'+mm+'-'+dd;
    const goToDashBoard = ()=>{
        history.push('/dashboard')
    }
   
    const clearInput = ()=>{
        setPatientName('');
        setDiagnosis('')
        setMedicalRecordNumber('')
        setDateAdmitted('')
    }
    
    const submitHandler = async (e)=>{
        e.preventDefault();
        try{
            const addRecordResponse = await axios.post("http://localhost:4000/record", {
                patient_name : patientName,
                diagnosis : diagnosis,
                medicle_record_number : medicalRecordNumber,
                date_admitted : dateAdmitted
            })

            if(addRecordResponse.data._id){
                setShowMessageOfAddData(true);
                await setTimeout(() => {
                setShowMessageOfAddData(false);
                }, 1000);
                clearInput();
            }
        }catch(err){
            alert('error occured while adding data');
        }
    }
    return (
        <>
        <div className="add-record-form-flex-cotainer">
            <form className="add-record-form" onSubmit={submitHandler}>
                <input type="text" value={patientName} id="patient-name" placeholder="Patient Name" required={true} onChange={(e)=>setPatientName(e.target.value.toString())}></input>
                <input type="text" value={diagnosis} id="diagnosis" placeholder="Diagnosis" required={true} onChange={(e)=>setDiagnosis(e.target.value.toString())}></input>
                <input type="number" value={medicalRecordNumber} id="medical-rec-no" placeholder="Medical Record Number" required={true} onChange={(e)=>setMedicalRecordNumber(e.target.value.toString())}></input>
                <input type="date" max={maxDate} value={dateAdmitted} id="admission-date" placeholder="Date Admitted" required={true} onChange={(e)=>setDateAdmitted(e.target.value)}></input>
                <button type="submit" id="submit-form">Add</button>
            </form>
        </div>
        <Modal show={showMessageOfAddData} className="successMessage">
            <Modal.Header>{successMessage}</Modal.Header>
        </Modal>
        <button className="goToDashboardTablePage" onClick={goToDashBoard}>Go Back</button>
        </>

    )
}

export default withRouter(BeginTask)
