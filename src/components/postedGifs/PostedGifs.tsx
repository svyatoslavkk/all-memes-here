import StartSection from "../startSection/StartSection";
import { Post } from "../../types/types";
import PostCard from "../PostCard/PostCard";
import { useUserContext } from "../../context/UserContext";

export default function PostedGifs() {
  const { fetchPosts, loading } = useUserContext();

  const name = "Posted Gifs";

  return (
    <section className="posted-gifs">
      <StartSection name={name} />
      {loading && <p>Loading...</p>}
      <div className="cards-list">
        {fetchPosts && fetchPosts.map((post: Post) => <PostCard post={post} />)}
      </div>
    </section>
  );
}
