import React, { useEffect, useState } from "react";
import api from "../api/axios.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import MapView from "../components/MapView.jsx";

export default function Restaurants() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(3);
  const [err, setErr] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function load() {
    const res = await api.get("/restaurants");
    setList(res.data);
  }

  useEffect(() => {
    load().catch(() => setErr("Nu pot incarca lista"));
  }, []);

  async function createRestaurant(e) {
    e.preventDefault();
    setErr("");

    try {
      await api.post("/restaurants", { name, rating: Number(rating) });
      setName("");
      setRating(3);
      await load();
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Eroare la creare");
    }
  }

  async function deleteRestaurant(id) {
    if (!confirm("Sigur stergi restaurantul?")) return;
    await api.delete(`/restaurants/${id}`);
    await load();
  }

  const points = list
    .filter(r => r.address && typeof r.address.lat === "number" && typeof r.address.lng === "number")
    .map(r => ({ id: r.id, lat: r.address.lat, lng: r.address.lng }));

  return (
    <div className="container">
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Restaurantele mele</h2>
        <div className="row">
          <button className="btn secondary" onClick={() => { logout(); navigate("/login"); }}>Logout</button>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <MapView points={points} />
        <div style={{ opacity: 0.8, marginTop: 8 }}>
          Harta arata restaurantele care au lat/lng completate in adresa.
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Adauga restaurant</h3>
        <form onSubmit={createRestaurant} className="grid2">
          <div>
            <label>Nume</label>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Rating (1-5)</label>
            <input className="input" type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
          </div>
          <div>
            <button className="btn" type="submit">Creeaza</button>
          </div>
          {err && <div style={{ color: "#ff8080" }}>{err}</div>}
        </form>
      </div>

      <div style={{ marginTop: 16 }} className="row">
        {list.map((r) => (
          <div key={r.id} className="card" style={{ width: 320 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{r.name}</div>
                <div style={{ opacity: 0.85 }}>Rating: {r.rating}/5</div>
                <div style={{ opacity: 0.8, fontSize: 12 }}>
                  {r.address ? `${r.address.city}, ${r.address.street}` : "Fara adresa"}
                </div>
              </div>
            </div>

            <div className="row" style={{ marginTop: 12 }}>
              <Link className="btn" to={`/restaurants/${r.id}`}>Detalii</Link>
              <button className="btn secondary" onClick={() => deleteRestaurant(r.id)}>Sterge</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
