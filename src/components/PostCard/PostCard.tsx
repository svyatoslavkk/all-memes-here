import { Post } from "../../types/types";
import DownloadIcon from '@mui/icons-material/Download';
import { saveAs } from 'file-saver';

interface PostCardProps {
  post: Post;
}

export default function PostCard({post}: PostCardProps) {
  return (
    <div key={post.caption} className="card">
      <img
        src={post.gifURL}
        className="meme-sq-img"
        alt={post.caption}
      />
      <div className="info">
        <div className="text">
          <p className="small-header no-wrap">{post.caption}</p>
          <div className="test4">
            <img src={post.avatar} className="mini-circle-img" alt={post.caption} />
            <p className="small-text">{post.userName}</p>
          </div>
        </div>
        <div className="flex-content">
          <button 
            className="download-icon" 
            onClick={() => {saveAs(post.gifURL, 'downloaded.gif');}}
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
  )
}