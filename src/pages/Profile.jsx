import { useEffect, useState } from "react";

export default function Profile() {
  const [currentUser, setCurrentUser] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const user = (localStorage.getItem("currentUser") || "").trim();
    setCurrentUser(user);

    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const userBookings = allBookings.filter(
      (b) => (b?.user || "").trim() === user
    );
    setBookings(userBookings);
  }, []);

  if (!currentUser) {
    return (
      <div className="page center-page">
        <h2>Please login to view your profile</h2>
      </div>
    );
  }

  return (
    <div className="page center-page">
      <div style={{ width: "100%", textAlign: "center" }}>
        <h1 style={{ marginBottom: "25px" }}>Profile</h1>

        <div className="bus-card" style={{ maxWidth: "500px", margin: "0 auto" }}>
          <p><strong>Username:</strong> {currentUser}</p>
          <p><strong>Total Bookings:</strong> {bookings.length}</p>
          <p><strong>Account Status:</strong> Active</p>
        </div>
      </div>
    </div>
  );
}