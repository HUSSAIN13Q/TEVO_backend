const express = require("express");
const { getTripsRouter } = require("./getTrips");

const router = express.Router();
router.use(getTripsRouter);

module.exports = { TripsRouter: router };
