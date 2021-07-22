import React,  { useState, useEffect } from 'react';
import './Pagination.css'

const Pagination = ({ rowsPerPage, totalRows, paginate, currentPage }) => {
  const pageNumbers = [];
  const [styleOfCurrentPageButton, setStyleOfCurrentPageButton] = useState({})
  const [showPage, setShowPage] = useState( currentPage);
  
  useEffect(()=>{
    setShowPage(currentPage);
  }, [currentPage])

  useEffect(()=>{
    if(currentPage === showPage){
      setStyleOfCurrentPageButton({background:'#92A9B4'})
    }else{
     setStyleOfCurrentPageButton({})
    }
  }, [currentPage, showPage])
  for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i);
  }
  
  const showNextPages =  ()=>{
    
    if(showPage + 3 < pageNumbers.length){
      setShowPage(showPage + 3)
    }
  }

  const checkAndGoToBackPage = ()=>{
    if(0 === currentPage - 1){
      paginate(1);
    }else{
      paginate(currentPage - 1)
    }
  }
  
  const goToFirstPage = ()=>{
    paginate(1)
    setShowPage(1)
  }
  return (
    <nav>
      <div className="pagination-keys">
        <button className="key1" onClick={goToFirstPage} disabled={0 === (showPage - 1)} >{'<<'}</button>
        <button className="key2" onClick={checkAndGoToBackPage} disabled={(0 === (showPage-1)) || (0 === (currentPage-1))}>{'<'}</button>
        <button className="key3" onClick={()=>paginate(showPage-1)} disabled={0 >= (showPage-1)}>{showPage-1}</button>
        <button className="key4" onClick={()=>paginate(showPage)} style={styleOfCurrentPageButton}>{showPage}</button>
        <button className="key5" onClick={()=>paginate(showPage+1)} disabled={showPage >= pageNumbers.length}>{showPage+1}</button>
        <button className="key6" disabled={showPage >= pageNumbers.length} onClick={showNextPages}>{'...'}</button>
        <button className="key7" onClick={()=>paginate(currentPage + 1)} disabled={showPage === pageNumbers.length}>{'>'}</button>
        <button className="key8" onClick={()=>paginate(pageNumbers.length)} disabled={showPage === pageNumbers.length}>{'>>'}</button>
        
      </div> 
    </nav>
  );
};

export default Pagination;