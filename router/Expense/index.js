const express = require("express");
const { ExpenseCreateRouter } = require("./createExpense");
const { getExpensesRouter } = require("./getExpenses");
const { getSingleExpensesRouter } = require("./GetSingleExpense");
const { SumofExpensesRouter } = require("./SumofExpenses");

const router = express.Router();
router.use(getExpensesRouter);
router.use(ExpenseCreateRouter);
router.use(SumofExpensesRouter);
router.use(getSingleExpensesRouter);

module.exports = { ExpensesRouter: router };
