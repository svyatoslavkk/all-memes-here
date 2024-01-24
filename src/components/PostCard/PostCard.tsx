import { Post } from "../../types/types";
import DownloadIcon from "@mui/icons-material/Download";
import { saveAs } from "file-saver";
import { formatTimeLeft } from "../../utils/formatTimeLeft";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const currDate: Date = new Date();
  const postDate: Date = new Date(post.timestamp);
  const timeDifference: number = currDate.getTime() - postDate.getTime();
  const secondsDifference: number = Math.floor(timeDifference / 1000);

  return (
    <div key={post.caption} className="card">
      <img src={post.gifURL} className="meme-sq-img" alt={post.caption} />
      <div className="info">
        <div className="text">
          <p className="small-header no-wrap">{post.caption}</p>
          <div className="test4">
            <img
              src={post.avatar}
              className="mini-circle-img"
              alt={post.caption}
            />
            <p className="small-text">{post.userName}</p>
            <span className="dot"></span>
            <p className="small-text">{formatTimeLeft(secondsDifference)}</p>
          </div>
        </div>
        <div className="flex-content">
          <button
            className="download-icon"
            onClick={() => {
              saveAs(post.gifURL, "downloaded.gif");
            }}
          >
            <DownloadIcon />
          </button>
          {/* {isFavorite ? (
            <button className="heart-icon" onClick={handleAddToFavorites}>
              <FavoriteIcon sx={{color: '#ff2222'}} />
            </button>
          ): (
            <button className="heart-icon" onClick={handleAddToFavorites}>
              <FavoriteBorderIcon />
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
}
