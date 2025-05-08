import React from 'react'
import Tracklist from './Tracklist'

const SearchResults = ({ userSearchResults }) => {
  return (
    <section className='searchResults'>
       <Tracklist userSearch={userSearchResults}/>
    </section>
  )
}

export default SearchResults
