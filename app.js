const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const playerRoutes = require('./routes/playerroutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/playerManagement', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Serve static files (if you have a frontend like index.html)
app.use(express.static('public')); // If you have a 'public' folder with static assets

// Root route (Fix the "Cannot GET /" issue)
app.get('/', (req, res) => {
  res.send('Welcome to the Player Management API');
});

// Routes
app.use('/api/players', playerRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
