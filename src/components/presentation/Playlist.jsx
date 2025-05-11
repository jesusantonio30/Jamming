import React from 'react'
import Tracklist from './Tracklist';

const Playlist = ({ onRemove, playlistTitle, playlist, onTitleChange }) => {

    // Function to update Title
    const handleTitleChange = ({target}) => {
        onTitleChange(target.value);
    };

    if(!playlist.length) return null;

  return (
    <section className='playlistContainer'>
      <input className='playlistInput' type="text" name="playlistTitle" id="playlistTitle" value={playlistTitle} onChange={handleTitleChange}/>
      <Tracklist userSearch={playlist} isRemoval={true} onRemove={onRemove}/>
      <button type="button" className='saveSpotifyBtn'>SAVE TO SPOTIFY</button>
    </section>
  )
}

export default Playlist
