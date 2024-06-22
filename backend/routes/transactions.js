const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET /api/transactions
// List all transactions with search and pagination
router.get('/transactions', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const search = req.query.search || '';

    const query = {};

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      const searchPrice = parseFloat(search);

      query.$or = [
        { title: { $regex: searchRegex } }, // Case-insensitive search
        { description: { $regex: searchRegex } },
      ];

      // Only include the price search if it's a valid number
      if (!isNaN(searchPrice)) {
        query.$or.push({ price: searchPrice });
      }
    }

    // console.log(query);

    const totalItems = await Transaction.countDocuments(query);
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    res.json({
      transactions,
      currentPage: page,
      totalPages: Math.ceil(totalItems / perPage),
      totalItems
    });
  } catch (error) {
    console.error('Error fetching transactions:', error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
