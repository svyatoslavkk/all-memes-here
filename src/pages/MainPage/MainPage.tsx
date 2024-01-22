import SearchIcon from "@mui/icons-material/Search";
import TrendingGifs from "../../components/trendingGifs/TrendingGifs";
import PostedGifs from "../../components/postedGifs/PostedGifs";

export default function MainPage() {
  return (
    <div className="main-page">
      <h1>Main Page</h1>
      <div className="primary-input-section">
        <input type="text" className="input-text" placeholder="Search..." />
        <span className="search-icon">
          <SearchIcon fontSize="medium" sx={{ color: "#262020" }} />
        </span>
      </div>
      <TrendingGifs />
      <PostedGifs />
    </div>
  );
}
