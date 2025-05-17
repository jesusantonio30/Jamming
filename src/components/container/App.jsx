import React, { useState, useEffect } from 'react'
import SearchBar from '../presentation/SearchBar'
import SearchResults from '../presentation/SearchResults'
import Playlist from '../presentation/Playlist'
import { generateAuthUrl, getToken, apiCall } from '../../assets/data/Spotify'


const App = () => {

  // State Variables
    // searchInput: Stores the current value of the search bar as the user types
    const [searchInput, setSearchInput] = useState('');
    // searchResults: Holds the array of tracks returned from Spotify after a search
    const [searchResults, setSearchResults] = useState([]);
    // playlist: Manages the array of tracks added to the custom playlist
    const [playlist, setPlaylist] = useState([]);
    // playlistTitle: Stores the title of the custom playlist, defaulting to 'Playlist'
    const [playlistTitle, setPlaylistTitle] = useState('Playlist');
    // isAuthenticated: Tracks whether the user is logged into Spotify (true/false)
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Handle Spotify authentication callback when the component mounts
    useEffect(() => {
      // Parse the query string from the URL to extract the authorization code
      const urlParams = new URLSearchParams(window.location.search);
      let code = urlParams.get('code');

      // Check if a code exists and hasn't been processed yet to avoid duplicate token requests
      if (code && !localStorage.getItem('code_processed')) {
        // Mark the code as processed to prevent reprocessing on re-renders
        localStorage.setItem('code_processed', 'true');

        // Use the authorization code to fetch an access token from Spotify
        getToken(code)
          .then(() => {
            setIsAuthenticated(true); // Update state to reflect successful login
            // Clean up the URL by removing query parameters for a cleaner look
            window.history.replaceState({}, document.title, '/');
          })
          .catch((err) => {
            console.error('Token retrieval failed:', err); // Log any errors during token retrieval
          })
          .finally(() => {
            // Clean up the processed flag to allow future authentications
            localStorage.removeItem('code_processed');
          });
      }
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    // Handle login button click to initiate Spotify authentication
    const handleLogin = async () => {
      // Generate the Spotify authorization URL and redirect the user to log in
      const authUrl = await generateAuthUrl();
      window.location.href = authUrl;
    };

  // Search Logic

    // Update search input as the user types in the search bar
    const handleSearchChange = (e) => {
      // Clear previous search results when the user starts a new search
      setSearchResults([]);
      // Update the search input state with the current value from the input field
      setSearchInput(e.target.value);
    };

    // Perform a search using the Spotify API when the user submits the search
    const handleSearch = async () => {
      if (!isAuthenticated) {
        console.log('Please log in to Spotify'); // Prompt login if the user isn't authenticated
        return;
      }
      try {
        // Call the Spotify API to search for tracks, encoding the search query for the URL
        const data = await apiCall(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchInput)}&type=track`);
        // Transform the API response into an array of track objects with relevant details
        const tracks = data.tracks.items.map((track) => ({
          songName: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          id: track.id,
        }));
        // Update the searchResults state with the retrieved tracks
        setSearchResults(tracks);
      } catch (error) {
        console.error('Search failed:', error); // Log any errors that occur during the search
      }
    };

  // Playlist Logic

    // Update the playlist title when the user changes it
    const changePlaylistTitle = (name) => {
      setPlaylistTitle(name); // Set the new title in state
    };

    // Add a track to the playlist if it's not already included
    const addTrack = (track) => {
      // Check if the track already exists in the playlist by comparing IDs
      const trackExists = playlist.find((curTrack) => curTrack.id === track.id);
      if (trackExists) {
        console.log("Track already exists."); // Notify if the track is a duplicate
      } else {
        // Add the new track to the playlist by spreading the existing tracks and adding the new one
        setPlaylist([...playlist, track]);
      }
    };

    // Remove a track from the playlist
    const removeTrack = (track) => {
      // Filter out the track with the matching ID to remove it from the playlist
      const newPlaylist = playlist.filter((curTrack) => curTrack.id !== track.id);
      setPlaylist(newPlaylist); // Update the playlist state with the new array
    };

    // Save the playlist to the user's Spotify account
    const savePlaylist = async () => {
      try {
        // Fetch the user's Spotify ID from the API
        const userData = await apiCall('https://api.spotify.com/v1/me');
        const userId = userData.id;
        // Create a new playlist in the user's account using the Spotify API
        const playlistData = await apiCall(`https://api.spotify.com/v1/users/${userId}/playlists`, 'POST', {
          name: playlistTitle,
          description: 'Playlist created from my app',
          public: false,
        });
        const playlistId = playlistData.id;
        // Generate an array of track URIs in the format required by Spotify
        const trackUris = playlist.map(track => `spotify:track:${track.id}`);
        // Add the tracks to the newly created playlist
        await apiCall(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, 'POST', {
          uris: trackUris,
        });
        console.log('Playlist saved successfully'); // Confirm the playlist was saved
      } catch (error) {
        console.error('Error saving playlist:', error); // Log any errors during the save process
      }
    };

  // Render the UI based on the user's authentication status
  return (
    <>
      <div className="content-wrapper">
        {!isAuthenticated ? (
          // Show a login button if the user is not authenticated
          <button className='loginSpotifyBtn' type="button" onClick={handleLogin}>Login with Spotify</button>
        ) : (
          // Show the search bar, search results, and playlist components if authenticated
          <>
            <SearchBar
              onSearchChange={handleSearchChange}
              onSearch={handleSearch}
            />
            <section className="mediaContentSection">
              <SearchResults 
                userSearchResults={searchResults}
                onAdd={addTrack}
              />
              <Playlist 
                onRemove={removeTrack} 
                playlistTitle={playlistTitle}
                playlist={playlist}
                onTitleChange={changePlaylistTitle}
                onSave={savePlaylist}
              />
            </section>
          </>
        )}
      </div>
    </>
  )
}

export default App