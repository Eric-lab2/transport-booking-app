import {
  useLocation,
  Link,
  useNavigate,
} from "react-router-dom";

import { FaBus } from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  const currentUser =
    localStorage.getItem("currentUser") || "";

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* Logo Section */}
      <div className="nav-logo">
        <FaBus />
        <span>Transport Booking</span>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">

        <Link
          to="/"
          className={
            currentPath === "/"
              ? "active"
              : ""
          }
        >
          Home
        </Link>

        <Link
          to="/buses"
          className={
            currentPath === "/buses"
              ? "active"
              : ""
          }
        >
          Buses
        </Link>

        {currentUser && (
          <Link
            to="/history"
            className={
              currentPath === "/history"
                ? "active"
                : ""
            }
          >
            History
          </Link>
        )}

        {!currentUser && (
          <>
            <Link
              to="/register"
              className={
                currentPath === "/register"
                  ? "active"
                  : ""
              }
            >
              Register
            </Link>

            <Link
              to="/login"
              className={
                currentPath === "/login"
                  ? "active"
                  : ""
              }
            >
              Login
            </Link>
          </>
        )}
      </div>

      {/* User Section */}
      <div className="nav-user">

        {currentUser && (
          <span className="username">
            Hi, {currentUser}
          </span>
        )}

        {currentUser && (
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}

      </div>

    </nav>
  );
}