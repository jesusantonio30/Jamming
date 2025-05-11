import React from 'react'
import Tracklist from './Tracklist'

const SearchResults = ({ userSearchResults, onAdd }) => {
  if(!userSearchResults.length) return null;
  return (
    <section className='searchResults'>
      <h2 className='searchResultsHeader'>Results</h2>
      <Tracklist userSearch={userSearchResults} isRemoval={false} onAdd={onAdd}/>
    </section>
  )
}

export default SearchResults