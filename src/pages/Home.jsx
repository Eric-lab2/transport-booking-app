import { useNavigate } from "react-router-dom";
import busImage from "../assets/bus-image.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url(${busImage})`,
      }}
    >
      <div className="hero-content">
        <h1>Transport Booking System</h1>

        <p className="hero-text">
          Book your bus tickets easily,
          safely, and fast.
        </p>

        <p className="hero-subtext">
          Find buses, choose your seats,
          and enjoy a smooth booking experience.
        </p>

        <button
          className="hero-btn"
          onClick={() => navigate("/buses")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}