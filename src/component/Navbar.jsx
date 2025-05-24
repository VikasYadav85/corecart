import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

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
          {/* Improved: Logo as a clickable link to home */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="/logo2.png"
              alt="Logo"
              className="logo-img"
            />
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
                    className={`nav-link px-3 py-2 ${currentPath === item.link ? "text-primary fw-semibold" : ""}`}
                    to={item.link}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

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
            </ul>
          </div>
        </div>
      </nav>

      {/* Improved CSS styles */}
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
        `}
      </style>
    </>
  );
};

export default Navbar;
