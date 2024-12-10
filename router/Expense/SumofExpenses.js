const express = require("express");
const Expense = require("../../models/Expense");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/:trip_id/total", async (req, res) => {
  try {
    const { trip_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(trip_id)) {
      return res.status(400).json({ message: "Invalid trip_id" });
    }

    const total = await Expense.aggregate([
      { $match: { trip_id: new mongoose.Types.ObjectId(req.params.trip_id) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    res.status(200).json(total[0]?.total || 0);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { SumofExpensesRouter: router };
