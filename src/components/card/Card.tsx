import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Gif } from "../../types/types";

interface CardProps {
  gif: Gif;
}

export default function Card({ gif }: CardProps) {
  return (
    <div key={gif.id} className="card">
      <img
        src={gif.images.fixed_height.url}
        className="meme-sq-img"
        alt={gif.title}
      />
      <div className="info">
        <div className="text">
          <p className="small-header no-wrap">{gif.title}</p>
          <p className="small-text">GIF</p>
        </div>
        <button className="heart-icon">
          <FavoriteBorderIcon />
        </button>
      </div>
    </div>
  );
}
