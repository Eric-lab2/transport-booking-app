import { useLocation, useNavigate } from "react-router-dom";

export default function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;

  if (!booking) {
    return (
      <div className="center-page">
        <div className="form-box">
          <h2>No booking found</h2>
          <button onClick={() => navigate("/buses")}>
            Go to Buses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="center-page">
      <div className="form-box success-box">

        <div className="success-icon">✔</div>

        <h2>Booking Confirmed 🎉</h2>

        <p><b>Bus:</b> {booking.bus?.name}</p>
        <p><b>Route:</b> {booking.bus?.route}</p>
        <p><b>Seat:</b> {booking.selectedSeat}</p>

        <p><b>Name:</b> {booking.name}</p>
        <p><b>Phone:</b> {booking.phone}</p>

        {/* PDF / PRINT RECEIPT BUTTON */}
        <button
          className="success-btn"
          onClick={() => window.print()}
        >
          Download Receipt
        </button>

        <button
          className="success-btn"
          style={{ marginTop: "10px", background: "#2563eb" }}
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>

      </div>
    </div>
  );
}