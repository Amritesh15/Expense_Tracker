import express from "express";
import Expense from "../models/Expense.js";
import authenticate from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all expenses for a logged-in user
router.get("/getAllExpenses", authenticate, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }); // Use req.user.id from decoded JWT
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new expense
router.post("/add", authenticate, async (req, res) => {
  try {
    const { amount, category, description } = req.body;

    const expense = new Expense({
      userId: req.user.id, // Use req.user.id from decoded JWT
      amount,
      category,
      description,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an expense
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const expense = await Expense.findOne({ 
      _id: req.params.id,
      userId: req.user.id 
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await expense.deleteOne();
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
