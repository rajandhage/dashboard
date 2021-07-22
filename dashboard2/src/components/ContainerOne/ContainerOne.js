import './ContainerOne.css'
// import './ContainerOne2.css'
import React, {useState, useEffect} from 'react'

import DataTable from './components/DataTable/DataTable'
import Pagination from './components/Pagination/Pagination'
import axios from 'axios'

const ContainerOne = ({searchQuery}) => {
    useEffect(()=>{
        paginate(1); 
    }, [searchQuery])

    const [dataA, setDataA] = useState([]);
    //this const state needs to be changed if we want to refetch the data
    const [changeStateForFetchData, setChangeStateForFetchData] = useState('')
    //data fetching
    useEffect(async ()=>{
        const fetchedData = await fetchData();
        setDataA(fetchedData.data)
        console.log(fetchedData.data);
    }, [changeStateForFetchData])

    //properties needed to paginate table
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    //properties needed for search
    const searchQueryLowerCase = searchQuery.toLowerCase().trim();

    const fetchData = async ()=>{
        const fetch = await axios.get('http://localhost:4000/records')
                                    .catch((err)=>console.log(err));
        // console.log(fetch);
        return fetch;
    }

    const searchedData = dataA.filter((row) =>{
        if(row.case_number.toString().toLowerCase().includes(searchQueryLowerCase) || row.patient_name.toLowerCase().includes(searchQueryLowerCase) || row.date_admitted.includes(searchQueryLowerCase)
        || row.medicle_record_number.toString().includes(searchQueryLowerCase) ){
            return true;
        }
        return false;
    })

    //using filtered data get data neeeded for current page
    //get current rows
    
    const currentRows = searchedData.slice(indexOfFirstRow, indexOfLastRow)

    return (
        <div className="containerOne">
            <div className="textDashboard">
                DASHBOARD
            </div>
            <div className="datatable">
                <DataTable  currentRows={currentRows} setChangeStateForFetchData={setChangeStateForFetchData}/>
            </div>
            <div className="paginationKeys">
                <Pagination
                    rowsPerPage={rowsPerPage}
                    totalRows={searchedData.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </div>
    )
} 

export default ContainerOne
