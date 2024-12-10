const express = require("express");
const { getTripsRouter } = require("./getTrips");
const { TripCreateRouter } = require("./createTrip");
const { ExpensesRouter } = require("../Expense");

const router = express.Router();
router.use(getTripsRouter);
router.use(TripCreateRouter);
router.use("/expenses", ExpensesRouter);

module.exports = { TripsRouter: router };
