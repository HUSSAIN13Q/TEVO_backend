const express = require("express");
const Trip = require("../../models/Trip");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const trip = await Trip.find().populate("author", "-password -__v ");

    res.json(trip);
  } catch (err) {
    next(err);
  }
});

module.exports = { getTripsRouter: router };
