const express = require("express");
const Trip = require("../../models/Trip");
const User = require("../../models/User");
const router = express.Router();
const { body } = require("express-validator");
const { requireAuth, validateRequest } = require("../../middleware");

router.post("/", requireAuth, validateRequest, async (req, res) => {
  try {
    console.log("req.user:", req.user); // Debug log
    const { destination, budget, start_date, end_date } = req.body;
    const UserDoc = await User.findById(req.user.id);
    if (!UserDoc) {
      return res.status(404).json({ message: "user not found" });
    }

    const newTrip = new Trip({
      destination,
      budget,
      author: req.user.id,
      start_date,
      end_date,
    });
    console.log("New Trip Data:", newTrip);
    await newTrip.save();
    console.log("UserDoc:", UserDoc);
    UserDoc.mytrips.push(newTrip._id);
    await UserDoc.save();
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = { TripCreateRouter: router };
