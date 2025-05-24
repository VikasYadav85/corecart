import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  // Carousel items (your existing ones)
  const carouselItems = [
    { id: 1, src: "slide1.jpg", alt: "Slide 1" },
    { id: 2, src: "slide2.jpg", alt: "Slide 2" },
    { id: 3, src: "slide3.jpg", alt: "Slide 3" },
  ];

  // Example categories
//   const categories = [
//     { id: 1, name: "Electronics", image: "https://via.placeholder.com/600x400?text=Electronics" },
//     { id: 2, name: "Fashion", image: "https://via.placeholder.com/600x400?text=Fashion" },
//     { id: 3, name: "Home & Garden", image: "https://via.placeholder.com/600x400?text=Home+%26+Garden" },
//   ];

  // Fetch products from API on component mount
  useEffect(() => {
    fetch("http://159.223.107.48/IIT/public/api/product-details")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.data.map((product) => ({
          id: product.id,
          name: product.name,
          image: `http://159.223.107.48/IIT/public/images/Product/${product.image}`,
          price: `$${parseFloat(product.price).toFixed(2)}`, // format price with $ and 2 decimals
        }));
        setProducts(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      {/* Carousel Section */}
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner" style={{ height: "75vh" }}>
          {carouselItems.map((item, index) => (
            <div key={item.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img
                src={item.src}
                className="d-block w-100"
                alt={item.alt}
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

      {/* Promotional Banner */}
      <div className="bg-primary text-white text-center py-4 my-5">
        <h2>Spring Sale! Up to 50% off on selected items.</h2>
        <p>Don't miss out on our limited-time offers.</p>
        <Link to="/services" className="btn btn-light btn-lg">Shop Now</Link>
      </div>

      {/* Categories Section */}
      {/* <div className="container mb-5">
        <h2 className="mb-4 text-center">Shop by Category</h2>
        <div className="row g-4">
          {categories.map((cat) => (
            <div key={cat.id} className="col-md-4">
              <div className="card border-0 shadow-sm">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{cat.name}</h5>
                  <button className="btn btn-outline-primary btn-sm">Explore</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}

     {/* Featured Products Section (from API) */}
<div className="container mb-5">
  <h2 className="mb-4 text-center">Featured Products</h2>
  <div className="row g-4 justify-content-center">
    {products.length === 0 ? (
      <p className="text-center">Loading products...</p>
    ) : (
      products.slice(0, 4).map((product) => (  // <-- slice here
        <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
          <div className="card h-100 shadow-sm">
            <img
              src={product.image}
              className="card-img-top"
              alt={product.name}
              style={{ objectFit: "cover", height: "250px" }}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text text-primary fw-bold">{product.price}</p>
              <button className="btn btn-primary mt-auto">Add to Cart</button>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
</div>
 ̰
    </>
  );
};

export default Home;
