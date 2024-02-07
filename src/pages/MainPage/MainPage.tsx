import PostedGifs from "../../components/postedGifs/PostedGifs";
import TrendGifs from "../../components/trendGifs/TrendGifs";

export default function MainPage() {
  return (
    <>
      <div className="main-page">
        <div className="main-page-content">
          <PostedGifs />
          <TrendGifs />
        </div>
      </div>
    </>
  );
}
