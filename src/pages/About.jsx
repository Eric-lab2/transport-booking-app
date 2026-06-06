export default function About() {
  return (
    <div className="page">
      <div className="form-box" style={{ maxWidth: "900px" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#001f4d",
          }}
        >
          About Us
        </h1>

        <p
          style={{
            textAlign: "center",
            fontSize: "1.1rem",
            marginBottom: "30px",
            lineHeight: "1.8",
          }}
        >
          Welcome to <strong>SwiftRide Transport Booking</strong>, a
          modern transport booking platform designed to make bus travel
          easier, safer, and more convenient for passengers.
        </p>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: "#2563eb", marginBottom: "10px" }}>
            Our Mission
          </h2>

          <p style={{ lineHeight: "1.8" }}>
            Our mission is to provide a fast, secure, and stress-free
            transport booking experience where passengers can easily
            search buses, select seats, and manage their bookings
            anytime and anywhere.
          </p>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: "#2563eb", marginBottom: "10px" }}>
            Why Choose Us?
          </h2>

          <ul style={{ lineHeight: "2" }}>
            <li>Easy bus booking system</li>
            <li>Secure seat selection</li>
            <li>Fast and user-friendly experience</li>
            <li>Reliable transport information</li>
            <li>Convenient booking history management</li>
          </ul>
        </div>

        <div>
          <h2 style={{ color: "#2563eb", marginBottom: "10px" }}>
            Our Services
          </h2>

          <ul style={{ lineHeight: "2" }}>
            <li>Bus reservation and booking</li>
            <li>Seat selection system</li>
            <li>Booking confirmation</li>
            <li>Booking history tracking</li>
            <li>Easy account management</li>
          </ul>
        </div>
      </div>
    </div>
  );
}