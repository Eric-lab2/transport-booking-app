import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const bus = location.state;
  const currentUser = localStorage.getItem("currentUser");

  const [selectedSeat, setSelectedSeat] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bookedSeats, setBookedSeats] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (!bus) {
      navigate("/buses");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];

    const seats = existing
      .filter((b) => b?.bus?.id === bus.id)
      .map((b) => Number(b.selectedSeat));

    setBookedSeats(seats);
  }, [bus, currentUser, navigate]);

  if (!bus) {
    return (
      <div className="page">
        <h2>Loading booking page...</h2>
      </div>
    );
  }

  const isValidName = (value) => {
    const regex = /^[A-Za-z]{2,}\s[A-Za-z]{2,}$/;
    return regex.test(value.trim());
  };

  const isValidNigerianNumber = (value) => {
    const regex = /^(070|080|081|090|091)\d{8}$/;
    return regex.test(value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSeat || !name || !phone) {
      setError("Please fill all fields and select a seat");
      return;
    }

    if (!isValidName(name)) {
      setError("Enter full name (First name + Last name only)");
      return;
    }

    if (!isValidNigerianNumber(phone)) {
      setError("Enter valid Nigerian number (e.g. 08012345678)");
      return;
    }

    // 🔥 IMPORTANT FIX: create clean bus snapshot
    const cleanBus = {
      id: bus.id,
      name: bus.name,
      route: bus.route,
      price: bus.price,
      seats: bus.seats,
    };

    const bookingData = {
      user: (currentUser || "").trim().toLowerCase(),
      bus: cleanBus, // ✅ guaranteed structure
      selectedSeat,
      name: name.trim(),
      phone: phone.trim(),
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    existing.push(bookingData);

    localStorage.setItem("bookings", JSON.stringify(existing));

    navigate("/confirmation", { state: bookingData });
  };

  return (
    <div className="page center-page">
      <div className="booking-card form-box">
        <h1 style={{ textAlign: "center" }}>Booking Page</h1>

        <h3 style={{ textAlign: "center" }}>{bus.name}</h3>
        <p style={{ textAlign: "center" }}>{bus.route}</p>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <h3>Select Seat</h3>

        <div className="seat-grid">
          {Array.from({ length: Number(bus.seats) || 0 }).map((_, i) => {
            const seat = i + 1;
            const isBooked = bookedSeats.includes(seat);

            return (
              <button
                key={seat}
                type="button"
                onClick={() => setSelectedSeat(seat)}
                className={`seat-btn ${
                  selectedSeat === seat ? "selected" : ""
                } ${isBooked ? "booked" : ""}`}
                disabled={isBooked}
              >
                {seat}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit}>
          <h3>Enter Details</h3>

          <input
            type="text"
            placeholder="Full Name (e.g. John Doe)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Nigerian Number (e.g. 08012345678)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button type="submit" disabled={!selectedSeat || !name || !phone}>
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}