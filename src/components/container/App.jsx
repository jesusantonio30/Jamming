import React, { useState } from 'react'
import SearchBar from '../presentation/SearchBar'
import MockSpotifyData from '../../assets/data/MockSpotifyData'
import SearchResults from '../presentation/SearchResults'

const App = () => {

  // Keep track of user search input
  const [searchInput, setSearchInput] = useState('');
  // Keep track of search results
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle user search input
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value)
  };
  // Function to handle search
  const handleSearch = () => {
    // Checking if searchInput is in mock data
    const artistMatch = MockSpotifyData.find(({ artist }) => (
      artist.name.toLowerCase() === searchInput.trim().toLowerCase()
    ));
    // If it is, format the data and update searchResults
    if (artistMatch) {
      const songs = artistMatch.artist.songs.map(song => (
        {
          songName: song.name,
          artist: artistMatch.artist.name,
          album: song.album,
          id: artistMatch.artist.id
        }
      ))
      setSearchResults(songs);
      console.log(songs)
    } else {
      console.log('Nothing');
      setSearchResults([])
    }
  };

  return (
    <>
      <h1 className='header'>Ja<span>mmm</span>ing</h1>
      <div className="content-wrapper">
        <SearchBar
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
        />
        <SearchResults 
          userSearchResults = {searchResults}
        />
      </div>
    </>
  )
}

export default App
