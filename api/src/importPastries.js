const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

console.log('MONGO_URI:', process.env.MONGO_URI);

const Pastry = require('./models/Pastry');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    importPastries();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const importPastries = async () => {
  try {
    const pastriesPath = path.join(__dirname, '../pastries/pastries.json');
    const pastries = JSON.parse(fs.readFileSync(pastriesPath, 'utf-8'));
    await Pastry.deleteMany();
    await Pastry.insertMany(pastries);
    console.log('Pastries imported');
    process.exit();
  } catch (error) {
    console.error('Error importing pastries:', error);
    process.exit(1);
  }
};
