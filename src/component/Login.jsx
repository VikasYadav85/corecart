import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate login API
    setTimeout(() => {
      setIsSubmitting(false);
      setMessage("Login successful!");
      // Reset form
      setFormData({ email: "", password: "" });
    }, 2000);
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: 'url(/3.png)',
        backgroundSize:'cover',
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div
            className="col-md-6 col-lg-4 bg-white p-5 rounded-4 shadow-lg"
            style={{ maxWidth: "400px" }}
          >
            <h2 className="text-center text-primary mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control rounded-3"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control rounded-3"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 rounded-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </form>

            {message && (
              <p className="mt-3 text-success text-center fw-bold">{message}</p>
            )}

            <div className="text-center mt-3">
              <a href="/forgot-password" className="text-decoration-none">
                Forgot Password?
              </a>
              <br />
              <a href="/register" className="text-decoration-none">
                Don't have an account? Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
