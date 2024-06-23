const express = require('express');
const router = express.Router();
const axios = require('axios');
const Transaction = require('../models/Transaction');

// Route to initialize the database
router.get('/init', async (req, res) => {
  try {
    // Check if there are any transactions in the database
    const transactionCount = await Transaction.countDocuments();
    if (transactionCount > 0) {
      return res.status(200).send('Database already initialized');
    }
    const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');

    await Transaction.insertMany(data);

    res.status(200).send('Database initialized with seed data');
  } catch (error) {
    res.status(500).send('Error initializing database');
  }
});

module.exports = router;
