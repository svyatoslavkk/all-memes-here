import { useGetTrendingGifsQuery } from "../../redux/api/api";
import { Gif } from "../../types/types";

export default function MainPage() {
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
    <div className="">
      <h1>Main Page</h1>
      <div className="">
        <input type="text" className="input-text" placeholder="Search..." />
      </div>
      {trendingGifs?.data.map((gif: Gif) => (
        <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />
      ))}
    </div>
  );
}
