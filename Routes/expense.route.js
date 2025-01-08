const express = require("express");
const { authMiddleware } = require("../Middlewares/auth.middleware");
const {
  addExpense,
  getExpenses,
} = require("../Controllers/expense.controller");
const expenseRoute = express.Router();

expenseRoute.post("/", authMiddleware, addExpense);
expenseRoute.get("/", authMiddleware, getExpenses);

module.exports = expenseRoute;
