import express from "express";
import { PrismaClient } from "@prisma/client";
import { auth } from "../middleware/auth.js";

const prisma = new PrismaClient();
export const restaurantsRouter = express.Router();

restaurantsRouter.use(auth);

// Lista restaurante (doar ale user-ului)
restaurantsRouter.get("/", async (req, res) => {
  const userId = req.user.userId;

  const list = await prisma.restaurant.findMany({
    where: { userId },
    include: { address: true, menuItems: true }
  });

  return res.status(200).json(list);
});

// Detalii restaurant (doar daca e al user-ului)
restaurantsRouter.get("/:id", async (req, res) => {
  const userId = req.user.userId;
  const id = Number(req.params.id);

  const restaurant = await prisma.restaurant.findFirst({
    where: { id, userId },
    include: { address: true, menuItems: true }
  });

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant inexistent" });
  }

  return res.status(200).json(restaurant);
});

// Creare restaurant
restaurantsRouter.post("/", async (req, res) => {
  const userId = req.user.userId;
  const { name, rating } = req.body;

  if (!name || String(name).trim().length === 0) {
    return res.status(400).json({ message: "Numele este obligatoriu" });
  }

  const ratingInt = Number(rating ?? 3);
  if (ratingInt < 1 || ratingInt > 5) {
    return res.status(400).json({ message: "Rating trebuie 1..5" });
  }

  const created = await prisma.restaurant.create({
    data: { name: String(name).trim(), rating: ratingInt, userId }
  });

  return res.status(201).json(created);
});

// Update restaurant
restaurantsRouter.put("/:id", async (req, res) => {
  const userId = req.user.userId;
  const id = Number(req.params.id);
  const { name, rating } = req.body;

  const existent = await prisma.restaurant.findFirst({ where: { id, userId } });
  if (!existent) {
    return res.status(404).json({ message: "Restaurant inexistent" });
  }

  const ratingInt = rating !== undefined ? Number(rating) : existent.rating;
  if (ratingInt < 1 || ratingInt > 5) {
    return res.status(400).json({ message: "Rating trebuie 1..5" });
  }

  const updated = await prisma.restaurant.update({
    where: { id },
    data: {
      name: name !== undefined ? String(name).trim() : existent.name,
      rating: ratingInt
    }
  });

  return res.status(200).json(updated);
});

// Stergere restaurant (cu copii)
restaurantsRouter.delete("/:id", async (req, res) => {
  const userId = req.user.userId;
  const id = Number(req.params.id);

  const existent = await prisma.restaurant.findFirst({ where: { id, userId } });
  if (!existent) {
    return res.status(404).json({ message: "Restaurant inexistent" });
  }

  await prisma.menuItem.deleteMany({ where: { restaurantId: id } });
  await prisma.address.deleteMany({ where: { restaurantId: id } });
  await prisma.restaurant.delete({ where: { id } });

  return res.status(204).send();
});
