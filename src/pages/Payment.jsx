import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;
  const [loading, setLoading] = useState(false);

  if (!booking) {
    return (
      <div className="center-page">
        <div className="form-box">
          <h2>No payment data found</h2>
          <button onClick={() => navigate("/buses")}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const amount = booking.bus?.price || booking.bus?.fare || 0;

  const handlePayment = () => {
    setLoading(true);

    setTimeout(() => {
      navigate("/confirmation", { state: booking });
    }, 2000);
  };

  return (
    <div className="center-page">
      <div className="form-box">
        <h2>Payment Page</h2>

        <p><b>Bus:</b> {booking.bus?.name}</p>
        <p><b>Route:</b> {booking.bus?.route}</p>
        <p><b>Seat:</b> {booking.selectedSeat}</p>

        <p><b>Amount:</b> ₦{amount}</p>

        <button
          onClick={handlePayment}
          disabled={loading}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "12px",
            background: loading ? "gray" : "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {loading ? "Processing Payment..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}