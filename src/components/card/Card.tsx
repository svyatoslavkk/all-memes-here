import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Gif } from "../../types/types";
import DownloadIcon from '@mui/icons-material/Download';
import { saveAs } from 'file-saver';
import { useState, useEffect } from 'react';
import { useUserContext } from "../../context/UserContext";
import { doc, updateDoc, arrayUnion, arrayRemove, collection, getDocs } from 'firebase/firestore';
import { database } from "../../firebase/firebaseConfig";
import { User } from "../../types/types";

interface CardProps {
  gif: Gif;
}

export default function Card({ gif }: CardProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const collectionRef = collection(database, 'Users Data');
  const { user } = useUserContext();

  const getUsers = async () => {
    try {
      const snapshot = await getDocs(collectionRef);
      const userList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User));
      setUsers(userList);
    } catch (error) {
      console.error('Error getting users:', error);
    } finally {
      setLoading(false);
    }
  };

  const myData = users
  .filter((data) => data.uid === user?.uid)[0];
  const userDocRef = myData ? doc(collectionRef, myData.docId) : null;

  const handleDownload = () => {
    saveAs(gif.images.original.url, 'downloaded.gif');
  };

  const handleAddToFavorites = async () => {
    if (userDocRef) {
      const favoriteGifData = {
        id: gif.id,
        url: gif.images.fixed_height.url,
        title: gif.title,
        originalUrl: gif.images.original.url
      };
      try {
        if (isFavorite) {
          await updateDoc(userDocRef, {
            favoriteGifs: arrayRemove(favoriteGifData)
          });
        } else {
          await updateDoc(userDocRef, {
            favoriteGifs: arrayUnion(favoriteGifData)
          });
        }
        setIsFavorite(!isFavorite);
      } catch (error) {
        console.error('Error updating favorites:', error);
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

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
          {isFavorite ? (
            <button className="heart-icon" onClick={handleAddToFavorites}>
              <FavoriteIcon sx={{color: '#ff2222'}} />
            </button>
          ): (
            <button className="heart-icon" onClick={handleAddToFavorites}>
              <FavoriteBorderIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
