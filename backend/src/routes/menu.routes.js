import express from "express";
import { PrismaClient } from "@prisma/client";
import { auth } from "../middleware/auth.js";

const prisma = new PrismaClient();
export const menuRouter = express.Router();

menuRouter.use(auth);

// Adaugare produs in meniu
menuRouter.post("/:restaurantId/menu", async (req, res) => {
  const userId = req.user.userId;
  const restaurantId = Number(req.params.restaurantId);
  const { name, price, category } = req.body;

  const rest = await prisma.restaurant.findFirst({ where: { id: restaurantId, userId } });
  if (!rest) return res.status(404).json({ message: "Restaurant inexistent" });

  if (!name || String(name).trim().length === 0) {
    return res.status(400).json({ message: "Numele produsului este obligatoriu" });
  }

  const priceNum = Number(price);
  if (Number.isNaN(priceNum) || priceNum <= 0) {
    return res.status(400).json({ message: "Pret invalid" });
  }

  const created = await prisma.menuItem.create({
    data: {
      name: String(name).trim(),
      price: priceNum,
      category: category ? String(category) : "General",
      restaurantId
    }
  });

  return res.status(201).json(created);
});

// Stergere produs din meniu
menuRouter.delete("/menu/:id", async (req, res) => {
  const userId = req.user.userId;
  const id = Number(req.params.id);

  const item = await prisma.menuItem.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ message: "Produs inexistent" });

  const rest = await prisma.restaurant.findFirst({ where: { id: item.restaurantId, userId } });
  if (!rest) return res.status(403).json({ message: "Nu ai acces la acest produs" });

  await prisma.menuItem.delete({ where: { id } });
  return res.status(204).send();
});
