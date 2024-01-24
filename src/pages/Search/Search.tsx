import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { useGetSearchGifsQuery, useGetSearchStickersQuery } from "../../redux/api/api";
import { Gif } from "../../types/types";
import Header from "../../components/header/Header";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import MenuBar from "../../components/menuBar/MenuBar";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeButton, setActiveButton] = useState('Gifs');
  const { data: searchGifs, isLoading: searchGifsLoading, isError: searchGifsError } = useGetSearchGifsQuery(searchTerm);
  const { data: searchStickers, isLoading: searchStickersLoading, isError: searchStickersError } = useGetSearchStickersQuery(searchTerm);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (activeButton === 'Gifs') {
        useGetSearchGifsQuery(searchTerm);
      } else {
        useGetSearchStickersQuery(searchTerm);
      }
    }, 400);
    return () => clearTimeout(delayTimer);
  }, [searchTerm, activeButton]);

  return (
    <>
      <div className="search">
        <div className="search-content">
          <Header />
          <div className="profile-buttons">
            <button 
              className={`favorite-section-button ${activeButton === 'Gifs' ? 'active' : ''}`}
              onClick={() => setActiveButton('Gifs')}
            >
              <h3 className="mid-header">Find Gifs</h3>
            </button>
            <button
              className={`favorite-section-button ${activeButton === 'Stickers' ? 'active' : ''}`}
              onClick={() => setActiveButton('Stickers')}
            >
              <h3 className="mid-header">Find Stickers</h3>
            </button>
          </div>
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
              <h2 className="big-header">Find any {activeButton === 'Gifs' ? 'gifs' : 'stickers'} you want...</h2>
            </div>
          )}
          {searchGifsError && <p>Error fetching search results</p>}
          {activeButton === 'Gifs' && searchGifs && (
            <div className="cards-list">
              {searchGifs.data.map((gif: Gif) => (
                <Card gif={gif} key={gif.id} />
              ))}
            </div>
          )}
          {activeButton === 'Stickers' && searchStickers && (
            <div className="cards-list">
              {searchStickers.data.map((gif: Gif) => (
                <Card gif={gif} key={gif.id} />
              ))}
            </div>
          )}
        </div>
      </div>
      <MenuBar />
    </>
  )
}