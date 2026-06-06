import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setError("Please fill all fields");
      setSuccess("");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Enter a valid email address");
      setSuccess("");
      return;
    }

    // Simulate sending message (no backend)
    setError("");
    setSuccess("Message sent successfully!");

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="page center-page">
      <div className="form-box">
        <h2>Contact Us</h2>

        <p style={{ textAlign: "center", marginBottom: "10px" }}>
          We usually respond within 24 hours.
        </p>

        {error && (
          <p style={{ color: "red", textAlign: "center" }}>
            {error}
          </p>
        )}

        {success && (
          <p style={{ color: "green", textAlign: "center" }}>
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              minHeight: "120px",
              fontSize: "1rem",
              resize: "none",
            }}
          />

          <button type="submit">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}