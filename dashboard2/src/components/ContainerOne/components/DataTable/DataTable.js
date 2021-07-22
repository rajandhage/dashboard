import React, { useState } from 'react'
import axios from 'axios';
import './DataTable.css'
const DataTable = ({currentRows, setChangeStateForFetchData}) => {
    const [expandedForEdit, setExpandedForEdit] = useState(new Set());
    const adjustDateFormat = (date)=>{ 
        const stdDate = new Date(date);
        const month = stdDate.getMonth() + 1;
        return stdDate.getDate() + '/' + month + '/' + stdDate.getFullYear();
    }
    const tableColumnHeaders = ['Case Number', 'Patient Name', 'Diagnosis', 'Medical record No.', 'Date Admitted','', 'Report Status']
    
    const handleExpandedRowList = (case_number)=>{
        let tempExpandedForEdit = new Set(expandedForEdit);
        if(tempExpandedForEdit.has(case_number)){
            tempExpandedForEdit.delete(case_number)
        }else{
            tempExpandedForEdit = new Set();
            tempExpandedForEdit.add(case_number);
        }
        setExpandedForEdit(tempExpandedForEdit)
    }
    //---------------------edit form functions
    const clearInput = ()=>{
        setPatientName('');
        setDiagnosis('')
        setMedicalRecordNumber('')
        setDateAdmitted('')
    }
    const [patientName, setPatientName] = useState('');
    const [diagnosis, setDiagnosis] = useState('')
    const [medicalRecordNumber, setMedicalRecordNumber] = useState('')
    const [dateAdmitted, setDateAdmitted] = useState('');
    const [caseNumber, setCaseNumber] = useState(0)
    const submitHandler = async (e)=>{
        e.preventDefault();
        // console.log('confirmed', patientName, diagnosis, medicalRecordNumber, dateAdmitted);
        const reqData = {}
        if(patientName.trim() !== '')
            reqData.patient_name = patientName
        if(diagnosis.trim() !== '')
            reqData.diagnosis = diagnosis
        if(medicalRecordNumber)
            reqData.medicle_record_number = medicalRecordNumber
        if(dateAdmitted.trim() !== '')
            reqData.date_admitted = dateAdmitted
        try {
            const editResponse = await axios.put('http://localhost:4000/record/'+caseNumber, reqData)
            console.log('request sent');
            if(editResponse.data._id){
                // alert('edit succesfull')
                // window.location.reload();
                setChangeStateForFetchData(new String(''))
                clearInput();
                
            }
            console.log('respnse failed');
        } catch (err) {
                alert(err)
        }
    }
    //-----------------------------------

    const renderElement = (row)=>{
        const onEditButtonClick = ()=> {
                                        setCaseNumber(row.case_number)
                                        handleExpandedRowList(row.case_number)
                                        }
        const normalRow =   <tr key={"row_number" + row.case_number}>
                                <td id="d1">{row.case_number}</td>
                                <td id="d2">{row.patient_name}</td>
                                <td id="d3">{row.diagnosis}</td>
                                <td id="d4">{row.medicle_record_number}</td>
                                <td id="d5">{adjustDateFormat(row.date_admitted.split('T')[0])}</td>
                                <td id="d6">
                                    <button className="Edit" onClick={()=>onEditButtonClick(row.case_number)}> {'>'} EDIT</button>
                                </td>
                                <td id="d7">
                                    <div>
                                    <button className="Report">Report</button>
                                    <button className="Approve">Approve</button>
                                    <svg className="Setting" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.2188 9.875L13.875 9.125C14.0312 8.375 14.0312 7.65625 13.875 6.90625L15.2188 6.15625C15.375 6.0625 15.4375 5.875 15.375 5.71875C15.0312 4.59375 14.4375 3.59375 13.6875 2.75C13.5625 2.625 13.375 2.59375 13.2188 2.6875L11.875 3.4375C11.3125 2.96875 10.6875 2.59375 10 2.34375V0.8125C10 0.65625 9.875 0.5 9.6875 0.46875C8.53125 0.1875 7.375 0.21875 6.28125 0.46875C6.09375 0.5 6 0.65625 6 0.8125V2.34375C5.28125 2.59375 4.65625 2.96875 4.09375 3.46875L2.75 2.6875C2.59375 2.59375 2.40625 2.625 2.28125 2.75C1.53125 3.59375 0.9375 4.59375 0.59375 5.71875C0.53125 5.875 0.59375 6.0625 0.75 6.15625L2.09375 6.90625C1.96875 7.65625 1.96875 8.375 2.09375 9.125L0.75 9.875C0.59375 9.96875 0.53125 10.1562 0.59375 10.3125C0.9375 11.4375 1.53125 12.4375 2.28125 13.2812C2.40625 13.4062 2.59375 13.4375 2.75 13.3438L4.09375 12.5938C4.65625 13.0625 5.28125 13.4375 6 13.6875V15.2188C6 15.375 6.125 15.5312 6.28125 15.5938C7.4375 15.8438 8.59375 15.8125 9.6875 15.5938C9.875 15.5312 10 15.375 10 15.2188V13.6875C10.6875 13.4375 11.3125 13.0625 11.875 12.5938L13.2188 13.3438C13.375 13.4375 13.5625 13.4062 13.6875 13.2812C14.4688 12.4375 15.0312 11.4375 15.4062 10.3125C15.4375 10.1562 15.375 9.96875 15.2188 9.875ZM8 10.5C6.59375 10.5 5.5 9.40625 5.5 8C5.5 6.625 6.59375 5.5 8 5.5C9.375 5.5 10.5 6.625 10.5 8C10.5 9.40625 9.375 10.5 8 10.5Z" fill="#8492A6"/>
                                    </svg>
                                    </div>
                                </td>
                            </tr>;
        var expandedRow;
        if(expandedForEdit.has(row.case_number)){
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
            expandedRow = <tr key={"expanded_row_number" + row.case_number}>
                            <td colSpan="7" className="editForm">
                                <form className="edit-record-form" onSubmit={(e)=>{
                                                                    setCaseNumber(row.case_number)
                                                                    submitHandler(e)}}>
                                    <input type="text" value={patientName} id="edit-patient-name" placeholder="Patient Name" required={false} onChange={(e)=>setPatientName(e.target.value.toString())}></input>
                                    <input type="text" value={diagnosis} id="edit-diagnosis" placeholder="Diagnosis" required={false} onChange={(e)=>setDiagnosis(e.target.value.toString())}></input>
                                    <input type="number" value={medicalRecordNumber} id="edit-medical-rec-no" placeholder="Medical Record Number" required={false} onChange={(e)=>setMedicalRecordNumber(e.target.value.toString())}></input>
                                    <input type="date" max={maxDate} value={dateAdmitted} id="edit-admission-date" placeholder="Date Admitted" required={false} onChange={(e)=>setDateAdmitted(e.target.value)}></input>
                                    <button type="submit" id="edit-submit-form">Update</button>
                                </form>
                            </td>
                        </tr>
            return [normalRow, expandedRow];
        }else{
            return [normalRow]
        }
    }
    const tableBodyData = currentRows.map((row)=>{
        const temp = renderElement(row);
        return temp;
    })
    return (
        <div>
            <table> 
            <thead>
                <tr> 
                    <th style={{width:"13%"}}>{tableColumnHeaders[0]}</th>
                    <th style={{width:"15%"}}>{tableColumnHeaders[1]}</th>
                    <th style={{width:"15%"}}>{tableColumnHeaders[2]}</th>
                    <th style={{width:"13%"}}>{tableColumnHeaders[3]}</th>
                    <th style={{width:"12%"}}>{tableColumnHeaders[4]}</th>
                    <th style={{width:"9%"}}>{tableColumnHeaders[5]}</th>
                    <th style={{width:"30%"}}>{tableColumnHeaders[6]}</th>
                </tr>
            </thead>
            <tbody> 
                    {tableBodyData}
            </tbody> 
        </table>
        </div>
    )
}

export default DataTable
