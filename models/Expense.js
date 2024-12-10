const { model, Schema } = require("mongoose");

const ExpenseSchema = new Schema(
  {
    trip_id: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
    },
    amount: { type: Number, required: true, min: 0 },
    description: { type: String },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Expense", ExpenseSchema);
