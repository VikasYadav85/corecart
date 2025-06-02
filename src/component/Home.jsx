import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carousel images
  const carouselItems = [
    { id: 1, src: "slide1.jpg", alt: "Slide 1" },
    { id: 2, src: "slide2.jpg", alt: "Slide 2" },
    { id: 3, src: "slide3.jpg", alt: "Slide 3" },
  ];

  useEffect(() => {
    // Fetch products
    fetch("http://159.223.107.48/IIT/public/api/product-details")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          const formatted = data.data.map((p) => ({
            id: p.id,
            name: p.name,
            image: `http://159.223.107.48/IIT/public/images/Product/${p.image}`,
            price: `$${parseFloat(p.price).toFixed(2)}`,
          }));
          setProducts(formatted);
        }
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));

    // Get logged in user
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  return (
    <>
      {/* Personalized welcome */}
      {/* <div className="container mt-4">
        {user ? (
          <h2 className="mb-4">Welcome back, {user.email}!</h2>
        ) : (
          <h2 className="mb-4">Welcome to Our Store!</h2>
        )}
      </div> */}

      {/* Carousel */}
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner" style={{ height: "75vh" }}>
          {carouselItems.map((item, i) => (
            <div
              key={item.id}
              className={`carousel-item ${i === 0 ? "active" : ""}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="d-block w-100"
                style={{ height: "90vh", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Promo Banner */}
      <div className="bg-primary text-white text-center py-4 my-5">
        <h2>Spring Sale! Up to 50% off on selected items.</h2>
        <p>Don&apos;t miss out on our limited-time offers.</p>
        <Link to="/services" className="btn btn-light btn-lg">
          Shop Now
        </Link>
      </div>

      {/* Featured Products */}
      <div className="container mb-5">
        <h2 className="mb-4 text-center">Featured Products</h2>

        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center">No products available.</p>
        ) : (
          <div className="row g-4 justify-content-center">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
                <div className="card h-100 shadow-sm">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "250px" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-primary fw-bold">{product.price}</p>
                    <button className="btn btn-primary mt-auto">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
