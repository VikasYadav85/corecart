import { useEffect, useState } from "react";
import { BiCartAlt, BiCart, BiTrash, BiCreditCard } from "react-icons/bi";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";

const Services = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("http://159.223.107.48/IIT/public/api/product-details")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.data.map((product) => ({
          id: product.id,
          title: product.name,
          image: `http://159.223.107.48/IIT/public/images/Product/${product.image}`,
          price: product.price,
        }));
        setProducts(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
  };

  return (
    <>
      <style>{`
        body, #root {
          background-color:#8ba5f4;
          min-height: 100vh;  
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          transition: all 0.3s ease;
        }
        .card img {
          transition: transform 0.3s ease;
        }
        .card:hover img {
          transform: scale(1.05);
        }
        .btn:focus, .btn:active {
          outline: none;
          box-shadow: 0 0 0 0.25rem rgba(0,123,255,.5);
        }
        .cart-section button {
          transition: background-color 0.3s ease;
        }
        .cart-section button:hover {
          background-color: #343a40cc;
        }
        @media (max-width: 576px) {
          .card-body h5 {
            font-size: 1.1rem;
          }
          .card-body p {
            font-size: 0.9rem;
          }
          .btn {
            font-size: 0.9rem;
            padding: 0.4rem 0.7rem;
          }
        }
      `}</style>

      {/* Navigation Bar with Cart on Right */}
      <div className="container mt-4 d-flex justify-content-between align-items-center flex-wrap">
        <h2 className="mb-3 mb-md-0">Our Products</h2>
        <div className="cart-section">
          <button className="btn btn-dark position-relative" data-bs-toggle="modal" data-bs-target="#cartModal" aria-label="View cart">
            <BiCartAlt size={24} />
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Product List Section */}
      <div className="container my-4">
        <div className="row g-4">
          {products.map((product, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
              <div className="card shadow-sm h-100">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body text-center d-flex flex-column">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text fw-bold text-danger mb-3">
                    <FaRupeeSign /> {product.price}
                  </p>
                  <div className="d-flex justify-content-between mt-auto">
                    <button
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#buyNowModal"
                      onClick={() => setSelectedProduct(product)}
                    >
                      Buy Now
                    </button>
                    <button className="btn btn-warning" onClick={() => handleAddToCart(product)} aria-label={`Add ${product.title} to cart`}>
                      <AiFillPlusCircle /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Modal */}
      <div className="modal fade" id="cartModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"><BiCart /> Your Cart</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {cart.length > 0 ? (
                <table className="table table-bordered text-center align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <img src={item.image} alt={item.title} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                        </td>
                        <td>{item.title}</td>
                        <td><FaRupeeSign /> {item.price}</td>
                        <td>
                          <button className="btn btn-danger btn-sm" onClick={() => handleRemoveFromCart(index)} aria-label={`Remove ${item.title} from cart`}>
                            <BiTrash /> Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="2" className="fw-bold">Total:</td>
                      <td colSpan="2" className="fw-bold text-success">
                        <FaRupeeSign /> {getTotalPrice()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              ) : (
                <p className="text-center text-muted">Your cart is empty.</p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Continue Shopping</button>
              <button type="button" className="btn btn-success"><BiCreditCard /> Checkout</button>
            </div>
          </div>
        </div>
      </div>

      {/* Buy Now Modal */}
      <div className="modal fade" id="buyNowModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Purchase</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {selectedProduct && (
                <p>
                  Are you sure you want to buy{" "}
                  <strong>{selectedProduct.title}</strong> for{" "}
                  <FaRupeeSign /> {selectedProduct.price}?
                </p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                <BiCart /> Continue Shopping
              </button>
              <button type="button" className="btn btn-success">
                <BiCreditCard /> Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
