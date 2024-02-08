import { app } from "../../firebase/firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../../components/loader/Loader";
import GoogleIcon from "@mui/icons-material/Google";

export default function Login() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const user = response.user;
        console.log(user);
        user
          .getIdToken()
          .then((accessToken) => {
            sessionStorage.setItem("Token", accessToken);
            navigate("/");
          })
          .catch((error) => {
            console.error("getIdToken error", error);
          });
      })
      .catch((error) => {
        console.error("signIn error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signInWithGoogle = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      const accessToken = await user.getIdToken();
      sessionStorage.setItem("Token", accessToken);
      navigate("/");
    } catch (error) {
      console.error("Google Sign In Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <div className="login">
        <h2 style={{ textAlign: "center" }}>Welcome back to our App!</h2>
        <form className="login-form">
          <div className="primary-input-section">
            <input
              className="input-text"
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleEmailChange}
            />
          </div>
          <div className="primary-input-section">
            <input
              className="input-text"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="full-width-button" onClick={signIn}>
            <span className="mid-header">Login</span>
          </button>
          <p className="mid-text">
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "#9c6644",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Sign Up
            </Link>
          </p>
        </form>
        <span className="dividing">
          <span className="text">
            <span className="mid-header">or continue with</span>
          </span>
        </span>
        <div className="flex-content">
          <button className="shadow-button" onClick={signInWithGoogle}>
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
