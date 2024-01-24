import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { useGetSearchGifsQuery } from "../../redux/api/api";
import { Gif } from "../../types/types";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import MenuBar from "../../components/menuBar/MenuBar";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: searchGifs, isLoading: searchGifsLoading, isError: searchGifsError } = useGetSearchGifsQuery(searchTerm);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      useGetSearchGifsQuery(searchTerm);
    }, 400);
    return () => clearTimeout(delayTimer);
  }, [searchTerm]);

  return (
    <div className="search">
      <div className="primary-input-section">
        <input 
          type="text" 
          className="input-text" 
          placeholder="Search..." 
          value={searchTerm}
          onChange={handleInputChange}
        />
        <span className="search-icon">
          <SearchIcon fontSize="medium" sx={{ color: "#262020" }} />
        </span>
      </div>
      {searchGifsLoading && (
        <div className="test-loader">
          <p>Loading...</p>
          <Loader />
        </div>
      )}
      {!searchGifsLoading && searchTerm.length <= 0 && (
        <div className="column-content">
          <h2 className="big-header">Find any gifs you want...</h2>
        </div>
      )}
      <div></div>
      {searchGifsError && <p>Error fetching search results</p>}
      {searchGifs && (
        <div className="cards-list">
          {searchGifs.data.map((gif: Gif) => (
            <Card gif={gif} key={gif.id} />
          ))}
        </div>
      )}
      <MenuBar />
    </div>
  )
}