import React from 'react'

const Track = ({ track, key }) => {
  return (
    <li className='trackContainer' key={key}>
        <h3 className='trackHeader'>{track.songName}</h3>
        <p className='trackArtistInfo'>{track.artist} | {track.album}</p>
    </li>
  )
}

export default Track
