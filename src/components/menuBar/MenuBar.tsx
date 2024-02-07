import ExploreIcon from "@mui/icons-material/Explore";
import PersonIcon from "@mui/icons-material/Person";
import WidgetsIcon from "@mui/icons-material/Widgets";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link, useLocation } from "react-router-dom";
import { MenuBarProps } from "../../types/types";

export default function MenuBar({ handleCreatePostClick }: MenuBarProps) {
  const location = useLocation();

  return (
    <aside className="menu-bar">
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
      <div className="menu-bar-icon" onClick={handleCreatePostClick}>
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
    </aside>
  );
}
