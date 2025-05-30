const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/dashboard',
  authenticateToken,
  authorizeRoles('admin'),
  (req, res) => {
    res.json({ message: `Welcome admin ${req.user.id}` });
  }
);

module.exports = router;
