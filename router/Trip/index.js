const express = require("express");
const { getTripsRouter } = require("./getTrips");
const { TripCreateRouter } = require("./createTrip");

const router = express.Router();
router.use(getTripsRouter);
router.use(TripCreateRouter);

module.exports = { TripsRouter: router };
