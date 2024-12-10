const { model, Schema } = require("mongoose");

const TripSchema = new Schema({
  destination: { type: String, required: true },
  budget: { type: Number, required: true },
  start_date: { type: String },
  end_date: { type: String },
  //image: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Trip", TripSchema);
