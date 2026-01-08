import express from "express";
import { PrismaClient } from "@prisma/client";
import { auth } from "../middleware/auth.js";

const prisma = new PrismaClient();
export const addressRouter = express.Router();

addressRouter.use(auth);

// Setare / actualizare adresa pentru un restaurant (1-1)
addressRouter.put("/:restaurantId/address", async (req, res) => {
  const userId = req.user.userId;
  const restaurantId = Number(req.params.restaurantId);

  const rest = await prisma.restaurant.findFirst({ where: { id: restaurantId, userId } });
  if (!rest) return res.status(404).json({ message: "Restaurant inexistent" });

  const { street, city, country, lat, lng } = req.body;

  if (!street || String(street).trim().length === 0) {
    return res.status(400).json({ message: "Strada este obligatorie" });
  }
  if (!city || String(city).trim().length === 0) {
    return res.status(400).json({ message: "Orasul este obligatoriu" });
  }

  const data = {
    street: String(street).trim(),
    city: String(city).trim(),
    country: country ? String(country).trim() : "Romania",
    lat: lat === null || lat === undefined || lat === "" ? null : Number(lat),
    lng: lng === null || lng === undefined || lng === "" ? null : Number(lng),
    restaurantId
  };

  const existent = await prisma.address.findUnique({ where: { restaurantId } });

  const saved = existent
    ? await prisma.address.update({ where: { restaurantId }, data })
    : await prisma.address.create({ data });

  return res.status(200).json(saved);
});
