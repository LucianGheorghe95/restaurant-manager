import jwt from "jsonwebtoken";

export function genereazaToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
}
