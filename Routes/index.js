const express = require("express");
const userRoutes = require("./user.route");
const expenseRoute = require("./expense.route");

const router = express.Router();

router.use("/", userRoutes);
router.use("/expenses", expenseRoute);

module.exports = router;
