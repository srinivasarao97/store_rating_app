const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ===============================
// Register a new Normal User
// ===============================
exports.registerUser = async (req, res) => {
  const { name, email, password, address } = req.body;

  try {
    // Validate inputs (optional – can use express-validator for strict rules)

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = 'user'; // default role for signup

    // Insert user into DB
    const result = await pool.query(
      'INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [name, email, hashedPassword, address, role]
    );

    res.status(201).json({ message: 'User registered', userId: result.rows[0].id });
  } catch (err) {
    console.error('Registration Error:', err.message);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

// ===============================
// Login User (any role)
// ===============================
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Look up user by email
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    // User not found
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // Compare password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Return token + user data
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ error: 'Server error during login' });
  }
};
