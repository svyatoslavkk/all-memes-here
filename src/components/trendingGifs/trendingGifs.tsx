import { useGetTrendingGifsQuery } from "../../redux/api/api";
import { Gif } from "../../types/types";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function TrendingGifs() {
  const {
    data: trendingGifs,
    isLoading: trendingGifsLoading,
    isError: trendingGifsError,
  } = useGetTrendingGifsQuery({});

  if (trendingGifsLoading) {
    return <p>Loading...</p>;
  }

  if (trendingGifsError) {
    return <p>Error fetching memes</p>;
  }

  console.log("Trending GIFs", trendingGifs.data);

  return (
    <section className="trending-gifs">
      <div className="start-section">
        <h3>Trending Gifs</h3>
      </div>
      <div className="cards-list">
        {trendingGifs?.data.map((gif: Gif) => (
          <div key={gif.id} className="card">
            <img
              src={gif.images.fixed_height.url}
              className="meme-sq-img"
              alt={gif.title}
            />
            <div className="info">
              <div className="text">
                <p className="small-header">{gif.title}</p>
                <p className="small-text">GIF</p>
              </div>
              <button className="heart-icon">
                <FavoriteBorderIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
