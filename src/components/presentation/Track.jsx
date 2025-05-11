import React from 'react'

const Track = ({ track, isRemoval, onAdd, onRemove }) => {

  const handleRemove = () => {
    onRemove(track);
  };
  const handleAdd = () => {
    onAdd(track);
  };

  // Function to add buttons to each track depending if they're on search results or playlist
  const renderAction = () => {
    if(isRemoval){
      return <button type="button" className='addRemoveBtn' onClick={handleRemove}>-</button>
    } else {
      return <button type="button" className='addRemoveBtn' onClick={handleAdd}>+</button>
    }
  };

  return (
    <li className='trackContainer'>
      <div className='track'>
        <h3 className='trackHeader'>{track.songName}</h3>
        <p className='trackArtistInfo'>{track.artist} | {track.album}</p>
      </div>
      {renderAction()}
    </li>
  )
}

export default Track
