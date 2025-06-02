import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken"); // agar aap token bhi store kar rahe hain to
    setUser(null);
    navigate("/login");
  };

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Contact", link: "/contact" }
  ];

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light shadow-sm sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src="/logo2.png" alt="Logo" className="logo-img" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              {menuItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <Link
                    className={`nav-link px-3 py-2 ${
                      currentPath === item.link ? "text-primary fw-semibold" : ""
                    }`}
                    to={item.link}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              {/* Conditional rendering for user login state */}
              {user ? (
                <li className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    role="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={{ cursor: "pointer" }}
                    aria-expanded={dropdownOpen}
                  >
                    {user.name || user.email || "User"}
                  </span>
                  <ul
                    className={`dropdown-menu dropdown-menu-end ${
                      dropdownOpen ? "show" : ""
                    }`}
                  >
                    <li>
                      <Link className="dropdown-item" to="/profile" onClick={() => setDropdownOpen(false)}>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item mb-2 mb-lg-0">
                    <Link className="btn btn-outline-primary me-2" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-primary" to="/signup">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <style>
        {`
          .logo-img {
            height: 80px;
            width: auto;
            object-fit: contain;
          }
          .nav-item .nav-link:hover {
            background-color: rgba(0, 0, 0, 0.05);
            border-radius: 5px;
          }
          .navbar-nav .btn {
            margin-left: 0.5rem;
          }
          .dropdown-menu {
            min-width: 150px;
          }
        `}
      </style>
    </>
  );
};

export default Navbar;
