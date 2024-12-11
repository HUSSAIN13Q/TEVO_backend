const express = require("express");
const Expense = require("../../models/Expense");
const router = express.Router();

router.get("/:trip_id", async (req, res) => {
  try {
    // Corrected parameter usage
    const expenses = await Expense.find({
      trip_id: req.params.trip_id,
    });

    if (expenses.length === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { getExpensesRouter: router };
