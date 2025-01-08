const express = require("express");
const {
  register,
  login,
  getProfile,
} = require("../Controllers/user.controller");
const { authMiddleware } = require("../Middlewares/auth.middleware");
const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.get("/profile", authMiddleware, getProfile);

module.exports = userRoutes;
