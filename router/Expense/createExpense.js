const express = require("express");
const Expense = require("../../models/Expense");
const Trip = require("../../models/Trip");
const router = express.Router();
const { body } = require("express-validator");
const { validateRequest } = require("../../middleware");

router.post(
  "/:trip_id",
  [
    body("amount")
      .isFloat({ min: 0 })
      .withMessage("Amount must be a positive number"),
    body("description").optional().isString(),
    body("category").notEmpty().withMessage("Category is required"),
  ],
  validateRequest,
  async (req, res) => {
    console.log("hi");

    try {
      console.log("req.params:", req.params);
      console.log("req.body:", req.body);
      const { trip_id } = req.params;
      const { amount, description, category } = req.body;

      console.log("tripID", trip_id);
      const trip = await Trip.findById(trip_id);
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }

      const expense = new Expense({
        trip_id,
        amount,
        description,
        category,
      });
      await expense.save();

      trip.myExpense.push(expense._id);
      await trip.save();

      res.status(201).json(expense);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

module.exports = { ExpenseCreateRouter: router };
