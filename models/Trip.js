const { model, Schema } = require("mongoose");

const TripSchema = new Schema({
  destination: { type: String, required: true },
  budget: { type: Number, required: true },
  start_date: { type: Date },
  end_date: { type: Date },
  //image: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Trip", TripSchema);
