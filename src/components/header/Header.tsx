import LogoutIcon from "@mui/icons-material/Logout";
import { User } from "../../types/types";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import Loader from "../loader/Loader";

export default function Header() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const { user, fireData } = useUserContext();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      navigate("/signup");
    } catch (error: any) {
      console.error("Logout error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const myData =
    fireData && fireData.filter((data: User) => data.uid === user?.uid);

  const fakeImg =
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d9359ae0-065b-4756-bfed-02ad0e0f73f8/dg1t181-2b042eec-17cc-4d17-841b-31c194c091e0.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q5MzU5YWUwLTA2NWItNDc1Ni1iZmVkLTAyYWQwZTBmNzNmOFwvZGcxdDE4MS0yYjA0MmVlYy0xN2NjLTRkMTctODQxYi0zMWMxOTRjMDkxZTAuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.hvmrnKtJN42DTXfSG4w82Xz1Y6tWofYGL3LLccckYHY";

  return (
    <>
      <header className="header flex-between">
        <div className="flex-content" style={{ zIndex: 9999 }}>
          {myData.map((data: User) => (
            <div key={data.uid} className="img-section">
              <img
                src={data.avatar ? data.avatar : fakeImg}
                className="small-circle-img"
                alt={data.fullName ? data.fullName : "NONE"}
              />
              <span className="online-sign"></span>
            </div>
          ))}
          <div className="text3">
            {myData.map((data: User) => (
              <p key={data.uid} className="small-text">
                @{data.userName ? data.userName : "NONE"}
              </p>
            ))}
          </div>
        </div>
        <div className="flex-content">
          <span className="small-text">Logout</span>
          <button className="small-circle-button" onClick={handleLogout}>
            <LogoutIcon fontSize="inherit" />
          </button>
        </div>
      </header>
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
