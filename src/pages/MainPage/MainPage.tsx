import SearchIcon from "@mui/icons-material/Search";
import TrendingGifs from "../../components/trendingGifs/TrendingGifs";
import PostedGifs from "../../components/postedGifs/PostedGifs";
import MenuBar from "../../components/menuBar/MenuBar";

export default function MainPage() {
  return (
    <div className="main-page">
      <div className="flex-between">
        <h2>Main Page</h2>
        <button className="circle-button">
          <SearchIcon fontSize="medium" sx={{ color: "#ede0d4" }} />
        </button>
      </div>
      {/* <div className="primary-input-section">
        <input type="text" className="input-text" placeholder="Search..." />
        <span className="search-icon">
          <SearchIcon fontSize="medium" sx={{ color: "#262020" }} />
        </span>
      </div> */}
      <TrendingGifs />
      <PostedGifs />
      <MenuBar />
    </div>
  );
}
