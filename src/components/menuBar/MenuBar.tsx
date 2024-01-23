import ExploreIcon from '@mui/icons-material/Explore';
import PersonIcon from '@mui/icons-material/Person';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link, useLocation } from 'react-router-dom';

export default function MenuBar({ handleCreatePostClick }: any) {
  const location = useLocation();

  return (
    <aside className="menu-bar">
      <Link to="/main" className={`menu-bar-icon ${location.pathname === '/main' ? 'active2' : ''}`}>
        <WidgetsIcon />
      </Link>
      <Link to="/search" className={`menu-bar-icon ${location.pathname === '/search' ? 'active2' : ''}`}>
        <ExploreIcon />
      </Link>
      <div className="menu-bar-icon" onClick={handleCreatePostClick}>
        <AddCircleIcon />
      </div>
      <Link to="/profile" className={`menu-bar-icon ${location.pathname === '/profile' ? 'active2' : ''}`}>
        <PersonIcon />
      </Link>
    </aside>
  )
}