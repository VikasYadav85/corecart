import { useEffect, useState } from "react";
import { BiCartAlt, BiTrash, BiCreditCard, BiCart } from "react-icons/bi";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Services = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBuyNowModal, setShowBuyNowModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setCart(savedCart);
    setIsLoggedIn(!!loggedInUser);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://159.223.107.48/IIT/public/api/product-details");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        const formatted = data.data.map((p) => ({
          id: p.id,
          title: p.name,
          image: `http://159.223.107.48/IIT/public/images/Product/${p.image}`,
          price: p.price,
        }));
        setProducts(formatted);
      } catch (err) {
        setError("Could not load products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (cart.find((item) => item.id === product.id)) {
      toast.warn("Product already in cart");
      return;
    }
    setCart([...cart, { ...product, quantity: 1 }]);
    toast.success("Added to cart");
  };

  const handleRemoveFromCart = (index) => {
    if (window.confirm("Remove item?")) {
      setCart(cart.filter((_, i) => i !== index));
      toast.info("Removed from cart");
    }
  };

  const updateQuantity = (index, quantity) => {
    if (quantity < 1) return;
    const updated = [...cart];
    updated[index].quantity = quantity;
    setCart(updated);
  };

  const getTotalPrice = () =>
    cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0).toFixed(2);

  const handleBuyNow = (product) => {
    if (!isLoggedIn) {
      toast.error("Please login to proceed");
      return navigate("/login");
    }
    setSelectedProduct(product);
    setShowBuyNowModal(true);
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      toast.error("Please login to proceed");
      return navigate("/login");
    }
    setShowCartModal(false);
    toast.success("Proceeding to checkout...");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <style>{`/* same CSS styles */`}</style>

      <div className="container mt-4 d-flex justify-content-between align-items-center flex-wrap">
        <h2 className="mb-3 mb-md-0">Our Products</h2>
        <button className="btn btn-dark position-relative" onClick={() => setShowCartModal(true)}>
          <BiCartAlt size={24} />
          {cart.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      <div className="container my-4">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : (
          <div className="row g-4">
            {products.map((p) => (
              <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={p.id}>
                <div className="card shadow-sm h-100">
                  <img src={p.image} alt={p.title} className="card-img-top" style={{ height: "250px", objectFit: "cover" }} />
                  <div className="card-body text-center d-flex flex-column">
                    <h5 className="card-title">{p.title}</h5>
                    <p className="card-text fw-bold text-danger mb-3">
                      <FaRupeeSign /> {p.price}
                    </p>
                    <div className="d-flex justify-content-between mt-auto">
                      <button className="btn btn-primary" onClick={() => handleBuyNow(p)}>Buy Now</button>
                      <button className="btn btn-warning" onClick={() => handleAddToCart(p)}>
                        <AiFillPlusCircle /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Modal */}
      {showCartModal && (
        <Modal onClose={() => setShowCartModal(false)} title="Your Cart">
          {cart.length ? (
            <table className="table table-bordered text-center">
              <thead className="table-dark">
                <tr><th>Image</th><th>Product</th><th>Price</th><th>Qty</th><th>Action</th></tr>
              </thead>
              <tbody>
                {cart.map((item, i) => (
                  <tr key={i}>
                    <td><img src={item.image} alt={item.title} style={{ width: "50px", height: "50px" }} /></td>
                    <td>{item.title}</td>
                    <td><FaRupeeSign /> {item.price}</td>
                    <td>
                      <div className="d-flex justify-content-center align-items-center">
                        <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => updateQuantity(i, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                        <span>{item.quantity}</span>
                        <button className="btn btn-sm btn-outline-secondary ms-1" onClick={() => updateQuantity(i, item.quantity + 1)}>+</button>
                      </div>
                    </td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleRemoveFromCart(i)}>
                        <BiTrash /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="text-end fw-bold">Total:</td>
                  <td colSpan="2" className="text-success fw-bold">
                    <FaRupeeSign /> {getTotalPrice()}
                  </td>
                </tr>
              </tfoot>
            </table>
          ) : <p className="text-center text-muted">Your cart is empty.</p>}

          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-secondary" onClick={() => setShowCartModal(false)}>
              Continue Shopping
            </button>
            <button className="btn btn-success" onClick={handleCheckout} disabled={!cart.length || !isLoggedIn}>
              <BiCreditCard /> Checkout
            </button>
          </div>
        </Modal>
      )}

      {/* Buy Now Modal */}
      {showBuyNowModal && selectedProduct && (
        <Modal onClose={() => setShowBuyNowModal(false)} title="Confirm Purchase">
          <p>Are you sure you want to buy <strong>{selectedProduct.title}</strong> for <FaRupeeSign /> {selectedProduct.price}?</p>
          <p className="fw-bold">Total: <FaRupeeSign /> {selectedProduct.price}</p>
          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-secondary" onClick={() => setShowBuyNowModal(false)}>
              <BiCart /> Continue Shopping
            </button>
            <button className="btn btn-success" onClick={() => {
              toast.success(`Purchased: ${selectedProduct.title}`);
              setShowBuyNowModal(false);
            }}>
              <BiCreditCard /> Proceed to Checkout
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

const Modal = ({ children, title, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close" />
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={onClose} role="button" aria-label="Backdrop" />
    </div>
  );
};

export default Services;
