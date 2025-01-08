const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  category: String,
  description: String,
  date: Date,
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
