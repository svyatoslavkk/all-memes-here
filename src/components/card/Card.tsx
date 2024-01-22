import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Gif } from "../../types/types";
import DownloadIcon from '@mui/icons-material/Download';
import { saveAs } from 'file-saver';

interface CardProps {
  gif: Gif;
}

export default function Card({ gif }: CardProps) {
  const handleDownload = () => {
    saveAs(gif.images.original.url, 'downloaded.gif');
  };

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
        <div className="flex-content">
          <button className="download-icon" onClick={handleDownload}>
            <DownloadIcon />
          </button>
          <button className="heart-icon">
            <FavoriteBorderIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
