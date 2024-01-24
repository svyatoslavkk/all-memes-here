import { useGetTrendingGifsQuery, useGetTrendingStickersQuery } from "../../redux/api/api";
import { Gif } from "../../types/types";
import Card from "../card/Card";
import StartSection from "../startSection/StartSection";

export default function TrendingGifs() {
  const {
    data: trendingGifs,
    isLoading: trendingGifsLoading,
    isError: trendingGifsError,
  } = useGetTrendingGifsQuery({});

  const {
    data: trendingStickers,
    isLoading: trendingStickersLoading,
    isError: trendingStickersError,
  } = useGetTrendingStickersQuery({});

  if (trendingGifsLoading) {
    return <p>Loading...</p>;
  }

  if (trendingGifsError) {
    return <p>Error fetching gifs</p>;
  }

  if (trendingStickersLoading) {
    return <p>Loading...</p>;
  }

  if (trendingStickersError) {
    return <p>Error fetching stickers</p>;
  }

  console.log("Trending GIFs", trendingGifs.data);

  console.log("trendingStickers", trendingStickers.data);

  const nameTrGifs = "Trending Gifs";
  const nameTrStcks = "Trending Stickers";
  const link = "/search"

  return (
    <section className="trending-gifs">
      <StartSection name={nameTrGifs} link={link} />
      <div className="cards-list">
        {trendingGifs && trendingGifs?.data
          .slice(0, 4)
          .map((gif: Gif) => <Card gif={gif} key={gif.id} />)}
      </div>
      <StartSection name={nameTrStcks} link={link} />
      <div className="cards-list">
        {trendingStickers && trendingStickers?.data
          .slice(0, 4)
          .map((gif: Gif) => <Card gif={gif} key={gif.id} />)}
      </div>
    </section>
  );
}
