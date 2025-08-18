const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// GET /api/cars?q=term&type=suv
router.get('/', async (req, res) => {
  try {
    const { q, type } = req.query;
    const filter = {};
    if (type && type !== 'all') filter.type = type.toLowerCase();

    if (q) {
      const regex = new RegExp(q, 'i');
      filter.$or = [{ make: regex }, { model: regex }, { description: regex }];
    }

    const items = await Car.find(filter).sort({ createdAt: -1 });
    // Corrected line: Send the data inside a 'cars' key
    res.json({ cars: items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/cars/:id
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Not found' });
    // The single item response is fine as it is.
    res.json(car);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;