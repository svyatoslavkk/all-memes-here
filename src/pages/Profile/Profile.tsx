import MenuBar from "../../components/menuBar/MenuBar"
import { useUserContext } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { doc, collection, getDocs, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { database } from "../../firebase/firebaseConfig";
import { User, Post, FavGif } from "../../types/types";
import { saveAs } from 'file-saver';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DownloadIcon from '@mui/icons-material/Download';
import ToCreatePost from "../../components/toCreatePost/ToCreatePost";
import PostCard from "../../components/PostCard/PostCard";

export default function Profile() {
  const [activeButton, setActiveButton] = useState('Favorites');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { user, fireData, fetchPosts, getPostsData } = useUserContext();
  const collectionRef = collection(database, 'Users Data');
  const postCollectionRef = collection(database, 'Posts Data');
  const postsDocRef = doc(postCollectionRef, "uIBTpBRYP7C0kaiTFtyH");

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
  const myUsername = myData ? myData.userName : null;
  const myAvatar = myData ? myData.avatar : null;
  const myUid = myData ? myData.uid : null;
  const userPosts = fetchPosts.filter((post) => post.uid === myUid);
  console.log("userPosts", userPosts);

  const handleDownload = () => {
    saveAs(gif.images.original.url, 'downloaded.gif');
  };

  const handleCreatePostClick = () => {
    setShowCreatePost(true);
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
    getPostsData();
  }, []);

  const fakeImg = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d9359ae0-065b-4756-bfed-02ad0e0f73f8/dg1t181-2b042eec-17cc-4d17-841b-31c194c091e0.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q5MzU5YWUwLTA2NWItNDc1Ni1iZmVkLTAyYWQwZTBmNzNmOFwvZGcxdDE4MS0yYjA0MmVlYy0xN2NjLTRkMTctODQxYi0zMWMxOTRjMDkxZTAuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.hvmrnKtJN42DTXfSG4w82Xz1Y6tWofYGL3LLccckYHY';

  return (
    <section className="profile">
      <div className="profile-content">
        <section className="profile-main-info">
          {fireData && fireData
          .filter((data: User) => data.uid === user?.uid)
          .map((data: User) => (
            <img src={data.avatar ? data.avatar : fakeImg} className="big-circle-img" alt="" />
          ))}
          <div className="text3">
            {fireData && fireData
              .filter((data: User) => data.uid === user?.uid)
              .map((data: User) => (
                <h3 className="big-header">{data.fullName ? data.fullName : "NONE"}</h3>
              ))}
            {fireData && fireData
              .filter((data: User) => data.uid === user?.uid)
              .map((data: User) => (
                <span className="mid-text">@{data.userName ? data.userName : 'NONE'}</span>
              ))}
          </div>
        </section>
        <section className="profile-posts">
          <div className="profile-buttons">
            <button 
              className={`favorite-section-button ${activeButton === 'Posted' ? 'active' : ''}`}
              onClick={() => setActiveButton('Posted')}
            >
              <h3 className="mid-header">Posted</h3>
              {userPosts && (
                <span className="circle-number">
                  <span className="small-header">{userPosts.length}</span>
                </span>
              )}
            </button>
            <button
              className={`favorite-section-button ${activeButton === 'Favorites' ? 'active' : ''}`}
              onClick={() => setActiveButton('Favorites')}
            >
              <h3 className="mid-header">Favorites</h3>
              {myData && (
                <span className="circle-number">
                  <span className="small-header">{myData.favoriteGifs.length}</span>
                </span>
              )}
            </button>
          </div>
          {activeButton === 'Posted' && (
            <div className="cards-list">
              {userPosts && userPosts.map((post: Post) => (
                <PostCard post={post} />
              ))}
            </div>
          )}
          {activeButton === 'Favorites' && (
            <div className="cards-list">
              {myData && myData.favoriteGifs.map((gif: FavGif) => (
                <div key={gif.id} className="card">
                  <img
                    src={gif.url}
                    className="meme-sq-img"
                    alt={gif.title}
                  />
                  <div className="info">
                    <div className="text">
                      <p className="small-header no-wrap">{gif.title}</p>
                      <p className="small-text">GIF</p>
                    </div>
                    <div className="flex-content">
                      <button 
                        className="download-icon" 
                        onClick={() => {saveAs(gif.url, 'downloaded.gif');}}
                      >
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
              ))}
            </div>
          )}
        </section>
      </div>
      <MenuBar handleCreatePostClick={handleCreatePostClick} />
      {showCreatePost && (
        <ToCreatePost
          myUsername={myUsername ?? undefined}
          myAvatar={myAvatar ?? undefined}
          myUid={myUid ?? undefined}
        />
      )}
    </section>
  )
}