require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Chef = require('./models/Chef');
const MenuItem = require('./models/MenuItem');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sajhachulo';

const seed = async () => {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  // Clear existing data
  await User.deleteMany({});
  await Chef.deleteMany({});
  await MenuItem.deleteMany({});

  // Admin
  const admin = await User.create({
    name: 'Admin',
    email: 'admin@sajhachulo.com',
    password: 'Admin@123',
    role: 'admin',
  });
  console.log('Admin created:', admin.email);

  // Chef 1
  const chefUser1 = await User.create({
    name: 'Sita Sharma',
    email: 'sita@sajhachulo.com',
    password: 'Chef@123',
    role: 'chef',
  });
  const chef1 = await Chef.create({
    user: chefUser1._id,
    kitchenName: "Sita's Kitchen",
    bio: 'Authentic Nepali and Indian home-cooked meals prepared with love.',
    cuisines: ['Nepali', 'Indian'],
    serviceRadiusKm: 10,
    location: { lat: 27.7172, lng: 85.3240, address: 'Thamel, Kathmandu' },
    verificationStatus: 'approved',
    isVerified: true,
    avgRating: 4.8,
    totalOrders: 120,
  });
  await MenuItem.create([
    {
      chef: chef1._id,
      name: 'Dal Bhat Set',
      description: 'Traditional Nepali dal bhat with seasonal vegetables and pickle.',
      price: 150,
      category: 'Main Course',
      dietaryTags: { isVeg: true, spiceLevel: 'mild', lowOil: true },
      isAvailable: true,
    },
    {
      chef: chef1._id,
      name: 'Chicken Curry with Rice',
      description: 'Tender chicken in aromatic curry served with steamed rice.',
      price: 220,
      category: 'Main Course',
      dietaryTags: { isNonVeg: true, spiceLevel: 'medium' },
      isAvailable: true,
    },
    {
      chef: chef1._id,
      name: 'Momo (Steam)',
      description: 'Handmade steamed momos with tomato achar.',
      price: 120,
      category: 'Snacks',
      dietaryTags: { isNonVeg: true, spiceLevel: 'mild' },
      isAvailable: true,
    },
  ]);
  console.log("Chef 1 (Sita's Kitchen) created with 3 menu items");

  // Chef 2
  const chefUser2 = await User.create({
    name: 'Ram Thapa',
    email: 'ram@sajhachulo.com',
    password: 'Chef@123',
    role: 'chef',
  });
  const chef2 = await Chef.create({
    user: chefUser2._id,
    kitchenName: "Ram's Health Kitchen",
    bio: 'Healthy and diabetic-friendly meals for the elderly and health-conscious.',
    cuisines: ['Nepali', 'Continental'],
    serviceRadiusKm: 8,
    location: { lat: 27.7000, lng: 85.3142, address: 'Patan, Lalitpur' },
    verificationStatus: 'approved',
    isVerified: true,
    avgRating: 4.6,
    totalOrders: 85,
  });
  await MenuItem.create([
    {
      chef: chef2._id,
      name: 'Diabetic Friendly Thali',
      description: 'Low-sugar, low-oil balanced meal for diabetic patients.',
      price: 180,
      category: 'Health Meal',
      dietaryTags: { isVeg: true, diabeticFriendly: true, lowOil: true, spiceLevel: 'mild' },
      isAvailable: true,
    },
    {
      chef: chef2._id,
      name: 'Soft Khichdi',
      description: 'Soft and easy-to-digest khichdi for elderly and patients.',
      price: 130,
      category: 'Health Meal',
      dietaryTags: { isVeg: true, softFood: true, diabeticFriendly: true, spiceLevel: 'mild' },
      isAvailable: true,
    },
    {
      chef: chef2._id,
      name: 'Oats Porridge',
      description: 'Healthy oats porridge with fruits and nuts.',
      price: 100,
      category: 'Breakfast',
      dietaryTags: { isVeg: true, diabeticFriendly: true, lowOil: true, spiceLevel: 'mild' },
      isAvailable: true,
    },
  ]);
  console.log("Chef 2 (Ram's Health Kitchen) created with 3 menu items");

  console.log('\n=== Seed completed successfully ===');
  console.log('Admin: admin@sajhachulo.com / Admin@123');
  console.log('Chef 1: sita@sajhachulo.com / Chef@123');
  console.log('Chef 2: ram@sajhachulo.com / Chef@123');
  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
