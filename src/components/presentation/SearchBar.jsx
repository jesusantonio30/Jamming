import React from 'react'

const SearchBar = ({ search, onSearchChange, onSearch }) => {
  return (
    <div className='search'>
      <input className='searchInput' type="text" name="search" id="search" placeholder='What do you want to listen to?' value={search} onChange={onSearchChange}/>
      <button className='searchButton' type="button" onClick={onSearch}>SEARCH</button>
    </div>
  )
}

export default SearchBar
