const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const axios = require('axios');

const port = 5000;
const app = express();

app.use(bodyParser.json());
app.use(cors());
// MongoDB Connection
mongoose.connect('MONGO DB URL', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));

// DB Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  profession: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// JWT Auth Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).json({ error: 'No token provided' });

  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) return res.status(403).json({ error: 'Failed to authenticate token' });

    req.user = user;
    next();
  });
};



// Signup
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, phone, profession, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, phone, profession, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (!user) return res.status(400).json({ error: 'Invalid Credentials' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ error: 'Invalid Credentials' });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get Movie List from Hoblist API
app.post('/api/movies', authenticateToken, (req, res) => {
  const { category, language, genre, sort } = req.body;

  axios
    .post('https://hoblist.com/api/movieList', { category, language, genre, sort })
    .then((response) => res.json(response.data))
    .catch((error) => res.status(500).json({ error: 'Server error' }));
});

// Get All Registered Users (Protected Route)
app.get('/api/users', authenticateToken, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Update User Details (Protected Route)
app.put('/api/users/:id', async (req, res) => {
  const { name, phone } = req.body;
  await User.findByIdAndUpdate(req.params.id, { name, phone });
  res.json({ message: 'User updated successfully' });
});

// Delete User (Protected Route)
app.delete('/api/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted successfully' });
});

// Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));
