import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Gif } from "../../types/types";
import DownloadIcon from '@mui/icons-material/Download';
import { saveAs } from 'file-saver';
import { useState, useEffect } from 'react';
import { useUserContext } from "../../context/UserContext";
import { doc, updateDoc, arrayUnion, arrayRemove, collection, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { database } from "../../firebase/firebaseConfig";
import { User } from "../../types/types";

interface CardProps {
  gif: Gif;
}

export default function Card({ gif }: CardProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const collectionRef = collection(database, 'Users Data');
  const { user, fireData, fetchData } = useUserContext();

  const myData = users
  .filter((data) => data.uid === user?.uid)[0];
  const userDocRef = doc(database, 'Users Data', myData?.docId);

  const handleDownload = () => {
    saveAs(gif.images.original.url, 'downloaded.gif');
  };

  const handleAddToFavorites = async () => {
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
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collectionRef, (snapshot: QuerySnapshot<DocumentData>) => {
      const userList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User));
      setUsers(userList);
    });
  
    return () => unsubscribe();
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
              <FavoriteIcon />
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
