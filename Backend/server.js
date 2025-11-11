require('dotenv').config();
const cors = require('cors');
const express = require('express');
const port = process.env.PORT || 6500;
const connectDB = require('./config/db');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const app = express();

  // db connection 
  connectDB()
    
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use('/public', express.static('public'));
  app.use('/api', routes);

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);  
  });