require('dotenv').config();
const mongoose = require('mongoose');
const Car = require('./models/Car');
const Service = require('./models/Service');
const Testimonial = require('./models/Testimonial');

const MONGO_URI = process.env.MONGO_URI;

const cars = [
  // paste the 10 car objects exactly as in your script.js
  {
    id: 1,
    make: 'Toyota',
    model: 'Hilux',
    year: 2022,
    fuel: 'Diesel',
    transmission: 'Automatic',
    type: 'truck',
    images: ['images/hilux/hiluxp1.jpg', 'images/hilux/hiluxp2.jpg'],
    price: 'N$ 450,000',
    description: 'A robust and reliable pickup truck, perfect for both work and adventure. Features include a powerful diesel engine, spacious cabin, and advanced safety features.'
  },
  {
    id: 2,
    make: 'Volkswagen',
    model: 'Jetta',
    year: 2015,
    fuel: 'Petrol',
    transmission: 'Automatic',
    type: 'sedan',
    images: ['images/jetta/jettap1.jpg', 'images/jetta/jettap2.jpg'],
    price: 'N$ 220,000',
    description: 'A comfortable and efficient sedan, ideal for city driving and long commutes. Known for its smooth ride and fuel economy.'
  },
  {
    id: 3,
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2020,
    fuel: 'Petrol',
    transmission: 'Automatic',
    type: 'sedan',
    images: ['images/mercedes/mercp1.jpg', 'images/mercedes/mercp2.jpg'],
    price: 'N$ 680,000',
    description: 'Luxury and performance combined. This C-Class offers a premium driving experience with state-of-the-art technology and exquisite comfort.'
  },
  {
    id: 4,
    make: 'BMW',
    model: 'X5',
    year: 2019,
    fuel: 'Diesel',
    transmission: 'Automatic',
    type: 'SUV',
    images: ['images/bmw/bmwp1.jpg', 'images/bmw/bmwp2.jpg'],
    price: 'N$ 750,000',
    description: 'A powerful and spacious SUV, perfect for families and adventurous spirits. Excellent handling and a luxurious interior.'
  },
  {
    id: 5,
    make: 'Ford',
    model: 'Ranger',
    year: 2021,
    fuel: 'Diesel',
    transmission: 'Manual',
    type: 'truck',
    images: ['images/ranger/rangerp1.jpg', 'images/ranger/rangerp2.jpg'],
    price: 'N$ 420,000',
    description: 'Built Ford Tough! This Ranger is ready for any challenge, offering impressive towing capabilities and off-road prowess.'
  },
  {
    id: 6,
    make: 'Hyundai',
    model: 'Tucson',
    year: 2018,
    fuel: 'Petrol',
    transmission: 'Automatic',
    type: 'SUV',
    images: ['images/tucson/tucsonp1.jpg', 'images/tucson/tucsonp2.jpg'],
    price: 'N$ 310,000',
    description: 'A versatile and stylish compact SUV, offering a comfortable ride and modern features. Great for urban adventures and weekend getaways.'
  },
  {
    id: 7,
    make: 'Audi',
    model: 'A4',
    year: 2017,
    fuel: 'Petrol',
    transmission: 'Automatic',
    type: 'sedan',
    images: ['images/audi/audip1.jpg', 'images/audi/audip2.jpg'],
    price: 'N$ 380,000',
    description: 'Elegance meets performance. The Audi A4 delivers a refined driving experience with a sophisticated interior and advanced technology.'
  },
  {
    id: 8,
    make: 'Nissan',
    model: 'Navara',
    year: 2020,
    fuel: 'Diesel',
    transmission: 'Manual',
    type: 'truck',
    images: ['images/navara/navarap1.jpg', 'images/navara/navarap2.jpg'],
    price: 'N$ 390,000',
    description: 'A dependable workhorse, the Nissan Navara is built for durability and power, making it ideal for tough jobs and off-road excursions.'
  },
  {
    id: 9,
    make: 'Kia',
    model: 'Sportage',
    year: 2019,
    fuel: 'Petrol',
    transmission: 'Automatic',
    type: 'SUV',
    images: ['images/kia/kiap1.jpg', 'images/kia/kiap2.jpg'],
    price: 'N$ 340,000',
    description: 'Dynamic and practical, the Kia Sportage offers a smooth ride, a spacious interior, and a host of features for modern families.'
  },
  {
    id: 10,
    make: 'Honda',
    model: 'Civic',
    year: 2016,
    fuel: 'Petrol',
    transmission: 'Manual',
    type: 'sedan',
    images: ['images/civic/civicp1.jpg', 'images/civic/civicp2.jpg'],
    price: 'N$ 250,000',
    description: 'A popular choice for its reliability, fuel efficiency, and sporty handling. The Honda Civic is a great everyday car.'
  }
];

const services = [
  { icon: 'fas fa-car-crash', title: 'Vehicle Inspection', description: 'Our certified technicians perform a thorough 150-point inspection to ensure top quality and safety for every vehicle.' },
  { icon: 'fas fa-shield-alt', title: 'Warranty & Support', description: 'We offer comprehensive warranty packages and dedicated after-sales support for your peace of mind.' },
  { icon: 'fas fa-money-check-alt', title: 'Flexible Financing', description: 'Get pre-approved for a loan with competitive rates. Our team helps you find the best financing options tailored to your needs.' },
  { icon: 'fas fa-tools', title: 'Maintenance & Repairs', description: 'From routine servicing to major repairs, our state-of-the-art service center is equipped to handle all your vehicle needs.' }
];

const testimonials = [
  { content: "I was hesitant about buying a used car, but the transparency and quality of service at AutoDeals Namibia completely changed my mind. The Hilux I bought is perfect!", author: "Johannes K.", rating: 5 },
  { content: "Finding a reliable sedan was my priority, and AutoDeals Namibia delivered! My Jetta runs like new, and the financing process was surprisingly smooth. Highly recommend!", author: "Maria S.", rating: 4 },
  { content: "The variety of vehicles was impressive, and the staff were incredibly helpful without being pushy. I drove away with my dream BMW X5. A truly professional experience.", author: "David L.", rating: 5 },
  { content: "Great service and fair prices. I found a fantastic Ford Ranger here. The team was knowledgeable and answered all my questions patiently. Will definitely return!", author: "Penda M.", rating: 4 }
];

async function seed() {
  if (!MONGO_URI) {
    console.error('MONGO_URI not set in .env');
    process.exit(1);
  }

  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  await Car.deleteMany({});
  await Service.deleteMany({});
  await Testimonial.deleteMany({});

  await Car.insertMany(cars.map(c => {
    const { id, ...rest } = c;
    return rest; // remove the id property since MongoDB will use _id
  }));
  await Service.insertMany(services);
  await Testimonial.insertMany(testimonials);

  console.log('DB seeded');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
