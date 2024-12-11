//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

const express = require("express");
const Trip = require("../../models/Trip");
const OpenAI = require("openai");
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get("/:trip_id/ai-analysis", async (req, res) => {
  try {
    const { trip_id } = req.params;

    const trip = await Trip.findById(trip_id).populate("myExpense");
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const { destination, budget, start_date, end_date, myExpense } = trip;

    const totalExpenses = myExpense.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    const categorizedExpenses = myExpense.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    // const prompt = `
    //   Analyze this trip data:
    //   - Destination: ${destination}
    //   - Budget: $${budget}
    //   - Start Date: ${start_date.toDateString()}
    //   - End Date: ${new Date(end_date).toDateString()}
    //   - Total Expenses: $${totalExpenses}
    //   - Expenses by Category:
    //   ${Object.entries(categorizedExpenses)
    //     .map(([category, amount]) => `  * ${category}: $${amount}`)
    //     .join("\n")}

    //   Provide the following:
    //   1. How well the budget is managed.
    //   2. Suggestions for optimizing expenses.
    //   3. Recommendations for activities or places to visit in ${destination} within budget.
    // `;
    const prompt = `
Analyze the following trip details:
- Destination: ${destination}
- Budget: $${budget}
- Dates: ${new Date(start_date).toDateString()} to ${new Date(
      end_date
    ).toDateString()}
- Total Expenses: $${totalExpenses}
- Expense Breakdown:
${Object.entries(categorizedExpenses)
  .map(([category, amount]) => `  - ${category}: $${amount}`)
  .join("\n")}

Please provide:
1. A review of how well the budget was managed.
2. Tips for cutting unnecessary costs.
3. Recommendations for budget-friendly activities or must-visit spots in ${destination}.
`;
    const categorySpending = myExpense.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const analysis = aiResponse.choices[0].message.content;

    res.status(200).json({ analysis, categorySpending });
  } catch (error) {
    console.error("AI Analysis Error:", error.message);
    res.status(500).json({ message: "Failed to analyze trip data" });
  }
});

module.exports = { AIAnalysisRouter: router };
