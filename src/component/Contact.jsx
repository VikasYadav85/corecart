import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [responseMessage, setResponseMessage] = useState({ text: "", isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://159.223.107.48/IIT/index.php/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          description: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage({ text: data.message || "Message sent successfully!", isError: false });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResponseMessage({ text: data.error || "Failed to send message. Please try again.", isError: true });
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage({ text: "An error occurred. Please try again.", isError: true });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setResponseMessage({ text: "", isError: false }), 3000);
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ background: "linear-gradient(135deg,rgb(241, 117, 148),rgb(85, 128, 245))", padding: "40px 20px", minHeight: "70vh" }}
    >
      <div
        className="d-flex flex-column flex-md-row w-100"
        style={{ maxWidth: "900px", width: "100%", boxShadow: "0 0 15px rgb(0 0 0 / 0.1)", borderRadius: "0.5rem", overflow: "hidden", backgroundColor: "white" }}
      >
        {/* Left side image */}
        <div
          className="d-none d-md-block"
          style={{
            flex: 1,
            backgroundImage: 'url("/contact.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Right side form */}
        <div className="flex-grow-1 p-4">
          <h2 className="text-primary text-center mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold">Name</label>
              <input
                type="text"
                className="form-control rounded-3"
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control rounded-3"
                id="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label fw-semibold">Message</label>
              <textarea
                className="form-control rounded-3"
                id="message"
                name="message"
                rows="5"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 rounded-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </form>

          {responseMessage.text && (
            <p
              className={`mt-3 text-center fw-bold ${
                responseMessage.isError ? "text-danger" : "text-success"
              }`}
            >
              {responseMessage.text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
