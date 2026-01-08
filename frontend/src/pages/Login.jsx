import React, { useState } from "react";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");

    try {
      const res = await api.post("/auth/login", { email, password });
      loginWithToken(res.data.token);
      navigate("/restaurants");
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Eroare la autentificare");
    }
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
        <h2>Login</h2>
        <p style={{ opacity: 0.85 }}>Introduceti credentiale</p>

        <form onSubmit={onSubmit} className="row" style={{ flexDirection: "column" }}>
          <div>
            <label>Email</label>
            <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Parola</label>
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {err && <div style={{ color: "#ff8080" }}>{err}</div>}

          <button className="btn" type="submit">Intra</button>
        </form>

        <div style={{ marginTop: 12, opacity: 0.9 }}>
          Nu ai cont? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
