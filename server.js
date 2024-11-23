const express = require('express');
const path = require('path');
const mysql = require('mysql');
const multer = require('multer');
const fs = require('fs');

// Initialize the app
const app = express();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'shopweb'); // Directory where images will be stored
  },
  filename: function (req, file, cb) {
      cb(null, req.body.code + path.extname(file.originalname)); // Set the file name as the code + extension
  }
});

const upload = multer({ storage: storage });
app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }));

// Serve static files
const Webpath = path.join(__dirname, "/shopweb");
app.use(express.static(path.join(Webpath)));


// Import routes
const indexRoutes = require('./routes/index');
const { router: accountRoutes } = require('./routes/account');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');
const productRoutes = require('./routes/products');
const dashboardRoutes = require('./routes/dashboard');

// Use routes
app.use(indexRoutes);
app.use(accountRoutes);
app.use(cartRoutes);
app.use(checkoutRoutes);
app.use(productRoutes);
app.use(dashboardRoutes);

// Handle 404
app.get("*", (req, resp) => {
  resp.sendFile(`${Webpath}/nopage.html`);
});

// Start the server
app.listen(4500, () => {
  console.log('Server running on port 4500');
});