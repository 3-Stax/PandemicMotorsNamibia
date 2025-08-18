const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  const { name, email, phone, interest, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const entry = new Contact({ name, email, phone, interest, message });
  await entry.save();
  // optionally: send email notification with nodemailer
  res.json({ message: 'Contact saved' });
});

module.exports = router;
