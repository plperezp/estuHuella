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
      <label style={{ fontSize: '20px', color: 'white' }}>Busqueda </label>
      <input
        style={{
          width: '350px',
          borderRadius: '5px',
          padding: '10px',
          marginLeft: '5px',
        }}
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
