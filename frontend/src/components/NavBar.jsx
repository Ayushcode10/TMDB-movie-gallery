import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

function NavBar({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/favorites" className="nav-link">Favorites</Link>
        <button onClick={handleLogout} className="nav-link logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
