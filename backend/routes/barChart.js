const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Transaction = mongoose.model('Transaction');

const validMonths = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

const isValidMonth = (month) => validMonths.includes(month);

router.get('/barchart', async (req, res) => {
  const month = req.query.month; // Get the month from query parameters

  if (!isValidMonth(month)) {
    return res.status(400).json({ error: 'Invalid month' });
  }

  const monthIndex = validMonths.indexOf(month) + 1; // Adjusted to match $month which is 1-based

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
          _id: null,
          '0 - 100': {
            $sum: {
              $cond: [{ $lte: ["$price", 100] }, 1, 0]
            }
          },
          '101 - 200': {
            $sum: {
              $cond: [{ $and: [{ $gt: ["$price", 100] }, { $lte: ["$price", 200] }] }, 1, 0]
            }
          },
          '201 - 300': {
            $sum: {
              $cond: [{ $and: [{ $gt: ["$price", 200] }, { $lte: ["$price", 300] }] }, 1, 0]
            }
          },
          '301 - 400': {
            $sum: {
              $cond: [{ $and: [{ $gt: ["$price", 300] }, { $lte: ["$price", 400] }] }, 1, 0]
            }
          },
          '401 - 500': {
            $sum: {
              $cond: [{ $and: [{ $gt: ["$price", 400] }, { $lte: ["$price", 500] }] }, 1, 0]
            }
          },
          '501 - 600': {
            $sum: {
              $cond: [{ $and: [{ $gt: ["$price", 500] }, { $lte: ["$price", 600] }] }, 1, 0]
            }
          },
          '601 - 700': {
            $sum: {
              $cond: [{ $and: [{ $gt: ["$price", 600] }, { $lte: ["$price", 700] }] }, 1, 0]
            }
          },
          '701 - 800': {
            $sum: {
              $cond: [{ $and: [{ $gt: ["$price", 700] }, { $lte: ["$price", 800] }] }, 1, 0]
            }
          },
          '801 - 900': {
            $sum: {
              $cond: [{ $and: [{ $gt: ["$price", 800] }, { $lte: ["$price", 900] }] }, 1, 0]
            }
          },
          '901 - above': {
            $sum: {
              $cond: [{ $gt: ["$price", 900] }, 1, 0]
            }
          }
        }
      },
      {
        $project: {
          _id: 0, // Exclude the _id field from the output
          range: { $objectToArray: "$$ROOT" } // Convert the grouped fields to key-value pairs
        }
      },
      {
        $unwind: "$range" // Unwind to separate each range into its own document
      },
      {
        $match: {
          "range.k": { $ne: "_id" } // Filter out the document with _id as range
        }
      },
      {
        $project: {
          range: "$range.k",
          count: "$range.v"
        }
      }
    ]);

    // console.log("Aggregation Results:", results);

    res.json(results);
  } catch (error) {
    console.error("Error during aggregation:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;