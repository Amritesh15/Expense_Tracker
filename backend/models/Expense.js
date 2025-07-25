import mongoose from "mongoose"; // ES6 syntax

const expenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to User
    amount: { type: Number, required: true },
    category: { type: String, required: true }, // e.g., Food, Rent
    description: { type: String },
    date: { type: Date, default: Date.now },
  });
  
  const Expense = mongoose.model("Expense", expenseSchema);
  export default Expense;
  