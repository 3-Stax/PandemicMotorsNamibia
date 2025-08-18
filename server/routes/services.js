const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

router.get('/', async (req, res) => {
  try {
    const items = await Service.find().sort({ createdAt: -1 });
    // Corrected line: Wrap the items in a 'services' key
    res.json({ services: items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;