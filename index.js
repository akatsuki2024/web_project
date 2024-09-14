require('dotenv').config();  // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware to handle JSON data
app.use(express.json());

// Serve static files from the 'html' directory
app.use(express.static(path.join(__dirname, 'html')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// Connect to MongoDB using the connection URI from environment variables
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Basic route to serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

// Define a route for user registration
app.post('/register', async (req, res) => {
  try {
    const { name, collegeId, branch, year, contactNumber, address } = req.body;

    // Create a new user (assumes User model is defined in 'models/User.js')
    const user = new User({
      name,
      collegeId,
      branch,
      year,
      contactNumber,
      address
    });

    // Save the user to the database
    await user.save();

    res.status(201).send('User registered successfully');
  } catch (err) {
    console.error(err); // Log any errors
    res.status(400).send('Error registering user');
  }
});

// Define a route for user login
app.post('/login', async (req, res) => {
  const { collegeId } = req.body;

  // Find a user by their collegeId
  const user = await User.findOne({ collegeId });

  if (user) {
    res.status(200).send('Login successful');
  } else {
    res.status(400).send('User not found');
  }
});

// Test route to check if API is working
app.get('/test', (req, res) => {
  res.send('Test API working!');
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
