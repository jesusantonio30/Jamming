import React from 'react'
import Tracklist from './Tracklist'

<<<<<<< HEAD
const SearchResults = ({ searchResults }) => {
=======
const SearchResults = ({ userSearchResults }) => {
>>>>>>> feature/tracklist
    
  return (
    <section className='searchResults'>
       <Tracklist userSearch={userSearchResults}/>
    </section>
  )
}

export default SearchResults
