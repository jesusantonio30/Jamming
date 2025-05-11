import React from 'react'
import Track from './Track'

const Tracklist = ({ userSearch, isRemoval, onAdd, onRemove }) => {
    
  return (
    <ul>
        {userSearch.map((track) => (
          <Track key={track.id} track={track} isRemoval={isRemoval} onAdd={onAdd} onRemove={onRemove}/>
        ))}
    </ul>
  )
}

export default Tracklist
