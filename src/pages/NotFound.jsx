// NotFound.jsx
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="page" style={{ textAlign: "center" }}>
      <h1>404 - Page Not Found 😕</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          backgroundColor: "#e67e22",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Go Back Home
      </button>
    </div>
  );
}