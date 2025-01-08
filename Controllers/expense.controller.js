const { Expense } = require("../Models");
const APIerror = require("../utils/apiError");
const APIresponse = require("../utils/apiResponse");
const { MESSAGES, USER_ROLE } = require("../utils/constant");
const {
  createExpense,
  getExpensesSchema,
} = require("../Validations/expenseSchema");

const addExpense = async (req, res, next) => {
  const { error } = createExpense.validate(req.body);
  if (error) {
    return next(new APIerror(error.message, 400));
  }
  try {
    const userId = req.user._id;
    const expenseInput = { ...req.body, userId };
    const expense = await Expense.create(expenseInput);
    return APIresponse(res, 201, MESSAGES.EXPENSE_ADDED, expense);
  } catch (error) {
    console.log("Error Adding Expense: ", error);
    return next(new APIerror(MESSAGES.ERROR_ADDING_EXPENSE));
  }
};

const getExpenses = async (req, res, next) => {
  const { error } = getExpensesSchema.validate(req.query);
  if (error) {
    return next(new APIerror(error.message, 400));
  }
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const match = {};
    if (req.user.role === USER_ROLE.USER) {
      match.userId = req.user._id;
    }

    if (req.query.start_date) {
      match.date = { ...match.date, $gte: new Date(req.query.start_date) };
    }

    if (req.query.end_date) {
      match.date = { ...match.date, $lte: new Date(req.query.end_date) };
    }

    if (req.query.category) {
      match.category = req.query.category;
    }

    if (req.query.amount_min) {
      match.amount = { ...match.amount, $gte: parseInt(req.query.amount_min) };
    }

    if (req.query.amount_max) {
      match.amount = { ...match.amount, $lte: parseInt(req.query.amount_max) };
    }

    const expenses = await Expense.aggregate([
      { $match: match },
      { $sort: { date: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);

    const totalExpenses = await Expense.countDocuments();
    const totalPages = Math.ceil(totalExpenses / limit);

    return APIresponse(res, 200, "Expenses fetched successfully", {
      pagination: {
        currentPage: page,
        totalPages,
        totalExpenses,
        pageSize: expenses.length,
      },
      expenses,
    });
  } catch (error) {
    console.log("Error Fetching Expenses: ", error);
    return next(new APIerror(MESSAGES.ERROR_FETCHING_EXPENSE));
  }
};

module.exports = { addExpense, getExpenses };
