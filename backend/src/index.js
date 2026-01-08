import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.routes.js";
import { restaurantsRouter } from "./routes/restaurants.routes.js";
import { menuRouter } from "./routes/menu.routes.js";
import { addressRouter } from "./routes/address.routes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/auth", authRouter);
app.use("/restaurants", restaurantsRouter);
app.use("/restaurants", menuRouter);
app.use("/restaurants", addressRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log("Server pornit pe portul", process.env.PORT || 3001);
});
