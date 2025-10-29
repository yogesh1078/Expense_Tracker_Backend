import express from 'express';
import Expense from '../models/Expense.js';
import { authenticateToken } from '../utils/auth.js';
import { body, validationResult, query } from 'express-validator';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all expenses for the authenticated user
router.get('/', 
  [
    query('category').optional().trim(),
    query('startDate').optional().isISO8601(),
    query('endDate').optional().isISO8601()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { category, startDate, endDate } = req.query;
      const filter = { userId: req.userId };

      // Add filters if provided
      if (category) filter.category = category;
      if (startDate || endDate) {
        filter.date = {};
        if (startDate) filter.date.$gte = new Date(startDate);
        if (endDate) filter.date.$lte = new Date(endDate);
      }

      const expenses = await Expense.find(filter).sort({ date: -1 });
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Get expense statistics
router.get('/stats', async (req, res) => {
  try {
    const userId = req.userId;

    // Get all expenses
    const expenses = await Expense.find({ userId });

    // Calculate total
    const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Calculate category-wise summary
    const categorySummary = expenses.reduce((acc, expense) => {
      if (acc[expense.category]) {
        acc[expense.category] += expense.amount;
      } else {
        acc[expense.category] = expense.amount;
      }
      return acc;
    }, {});

    // Format category summary
    const categoryBreakdown = Object.entries(categorySummary).map(([category, amount]) => ({
      category,
      amount,
      percentage: ((amount / totalExpense) * 100).toFixed(2)
    }));

    res.json({
      totalExpense,
      totalCount: expenses.length,
      categoryBreakdown
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single expense
router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, userId: req.userId });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new expense
router.post('/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('date').isISO8601().withMessage('Valid date is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, amount, category, date } = req.body;

      const expense = new Expense({
        title,
        amount,
        category,
        date,
        userId: req.userId
      });

      await expense.save();
      res.status(201).json(expense);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Update expense
router.put('/:id',
  [
    body('title').optional().trim().notEmpty(),
    body('amount').optional().isFloat({ min: 0 }),
    body('category').optional().trim().notEmpty(),
    body('date').optional().isISO8601()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const expense = await Expense.findOne({ _id: req.params.id, userId: req.userId });
      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }

      // Update fields
      Object.keys(req.body).forEach(key => {
        if (['title', 'amount', 'category', 'date'].includes(key)) {
          expense[key] = req.body[key];
        }
      });

      await expense.save();
      res.json(expense);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Delete expense
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

