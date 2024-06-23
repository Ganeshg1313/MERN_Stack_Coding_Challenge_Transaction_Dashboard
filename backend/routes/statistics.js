const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');


router.get('/statistics', async (req, res) => {
  try {
    const month = req.query.month;

   
    if (!isValidMonth(month)) {
      return res.status(400).json({ msg: 'Invalid month. Please provide a valid month.' });
    }

   
    const monthNumber = new Date(`${month} 1`).getMonth() + 1;

    // Calculate total sale amount
    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, monthNumber]
          },
          sold: true
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" }
        }
      }
    ]);

    
    const totalSoldItems = await Transaction.countDocuments({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthNumber]
      },
      sold: true
    });

    
    const totalNotSoldItems = await Transaction.countDocuments({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthNumber]
      },
      sold: false
    });

    const finalTotalSalesAmount = totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0

    res.json({
      totalSaleAmount: finalTotalSalesAmount.toFixed(2),
      totalSoldItems,
      totalNotSoldItems
    });
  } catch (error) {
    console.error('Error fetching statistics:', error.message);
    res.status(500).send('Server Error');
  }
});

// Function to validate month (optional)
function isValidMonth(month) {
  const validMonths = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return validMonths.includes(month);
}

module.exports = router;