import { useState } from "react";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { app, database } from "../../firebase/firebaseConfig";

import { collection, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Loader from "../loader/Loader";

interface ToCreatePost {
  myUsername?: string;
  myAvatar?: string;
  myUid?: string;
  handleCreatePostClose: () => void;
}

export default function ToCreatePost({
  myUsername,
  myAvatar,
  myUid,
  handleCreatePostClose,
}: ToCreatePost) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const storage = getStorage(app);
  const collectionRef = collection(database, "Posts Data");
  const userDocRef = doc(collectionRef, "uIBTpBRYP7C0kaiTFtyH");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handlePostSubmit = async () => {
    if (!selectedFile || !caption) {
      return;
    }
    setIsPosting(true);
    if (userDocRef) {
      try {
        const storageRef = ref(
          storage,
          `posts/${myUid}/${(selectedFile as File).name}`,
        );
        await uploadBytes(storageRef, selectedFile);

        const downloadURL = await getDownloadURL(storageRef);

        const newPost = {
          gifURL: downloadURL,
          caption: caption,
          timestamp: new Date().toISOString(),
          uid: myUid,
          userName: myUsername,
          avatar: myAvatar,
        };

        await updateDoc(userDocRef, {
          posts: arrayUnion(newPost),
        });

        setSelectedFile(null);
        setCaption("");
      } catch (error) {
        console.error("Error creating post:", error);
      } finally {
        handleCreatePostClose();
        setIsPosting(false);
      }
    }
  };

  return (
    <>
      <div className="editor">
        <div className="editor-content">
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              className="meme-sq-high-img"
              alt="Selected GIF"
            />
          ) : (
            <div className="editor-header">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                    stroke="#000000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>{" "}
              <p>Browse File to upload!</p>
            </div>
          )}
          <label htmlFor="file" className="editor-footer">
            <InsertDriveFileIcon />
            <p>Not selected file</p>
          </label>
          <input
            className="editor-file"
            type="file"
            id="file"
            onChange={handleFileChange}
          />
          <div className="editor-input">
            <input
              className="input-text"
              placeholder="Name your post"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <div className="flex-content">
            <img
              src={myAvatar}
              className="small-circle-img"
              alt="Profile Image"
            />
            <span className="small-header">{myUsername}</span>
          </div>
          <div className="profile-buttons">
            <button
              className="favorite-section-button"
              onClick={handlePostSubmit}
              style={{ opacity: 1 }}
            >
              <span className="mid-header">Create post</span>
            </button>
            <button
              className="favorite-section-button"
              onClick={handleCreatePostClose}
              style={{ opacity: 1, backgroundColor: "#ede0d4" }}
            >
              <span className="mid-header">Cancel</span>
            </button>
          </div>
          {isPosting && (
            <>
              <div className="overlay-loader">
                <Loader />
              </div>
              <div className="to-create-post-overlay"></div>
            </>
          )}
        </div>
      </div>
      <div className="to-create-post" onClick={handleCreatePostClose}></div>
    </>
  );
}
