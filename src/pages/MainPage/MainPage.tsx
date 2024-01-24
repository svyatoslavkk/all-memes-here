import TrendingGifs from "../../components/trendingGifs/TrendingGifs";
import PostedGifs from "../../components/postedGifs/PostedGifs";
import MenuBar from "../../components/menuBar/MenuBar";
import Header from "../../components/header/Header";

export default function MainPage() {
  return (
    <>
      <Header />
      <div className="main-page">
        <div className="main-page-content">
          <PostedGifs />
          <TrendingGifs />
        </div>
      </div>
      <MenuBar />
    </>
  );
}
