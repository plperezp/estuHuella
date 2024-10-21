import React from 'react'

function SearchBar({ searchValue, setSearchValue }) {
  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }
  return (
    <div id="search-bar">
      SearchBar
      <label>Busqueda</label>
      <input
        onChange={handleChange}
        id="search-bar"
        type="text"
        value={searchValue}
        placeholder="Buscar"
      />
    </div>
  )
}

export default SearchBar
