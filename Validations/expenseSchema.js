const Joi = require("joi");

const createExpense = Joi.object({
  category: Joi.string().required(),
  description: Joi.string().required(),
  amount: Joi.number().integer().required().min(1),
  date: Joi.date().required(),
});

const getExpensesSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).optional(),
  start_date: Joi.date().optional(),
  end_date: Joi.date().optional(),
  category: Joi.string().optional(),
  amount_min: Joi.number().integer().min(0).optional(),
  amount_max: Joi.number().integer().min(0).optional(),
});

module.exports = { createExpense, getExpensesSchema };
