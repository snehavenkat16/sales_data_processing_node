const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const connectDb = require("./server/config/development");
const revenueRoutes = require('./routes/revenue_calc_router');
const refreshRoutes = require('./routes/refreshRouter');
const uploadRoutes = require('./routes/uploads');



// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));  

// Routes
app.use('/api/revenue', revenueRoutes);
app.use('/api/refresh', refreshRoutes);
app.use('/api/upload', uploadRoutes);

connectDb();


// a cron job to refresh data every day at midnight
cron.schedule('0 0 * * *', async () => {
    console.log('Running scheduled data refresh job...');
    await refreshData(null, { status: () => ({ json: console.log }) });
});


app.get('/', (req, res) => {
  res.send('Sales Analysis App is running!');
});


  
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
