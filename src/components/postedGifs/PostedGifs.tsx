import StartSection from "../startSection/StartSection"
import { useGetRandomGifsQuery } from "../../redux/api/api"
import Card from "../card/Card";
import { Gif } from "../../types/types";

export default function PostedGifs() {
  const {
    data: randomGifs,
    isLoading: randomGifsLoading,
    isError: randomGifsError,
  } = useGetRandomGifsQuery({});

  if (randomGifsLoading) {
    return <p>Loading...</p>;
  }

  if (randomGifsError) {
    return <p>Error fetching memes</p>;
  }

  console.log("randomGifs", randomGifs.data);

  const name = "Posted Gifs";

  return (
    <section className="posted-gifs">
      <StartSection name={name} />
      <div className="cards-list">
        {randomGifs?.data && <Card gif={randomGifs.data as Gif} key={randomGifs.data.id} />}
      </div>
    </section>
  )
}
