import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { genereazaToken } from "../utils/jwt.js";

const prisma = new PrismaClient();
export const authRouter = express.Router();

// Inregistrare
authRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email si parola sunt obligatorii" });
  }

  const existent = await prisma.user.findUnique({ where: { email } });
  if (existent) {
    return res.status(409).json({ message: "Email deja folosit" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashed }
  });

  const token = genereazaToken({ userId: user.id, email: user.email });
  return res.status(201).json({ token });
});

// Autentificare
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Credentiale invalide" });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(401).json({ message: "Credentiale invalide" });
  }

  const token = genereazaToken({ userId: user.id, email: user.email });
  return res.status(200).json({ token });
});
