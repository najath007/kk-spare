const express = require('express');
const router = express.Router();
const db = require('../config/db');
router.get('/', async (req, res) => {
  try {
    const [categories] = await db.execute('SELECT * FROM categories ORDER BY name');
    res.json(categories);
  } catch (err) { 
      console.error(err);
      res.status(500).json({ message: 'Server error', error: err.message }); 
  }
});
module.exports = router;