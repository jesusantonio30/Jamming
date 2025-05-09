import React from 'react'
import Track from './Track'

const Tracklist = ({ userSearch }) => {
  return (
    <ul>
        {userSearch.map((track) => (
            <Track track={track} trackID={track.id}/>
        ))}
    </ul>
  )
}

export default Tracklist
