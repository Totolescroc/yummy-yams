const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


const imagesPath = path.join(__dirname, '../pastries/images');
console.log('Serving static files from', imagesPath);
app.use('/pastries/images', express.static(imagesPath));

app.use('/users', userRoutes);
app.use('/game', gameRoutes);

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('MongoDB connection error:', error.message);
});
