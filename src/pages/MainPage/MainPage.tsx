import PostedGifs from "../../components/postedGifs/PostedGifs";
import TrendingGifs from "../../components/trendingGifs/TrendingGifs";

export default function MainPage() {
  return (
    <>
      <div className="main-page">
        <div className="main-page-content">
          <PostedGifs />
          <TrendingGifs />
        </div>
      </div>
    </>
  );
}
