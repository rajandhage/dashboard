import React, {useState} from 'react' 
import './Dashboard.css'

import NavBar from '../NavBar/NavBar'
import SearchBar from '../SearchBar/SearchBar'
import ContainerOne from '../ContainerOne/ContainerOne'

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
 
    return (
      <div className="dashboard">
        {/* <div className="navbar">
          <NavBar/>
        </div> */}
        <div className="searchbar">
            <SearchBar setSearchQuery={setSearchQuery}/>
        </div>
        <div className="containerone">
          <ContainerOne searchQuery={searchQuery}/>
        </div>
        </div> 

    ) 
} 

export default Dashboard
