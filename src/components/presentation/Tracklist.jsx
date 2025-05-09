import React from 'react'
import Track from './Track'

const Tracklist = ({ userSearch }) => {
  return (
    <ul>
        {userSearch.map((track) => (
            <Track key={track.id} track={track}/>
        ))}
    </ul>
  )
}

export default Tracklist
