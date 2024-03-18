import "./SearchBar.css"
import React from 'react'
import { HiSearch } from "react-icons/hi";

const SearchBar = () => {
  return (
    <form className="search-bar">
      <input className="search-box" type="text" placeholder="Search" aria-label="Search products"/>
      <button className="search-btn"><HiSearch /></button>
    </form>
  )
}

export default SearchBar;