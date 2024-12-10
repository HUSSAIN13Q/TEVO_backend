const express = require("express");
const Expense = require("../../models/Expense");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find({
      trip_id: req.params.tripId,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = { getExpensesRouter: router };
