import React, { useState } from 'react'
import SearchBar from '../presentation/SearchBar'

const App = () => {

  // Keep track of user search
  const [searchInput, setSearchInput] = useState('');

  // Function to handle user search input
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value)
  };
  // Function to handle search
  const handleSearch = () => {
    console.log(searchInput);
  };

  return (
    <>
      <h1 className='header'>Ja<span>mmm</span>ing</h1>
      <div className="content-wrapper">
        <SearchBar
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
        />
      </div>
    </>
  )
}

export default App
