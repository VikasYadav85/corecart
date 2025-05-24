import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="bg-light border-top py-4 text-muted">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-3">
            <h5>Company Name</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none text-muted text-decoration-underline">Careers</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-3">
            <h5>Discover</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none text-muted text-decoration-underline">Trust & Safety</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-3">
            <h5>Hosting</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none text-muted text-decoration-underline">Why Host</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-3">
            <h5>Follow Us</h5>
            <div className="fs-5">
              <a href="#" className="me-2"><FaFacebook /></a>
              <a href="#" className="me-2 text-info"><FaTwitter /></a>
              <a href="#" className="me-2 text-danger"><FaInstagram /></a>
            </div>
          </div>
        </div>
        <hr className="border-danger" style={{border:'1.5px solid'}} />
        <div className="text-center mt-3">
          <p>&copy; 2025 Developed by Vikas.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
