const express = require("express");
const { getTripsRouter } = require("./getTrips");
const { TripCreateRouter } = require("./createTrip");
const { ExpensesRouter } = require("../Expense");
const { AIAnalysisRouter } = require("./AI");

const router = express.Router();
router.use(getTripsRouter);
router.use(TripCreateRouter);
router.use("/expenses", ExpensesRouter);
router.use(AIAnalysisRouter);

module.exports = { TripsRouter: router };
