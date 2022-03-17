import { TextField } from '@material-ui/core'
import React from 'react'

const SearchBar = ({searchText, onSearchTextChange}) => {
  return (
    <div>
        <TextField id="outlined-basic" label="search by title" variant="outlined"
                        value={searchText}
                        onChange={(e) => {onSearchTextChange(e.target.value)}}
                        fullWidth />
    </div>
  )
}

export default SearchBar