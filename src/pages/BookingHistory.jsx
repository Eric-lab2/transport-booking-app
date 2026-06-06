import { useEffect, useState } from "react";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  // ✅ normalize current user
  const currentUser = (localStorage.getItem("currentUser") || "")
    .trim()
    .toLowerCase();

  useEffect(() => {
    if (!currentUser) return;
    loadBookings();
  }, [currentUser]);

  const loadBookings = () => {
    const data = JSON.parse(localStorage.getItem("bookings")) || [];

    // ✅ filter safely
    const userBookings = data.filter(
      (b) => (b?.user || "").trim().toLowerCase() === currentUser
    );

    setBookings(userBookings);
  };

  const handleDelete = (index) => {
    const all = JSON.parse(localStorage.getItem("bookings")) || [];

    const userBookings = all.filter(
      (b) => (b?.user || "").trim().toLowerCase() === currentUser
    );

    userBookings.splice(index, 1);

    const others = all.filter(
      (b) => (b?.user || "").trim().toLowerCase() !== currentUser
    );

    const updated = [...others, ...userBookings];

    localStorage.setItem("bookings", JSON.stringify(updated));

    loadBookings();
  };

  if (!currentUser) {
    return (
      <div className="page">
        <h2>Please login to view booking history</h2>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Booking History</h1>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        bookings.map((b, i) => (
          <div key={i} className="bus-card">
            <h3>{b?.bus?.name || "Unknown Bus"}</h3>
            <p>Route: {b?.bus?.route || "Unknown Route"}</p>
            <p>Seat: {b?.selectedSeat || "N/A"}</p>
            <p>Name: {b?.name || "N/A"}</p>
            <p>Phone: {b?.phone || "N/A"}</p>

            <button
              onClick={() => handleDelete(i)}
              style={{
                marginTop: "8px",
                background: "#e74c3c",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}