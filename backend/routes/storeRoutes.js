const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// PostgreSQL connection
const pool = require('../config/db');

// Get all stores
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM stores');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get store by owner
router.get('/owner/:ownerId', authenticateToken, async (req, res) => {
    const { ownerId } = req.params;
  
    try {
      const result = await pool.query(
        'SELECT * FROM stores WHERE owner_id = $1',
        [ownerId]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'No store found for this owner' });
      }
  
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error fetching owner store:', err);
      res.status(500).json({ error: err.message });
    }
  });
  

// Create a new store
router.post('/', authenticateToken, async (req, res) => {
  const { name, email, address } = req.body;
  const ownerId = req.user.id;
  try {
    const result = await pool.query(
      'INSERT INTO stores (name, email, address, owner_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, address, ownerId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update store
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, email, address } = req.body;
  try {
    const result = await pool.query(
      'UPDATE stores SET name = $1, email = $2, address = $3 WHERE id = $4 RETURNING *',
      [name, email, address, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rate a store
router.post('/:id/rate', authenticateToken, async (req, res) => {
    const { id: storeId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;
  
    try {
      await pool.query(
        `INSERT INTO ratings (user_id, store_id, rating)
         VALUES ($1, $2, $3)
         ON CONFLICT (user_id, store_id)
         DO UPDATE SET rating = EXCLUDED.rating`,
        [userId, storeId, rating]
      );
  
      res.json({ message: 'Rating submitted successfully' });
    } catch (err) {
      console.error('Rating submission error:', err);
      res.status(500).json({ error: err.message });
    }
  });
  

module.exports = router;
