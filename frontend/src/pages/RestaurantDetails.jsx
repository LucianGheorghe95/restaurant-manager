import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios.js";
import { Link, useParams } from "react-router-dom";
import MapView from "../components/MapView.jsx";

export default function RestaurantDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Romania");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("General");
  const [itemPrice, setItemPrice] = useState("");

  async function load() {
    const res = await api.get(`/restaurants/${id}`);
    setData(res.data);

    if (res.data.address) {
      setStreet(res.data.address.street || "");
      setCity(res.data.address.city || "");
      setCountry(res.data.address.country || "Romania");
      setLat(res.data.address.lat ?? "");
      setLng(res.data.address.lng ?? "");
    }
  }

  useEffect(() => {
    load().catch((e2) => setErr(e2?.response?.data?.message || "Nu pot incarca detaliile"));
  }, [id]);

  const points = useMemo(() => {
    const a = data?.address;
    if (a && typeof a.lat === "number" && typeof a.lng === "number") {
      return [{ id: data.id, lat: a.lat, lng: a.lng }];
    }
    return [];
  }, [data]);

  async function saveAddress(e) {
    e.preventDefault();
    setErr("");

    try {
      await api.put(`/restaurants/${id}/address`, { street, city, country, lat, lng });
      await load();
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Eroare la salvare adresa");
    }
  }

  async function addMenuItem(e) {
    e.preventDefault();
    setErr("");

    try {
      await api.post(`/restaurants/${id}/menu`, {
        name: itemName,
        category: itemCategory,
        price: Number(itemPrice)
      });
      setItemName("");
      setItemPrice("");
      setItemCategory("General");
      await load();
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Eroare la adaugare produs");
    }
  }

  async function deleteMenuItem(menuId) {
    await api.delete(`/restaurants/menu/${menuId}`);
    await load();
  }

  if (!data) {
    return (
      <div className="container">
        <Link className="btn secondary" to="/restaurants">Inapoi</Link>
        <div style={{ marginTop: 12 }}>{err || "Se incarca..."}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <Link className="btn secondary" to="/restaurants">Inapoi</Link>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800 }}>{data.name}</div>
      </div>

      {err && <div style={{ color: "#ff8080", marginTop: 12 }}>{err}</div>}

      <div style={{ marginTop: 16 }}>
        <MapView points={points} />
      </div>

      <div className="grid2" style={{ marginTop: 16 }}>
        <div className="card">
          <h3>Adresa (doar una)</h3>
          <div style={{ opacity: 0.85, marginBottom: 10 }}>
            Completeaza lat/lng ca sa apara marker pe harta (ex: lat 44.4268, lng 26.1025).
          </div>

          <form onSubmit={saveAddress} className="row" style={{ flexDirection: "column" }}>
            <div>
              <label>Strada</label>
              <input className="input" value={street} onChange={(e) => setStreet(e.target.value)} />
            </div>
            <div>
              <label>Oras</label>
              <input className="input" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div>
              <label>Tara</label>
              <input className="input" value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>
            <div className="grid2">
              <div>
                <label>Lat</label>
                <input className="input" value={lat} onChange={(e) => setLat(e.target.value)} />
              </div>
              <div>
                <label>Lng</label>
                <input className="input" value={lng} onChange={(e) => setLng(e.target.value)} />
              </div>
            </div>

            <button className="btn" type="submit">Salveaza adresa</button>
          </form>
        </div>

        <div className="card">
          <h3>Meniu</h3>

          <form onSubmit={addMenuItem} className="row" style={{ flexDirection: "column" }}>
            <div>
              <label>Nume produs</label>
              <input className="input" value={itemName} onChange={(e) => setItemName(e.target.value)} />
            </div>
            <div className="grid2">
              <div>
                <label>Categorie</label>
                <input className="input" value={itemCategory} onChange={(e) => setItemCategory(e.target.value)} />
              </div>
              <div>
                <label>Pret</label>
                <input className="input" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
              </div>
            </div>
            <button className="btn" type="submit">Adauga</button>
          </form>

          <div style={{ marginTop: 12 }}>
            {data.menuItems.length === 0 && <div style={{ opacity: 0.85 }}>Nu ai produse in meniu.</div>}
            {data.menuItems.map((m) => (
              <div key={m.id} className="card" style={{ marginTop: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <div>
                    <div style={{ fontWeight: 800 }}>{m.name}</div>
                    <div style={{ opacity: 0.85 }}>{m.category} • {m.price} lei</div>
                  </div>
                  <button className="btn secondary" onClick={() => deleteMenuItem(m.id)}>Sterge</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
