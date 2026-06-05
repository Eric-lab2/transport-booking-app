import { useState } from "react";
import { useNavigate } from "react-router-dom";
import busesData from "../data/buses";

export default function Buses() {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // get unique routes for dropdown
  const allRoutes = [...new Set(busesData.map((b) => b.route))];

  const filteredBuses = busesData.filter((bus) => {
    const matchFrom = from ? bus.route.includes(from) : true;
    const matchTo = to ? bus.route.includes(to) : true;
    return matchFrom && matchTo;
  });

  const handleBook = (bus) => {
    navigate("/booking", { state: bus });
  };

  return (
    <div className="page">
      <div className="form-box" style={{ marginBottom: "20px" }}>
        <h2>Search Buses</h2>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            <option value="">From (All)</option>
            {allRoutes.map((route, i) => (
              <option key={i} value={route.split(" → ")[0]}>
                {route.split(" → ")[0]}
              </option>
            ))}
          </select>

          <select value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="">To (All)</option>
            {allRoutes.map((route, i) => (
              <option key={i} value={route.split(" → ")[1]}>
                {route.split(" → ")[1]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredBuses.length === 0 ? (
        <p>No buses found for this route</p>
      ) : (
        filteredBuses.map((bus) => (
          <div className="bus-card" key={bus.id}>
            <h3>{bus.name}</h3>
            <p>{bus.route}</p>
            <p>₦{bus.price}</p>
            <p>Seats: {bus.seats}</p>

            <button onClick={() => handleBook(bus)}>
              Book Now
            </button>
          </div>
        ))
      )}
    </div>
  );
}