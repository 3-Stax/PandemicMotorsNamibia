require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(morgan('dev'));

// Import routes
const carsRouter = require('./routes/cars');
const servicesRouter = require('./routes/services');
const testimonialsRouter = require('./routes/testimonials');
const contactRouter = require('./routes/contact');
const newsletterRouter = require('./routes/newsletter');

// Use routes
app.use('/api/cars', carsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/newsletter', newsletterRouter);

// Serve static files (uploads)
app.use('/uploads', express.static('uploads'));

// Port and Mongo URI from env
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in .env file');
  process.exit(1);
}

// Connect to MongoDB and start server
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
