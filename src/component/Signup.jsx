import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema with Yup
const schema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  phone: yup
    .string()
    .matches(/^\+?[0-9]{10,15}$/, "Phone number is not valid")
    .required("Phone number is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const Signup = () => {
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
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Signup successful! Please log in.");

      reset(); // Reset the form after successful signup
      navigate("/login"); // Redirect to login page
    } catch (err) {
      alert("Signup failed! Please try again.");
      console.error("Signup error:", err);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: "url(/3.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 bg-white p-5 rounded-4 shadow-lg">
            <h2 className="text-center text-success mb-4">Sign Up</h2>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`form-control rounded-3 ${errors.name ? "is-invalid" : ""}`}
                    placeholder="Enter your full name"
                    {...register("name")}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="phone" className="form-label fw-semibold">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className={`form-control rounded-3 ${errors.phone ? "is-invalid" : ""}`}
                    placeholder="Enter your phone number"
                    {...register("phone")}
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className={`form-control rounded-3 ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Enter your email"
                  {...register("email")}
                />
                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="password" className="form-label fw-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className={`form-control rounded-3 ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Enter a password"
                    {...register("password")}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="confirmPassword" className="form-label fw-semibold">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className={`form-control rounded-3 ${errors.confirmPassword ? "is-invalid" : ""}`}
                    placeholder="Confirm your password"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword.message}</div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100 rounded-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>
            </form>

            <div className="text-center mt-3">
              <a href="/login" className="text-decoration-none">
                Already have an account? Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
