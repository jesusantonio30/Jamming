import React from 'react'
import Tracklist from './Tracklist'

const SearchResults = ({ userSearchResults }) => {
  if(!userSearchResults.length) return null;
  return (
    <section className='searchResults'>
      <h2 className='searchResultsHeader'>Results</h2>
      <Tracklist userSearch={userSearchResults}/>
    </section>
  )
}

export default SearchResults
