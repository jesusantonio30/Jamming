import React, { useState } from 'react'
import SearchBar from '../presentation/SearchBar'
import MockSpotifyData from '../../assets/data/MockSpotifyData'
import SearchResults from '../presentation/SearchResults'
import Playlist from '../presentation/Playlist'

const App = () => {

  // State Variables
    // Keep track of user search input
    const [searchInput, setSearchInput] = useState('');
    // Keep track of search results
    const [searchResults, setSearchResults] = useState([]);
    // Playlist
    const [playlist, setPlaylist] = useState([]);
    // Playlist title
    const [playlistTitle, setPlaylistTitle] = useState('Playlist');

  // Search Logic
    // Function to handle user search input
    const handleSearchChange = (e) => {
      // Clears previous results on new search
      setSearchResults([]);
      // Updates search input
      setSearchInput(e.target.value);
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
            id: song.id
          }
        ))
        setSearchResults(songs);
        console.log(songs)
      } else {
        // If it isn't, log 'Nothing' to console and clear searchResults
        console.log('Nothing');
        setSearchResults([])
      }
    };

  // Playlist logic
    // Function to update playlist title
    const changePlaylistTitle = (name) => {
      setPlaylistTitle(name);
      console.log(playlistTitle);
    };
    // Function to add tracks to playlist
    const addTrack = (track) => {
      const trackExists = playlist.find((curTrack) => curTrack.id === track.id);
      const newPlaylist = playlist.concat(track);
      if(trackExists){
        console.log("Track already exists.")
      } else {
        setPlaylist(newPlaylist);
      }
    };
    // Function to remove tracks from playlist
    const removeTrack = (track) => {
      const newPlaylist = playlist.filter((curTrack) => curTrack.id !== track.id);
      setPlaylist(newPlaylist);
    };


  return (
    <>
      <div className="content-wrapper">
        <SearchBar
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
        />
        <section className="mediaContentSection">
          <SearchResults 
            userSearchResults = {searchResults}
            onAdd={addTrack}
          />
          <Playlist 
          onRemove={removeTrack} 
          playlistTitle={playlistTitle}
          playlist={playlist}
          onTitleChange={changePlaylistTitle}
          />
        </section>
      </div>
    </>
  )
}

export default App
