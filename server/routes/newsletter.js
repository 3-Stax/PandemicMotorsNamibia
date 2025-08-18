const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });

    // Basic dedupe: prevent duplicate emails
    const existing = await Newsletter.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Already subscribed' });

    const entry = new Newsletter({ email });
    await entry.save();
    res.json({ message: 'Subscribed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
