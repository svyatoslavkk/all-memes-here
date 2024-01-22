import { useGetTrendingGifsQuery } from "../../redux/api/api";
import { Gif } from "../../types/types";
import Card from "../card/Card";
import StartSection from "../startSection/StartSection";

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

  const name = "Trending Gifs";

  return (
    <section className="trending-gifs">
      <StartSection name={name} />
      <div className="cards-list">
        {trendingGifs?.data
          .slice(0, 4)
          .map((gif: Gif) => <Card gif={gif} key={gif.id} />)}
      </div>
    </section>
  );
}
