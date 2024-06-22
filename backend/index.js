require('dotenv').config();
const express = require('express');
const axios = require('axios');
const connectDB = require('./config/db');
const initDB = require('./routes/initDB');
const transactionsRoute = require('./routes/transactions');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/api', initDB); // Intialise the database
app.use('/api', transactionsRoute); // Mount transactions route

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send('Welcome')
})

const initializeDatabase = async () => {
  try {
    const res = await axios.get(`http://localhost:${PORT}/api/init`);
    console.log(res.data);
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
