import React from 'react'
// import {withRouter} from 'react-router';
import { useHistory } from 'react-router';
import './SearchBar.css'


const SearchBar = ({setSearchQuery}) => {
    const history = useHistory();
    const goToBeginTask = ()=>{
       history.push("/begin-task");
    }
    return (
         
        <div className="SearchBarRectangle">
                <div className="SearchBox" >
                    <span className="lense">
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.7812 13.8438L12.6562 10.7188C12.5 10.5938 12.3125 10.5 12.125 10.5H11.625C12.4688 9.40625 13 8.03125 13 6.5C13 2.9375 10.0625 0 6.5 0C2.90625 0 0 2.9375 0 6.5C0 10.0938 2.90625 13 6.5 13C8 13 9.375 12.5 10.5 11.625V12.1562C10.5 12.3438 10.5625 12.5312 10.7188 12.6875L13.8125 15.7812C14.125 16.0938 14.5938 16.0938 14.875 15.7812L15.75 14.9062C16.0625 14.625 16.0625 14.1562 15.7812 13.8438ZM6.5 10.5C4.28125 10.5 2.5 8.71875 2.5 6.5C2.5 4.3125 4.28125 2.5 6.5 2.5C8.6875 2.5 10.5 4.3125 10.5 6.5C10.5 8.71875 8.6875 10.5 6.5 10.5Z" fill="#A2AFC0"/>
                        </svg>
                    </span>

                    <input className="inputBox" placeholder="Search cases" type="text" onChange={(e)=>setSearchQuery(e.target.value)}/>
                </div>
                <div className="FilterText">
                    FILTER
                </div>
                <div className="FilterLogo">
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.89 0.75H2.13998C1.0853 0.75 0.264984 1.60938 0.264984 2.625V16.375C0.264984 17.4297 1.0853 18.25 2.13998 18.25H15.89C16.9056 18.25 17.765 17.4297 17.765 16.375V2.625C17.765 1.60938 16.9056 0.75 15.89 0.75ZM8.07748 8.25H7.13998V15.2812C7.13998 15.5547 6.90561 15.75 6.67123 15.75H5.10873C4.8353 15.75 4.63998 15.5547 4.63998 15.2812V8.25H3.70248C3.15561 8.25 2.76498 7.85938 2.76498 7.3125V6.6875C2.76498 6.17969 3.15561 5.75 3.70248 5.75H4.63998V3.71875C4.63998 3.48438 4.8353 3.25 5.10873 3.25H6.67123C6.90561 3.25 7.13998 3.48438 7.13998 3.71875V5.75H8.07748C8.5853 5.75 9.01498 6.17969 9.01498 6.6875V7.3125C9.01498 7.85938 8.5853 8.25 8.07748 8.25ZM15.265 12.3125C15.265 12.8594 14.8353 13.25 14.3275 13.25H13.39V15.2812C13.39 15.5547 13.1556 15.75 12.9212 15.75H11.3587C11.0853 15.75 10.89 15.5547 10.89 15.2812V13.25H9.95248C9.40561 13.25 9.01498 12.8594 9.01498 12.3125V11.6875C9.01498 11.1797 9.40561 10.75 9.95248 10.75H10.89V3.71875C10.89 3.48438 11.0853 3.25 11.3587 3.25H12.9212C13.1556 3.25 13.39 3.48438 13.39 3.71875V10.75H14.3275C14.8353 10.75 15.265 11.1797 15.265 11.6875V12.3125Z" fill="#01C3BF"/>
                    </svg>
                </div>

                <button className="BeginTask" onClick={goToBeginTask}>BEGIN A TASK</button>

        </div>  
        
    )
}

export default SearchBar
