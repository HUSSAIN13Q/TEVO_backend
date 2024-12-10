const express = require("express");
const Expense = require("../../models/Expense");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = { getSingleExpensesRouter: router };
