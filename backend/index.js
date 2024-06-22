require('dotenv').config();
const express = require('express');
const axios = require('axios');
const connectDB = require('./config/db');
const initDB = require('./routes/initDB');
const transactionsRoute = require('./routes/transactions');
const statisticsRoute = require('./routes/statistics');
const barChartRoute = require('./routes/barChart');
const pieChartRoute = require('./routes/pieChart');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/api', initDB); // Intialise the database
app.use('/api', transactionsRoute); // Mount transactions route
app.use('/api', statisticsRoute); // Mount statistics route
app.use('/api', barChartRoute); // Mount barChart route
app.use('/api', pieChartRoute); // Mount pieChart route

// Combined Data API endpoint
app.get('/api/combinedData', async (req, res) => {
  try {
    // Extract query parameters
    const { month, page, perPage, search } = req.query;

    // Make requests to the three APIs concurrently, with appropriate parameters
    const [transactionsResponse, statisticsResponse, barChartResponse] = await Promise.all([
      axios.get(`http://localhost:${PORT}/api/transactions`, {
        params: { page, perPage, search }
      }),
      axios.get(`http://localhost:${PORT}/api/statistics`, {
        params: { month }
      }),
      axios.get(`http://localhost:${PORT}/api/barChart`, {
        params: { month }
      })
    ]);

    // Combine responses into a single JSON object
    const combinedData = {
      transactions: transactionsResponse.data,
      statistics: statisticsResponse.data,
      barChart: barChartResponse.data
    };

    // Send the combined JSON response
    res.json(combinedData);
  } catch (error) {
    console.error('Error fetching combined data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Welcome');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
