const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Transaction = mongoose.model('Transaction');

const validMonths = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];


const isValidMonth = (month) => validMonths.includes(month);


router.get('/piechart', async (req, res) => {
  const month = req.query.month; 
  if (!isValidMonth(month)) {
    return res.status(400).json({ error: 'Invalid month' });
  }

  const monthIndex = validMonths.indexOf(month) + 1;

  try {
    const results = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, monthIndex]
          }
        }
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          category: "$_id",
          count: 1,
          _id: 0
        }
      }
    ]);

    const formattedResults = results.map(item => ({
      category: item.category,
      count: item.count
    }));

    console.log("Pie Chart Results:", formattedResults);

    res.json(formattedResults);
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;