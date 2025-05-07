import React, { useState } from 'react'
import SearchBar from '../presentation/SearchBar'
import MockSpotifyData from '../../assets/data/MockSpotifyData'
import SearchResults from '../presentation/SearchResults'

const App = () => {

  // Keep track of user search input
  const [searchInput, setSearchInput] = useState('');
  // Keep track of search results
  const [searchResults, setSearchResults] = useState([
    {
      name: "example track name 1",
      artist: "example track artist 1",
      album: "example track album 1"
    },
    {
      name: "example track name 2",
      artist: "example track artist 2",
      album: "example track album 2"
    }
  ]);

  // Function to handle user search input
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value)
  };
  // Function to handle search
  const handleSearch = () => {
    const artistMatch = MockSpotifyData.find(({ artist }) => (
      artist.name.toLowerCase() === searchInput.trim().toLowerCase()
    ));
    setSearchResults((prevResults) => (
      {
        ...prevResults,
      }
    ))
    console.log(searchResults);
  };

  return (
    <main className='h-screen flex flex-col items-center'>
      <h1 className='header'>Ja<span>mmm</span>ing</h1>
      <div className="content-wrapper">
        <SearchBar
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
        />
        <SearchResults />
      </div>
    </main>
  )
}

export default App
