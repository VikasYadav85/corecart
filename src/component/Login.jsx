import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Yup validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Save auth token and user info to localStorage
      localStorage.setItem("authToken", "demo-auth-token");
      localStorage.setItem("user", JSON.stringify({ email: data.email }));

      alert("Login successful!");

      reset();
      navigate("/"); // Redirect immediately after success
    } catch (error) {
      alert("Invalid credentials. Try again.");
      console.error("Login error:", error);
      reset();
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: 'url(/3.png)',
        backgroundSize: "cover",
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

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className={`form-control rounded-3 ${errors.email ? "is-invalid" : ""}`}
                  {...register("email")}
                />
                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className={`form-control rounded-3 ${errors.password ? "is-invalid" : ""}`}
                  {...register("password")}
                />
                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 rounded-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="text-center mt-3">
              <a href="/forgot-password" className="text-decoration-none">
                Forgot Password?
              </a>
              <br />
              <a href="/signup" className="text-decoration-none">
                Don&apos;t have an account? Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
