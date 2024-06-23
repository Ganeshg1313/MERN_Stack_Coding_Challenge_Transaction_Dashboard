const { PORT} = require('../config');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const connectDB = require('../config/db');
const initDB = require('../routes/initDB');
const transactionsRoute = require('../routes/transactions');
const statisticsRoute = require('../routes/statistics');
const barChartRoute = require('../routes/barChart');
const pieChartRoute = require('../routes/pieChart');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connection to DB
connectDB();

// Routes
app.use('/api', initDB); // Intialise the database
app.use('/api', transactionsRoute); // Mount transactions route
app.use('/api', statisticsRoute); // Mount statistics route
app.use('/api', barChartRoute); // Mount barChart route
app.use('/api', pieChartRoute); // Mount pieChart route

// Function to call the initialization API
const initializeDatabase = async () => {
  try {
    const res = await axios.get(`https://transaction-dashboard-api.vercel.app/api/init`);
    console.log(res.data);
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

initializeDatabase();

// Combined Data API endpoint
app.get('/api/combinedData', async (req, res) => {
  try {
    
    const { month, page, perPage, search } = req.query;

    const [transactionsResponse, statisticsResponse, barChartResponse] = await Promise.all([
      axios.get(`https://transaction-dashboard-api.vercel.app/api/transactions`, {
        params: { page, perPage, search }
      }),
      axios.get(`https://transaction-dashboard-api.vercel.app/api/statistics`, {
        params: { month }
      }),
      axios.get(`https://transaction-dashboard-api.vercel.app/api/barchart`, {
        params: { month }
      })
    ]);

    // Combine responses into a single JSON object
    const combinedData = {
      transactions: transactionsResponse.data,
      statistics: statisticsResponse.data,
      barChart: barChartResponse.data
    };

    res.json(combinedData);
  } catch (error) {
    console.error('Error fetching combined data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome');
});

// Start 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});