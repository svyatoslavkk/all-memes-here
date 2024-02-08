import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app, database } from "../../firebase/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Loader from "../../components/loader/Loader";
import GoogleIcon from "@mui/icons-material/Google";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function SignUp() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const collectionRef = collection(database, "Users Data");

  const handleRegistration = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const currentUser = auth.currentUser;

      if (currentUser) {
        let pictureUrl = null;

        if (avatar) {
          const storage = getStorage(app);
          const storageRef = ref(
            storage,
            "avatars/" + currentUser?.uid + ".jpg",
          );
          await uploadBytes(storageRef, avatar);
          pictureUrl = await getDownloadURL(storageRef);
        }

        await updateProfile(currentUser, {
          displayName: userName,
          photoURL: pictureUrl,
        });

        console.log(response.user);
        const idToken = await currentUser.getIdToken();
        sessionStorage.setItem("Token", idToken);

        const docRef = await addDoc(collectionRef, {
          uid: currentUser.uid,
          userName: userName,
          fullName: fullName,
          email: currentUser.email,
          favoriteGifs: [],
          ...(avatar && { avatar: pictureUrl }),
        });

        const docId = docRef.id;

        await updateDoc(doc(collectionRef, docId), {
          docId: docId,
        });

        navigate("/");
      }
    } catch (err: any) {
      console.error("Registration error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docRef = await addDoc(collectionRef, {
        uid: user.uid,
        userName: user.displayName,
        fullName: user.displayName,
        email: user.email,
        favoriteGifs: [],
        avatar: user.photoURL,
      });
      const docId = docRef.id;
      await updateDoc(doc(collectionRef, docId), { docId: docId });
      navigate("/");
    } catch (error) {
      console.error("Google Sign Up Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFullnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setAvatar(file);
    }
  };

  return (
    <>
      <div className="sign-up">
        <h2 style={{ textAlign: "center" }}>Welcome to our App!</h2>
        <form className="sign-up-form" onSubmit={handleRegistration}>
          <div className="primary-input-section">
            <input
              className="input-text"
              type="file"
              id="avatarInput"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>
          <div className="primary-input-section">
            <input
              className="input-text"
              type="text"
              placeholder="Full Name"
              onChange={handleFullnameChange}
            />
          </div>
          <div className="primary-input-section">
            <input
              className="input-text"
              type="text"
              placeholder="Username"
              onChange={handleUsernameChange}
            />
          </div>
          <div className="primary-input-section">
            <input
              className="input-text"
              type="text"
              placeholder="Email"
              onChange={handleEmailChange}
            />
          </div>
          <div className="primary-input-section">
            <input
              className="input-text"
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="full-width-button">
            <span className="mid-header">Sign Up</span>
          </button>
          <p className="mid-text">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#9c6644",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          </p>
        </form>
        <span className="dividing">
          <span className="text">
            <span className="mid-header">or continue with</span>
          </span>
        </span>
        <div className="flex-content">
          <button className="shadow-button" onClick={handleGoogleSignUp}>
            <GoogleIcon sx={{ color: "#bb87b0" }} fontSize="large" />
          </button>
        </div>
      </div>
      {loading && (
        <div className="overlay">
          <span className="absolute">
            <Loader />
          </span>
        </div>
      )}
    </>
  );
}
