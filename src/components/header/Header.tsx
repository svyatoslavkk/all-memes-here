import LogoutIcon from "@mui/icons-material/Logout";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ExploreIcon from "@mui/icons-material/Explore";
import PersonIcon from "@mui/icons-material/Person";
import WidgetsIcon from "@mui/icons-material/Widgets";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import Loader from "../loader/Loader";

export default function Header() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

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

  return (
    <>
      <header className="header flex-between">
        <div className="header-menu dashboard">
          <Link to="/" className="menu-bar-icon" onClick={handleLogout}>
            <GridViewRoundedIcon />
          </Link>
        </div>
        <div className="header-menu main">
          <Link
            to="/"
            className={`menu-bar-icon ${location.pathname === "/" ? "active2" : ""}`}
          >
            <WidgetsIcon />
            <span className="menu-bar-text">Home</span>
          </Link>
          <Link
            to="/search"
            className={`menu-bar-icon ${location.pathname === "/search" ? "active2" : ""}`}
          >
            <ExploreIcon />
            <span className="menu-bar-text">Explore</span>
          </Link>
          <div className="menu-bar-icon">
            <AddCircleIcon />
            <span className="menu-bar-text">Create</span>
          </div>
          <Link
            to="/profile"
            className={`menu-bar-icon ${location.pathname === "/profile" ? "active2" : ""}`}
          >
            <PersonIcon />
            <span className="menu-bar-text">Profile</span>
          </Link>
        </div>
        <div className="header-menu">
          <div className="menu-bar-icon" onClick={handleLogout}>
            <LogoutIcon />
            <span className="menu-bar-text">Logout</span>
          </div>
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
