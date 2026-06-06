import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill all fields");
      return;
    }

    const usernameRegex = /^[A-Za-z0-9]{4,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if (!usernameRegex.test(username)) {
      setError("Username must be at least 4 characters (letters/numbers only)");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError("Password must be at least 6 characters and include letters + numbers");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const normalizedUsername = username.trim().toLowerCase();

    if (users.find((u) => u.username === normalizedUsername)) {
      setError("Username already taken");
      return;
    }

    const newUser = {
      username: normalizedUsername,
      password,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", normalizedUsername);

    setError("");
    navigate("/");
  };

  return (
    <div className="center-page">
      <div className="form-box">
        <h2>Register</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username (e.g. john123)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password (e.g. pass123)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Register</button>
        </form>

        <p style={{ fontSize: "13px", marginTop: "8px", opacity: 0.7 }}>
          Username: letters + numbers only (min 4 chars) <br />
          Password: must include letters + numbers (min 6 chars)
        </p>
      </div>
    </div>
  );
}