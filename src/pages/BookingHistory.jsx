import { useEffect, useState } from "react";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  const currentUser = (localStorage.getItem("currentUser") || "")
    .trim()
    .toLowerCase();

  useEffect(() => {
    if (!currentUser) return;
    loadBookings();
  }, [currentUser]);

  const loadBookings = () => {
    const data = JSON.parse(localStorage.getItem("bookings")) || [];

    const userBookings = data.filter(
      (b) => (b?.user || "").trim().toLowerCase() === currentUser
    );

    setBookings(userBookings);
  };

  const handleDelete = (index) => {
    const all = JSON.parse(localStorage.getItem("bookings")) || [];

    const userBookings = all
      .map((b, i) => ({ ...b, originalIndex: i }))
      .filter(
        (b) => (b?.user || "").trim().toLowerCase() === currentUser
      );

    const target = userBookings[index];

    if (!target) return;

    const updated = all.filter((_, i) => i !== target.originalIndex);

    localStorage.setItem("bookings", JSON.stringify(updated));

    loadBookings();
  };

  // 🔥 DELETE ALL FUNCTION (THIS WAS MISSING)
  const handleDeleteAll = () => {
    const all = JSON.parse(localStorage.getItem("bookings")) || [];

    const remaining = all.filter(
      (b) => (b?.user || "").trim().toLowerCase() !== currentUser
    );

    localStorage.setItem("bookings", JSON.stringify(remaining));

    setBookings([]);
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

      {/* 🔥 DELETE ALL BUTTON (NOW ADDED) */}
      {bookings.length > 0 && (
        <button
          onClick={handleDeleteAll}
          style={{
            marginBottom: "15px",
            background: "#e74c3c",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Delete All Bookings
        </button>
      )}

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