import React, { useEffect } from 'react'

function SearchBar({ searchValue, setSearchValue, getDataAll }) {
  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }
  useEffect(() => {
    if (searchValue) {
      getDataAll(searchValue)
    }
  }, [searchValue])
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
