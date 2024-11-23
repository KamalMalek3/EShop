const express = require('express');
const router = express.Router();
const con = require('../Database/connection');
const path = require('path');

// Middleware to handle user sessions
let SignedinUsername = null;
let isSignedin = false;


router.post('/signin', (req, resp) => {
  var username = req.body.loginname.toLowerCase();
  var password = req.body.loginpassword;

  con.query('SELECT * FROM customers WHERE username = ? AND password = ?', [username, password], (err, result) => {
    if (err) {
      resp.render("alert", { message: "An error has occurred while fetching database" });
    } else if (result.length === 1) {
      isSignedin = true;
      SignedinUsername = username;
      resp.redirect('/account');
    } else {
      resp.render("alert", { message: "Wrong Username and/or password" });
    }
  });
});

router.post('/register', (req, resp) => {
  var username = req.body.registername.toLowerCase();
  var email = req.body.registeremail;
  var password = req.body.registerpassword;

  con.query('INSERT INTO customers (Username, email, Password) VALUES (?, ?, ?)', [username, email, password], (err) => {
    if (err) {
      resp.render("alert", { message: "Could not Register, username maybe taken or other error has occurred" });
    } else {
      resp.redirect('/account');
    }
  });
});

router.get('/account', (req, resp) => {
  var Curruser = SignedinUsername;
  if (isSignedin) {
    resp.render('signout', { Curruser: Curruser });
  } else {
    resp.sendFile(path.join(__dirname, "../shopweb/account.html"));
  }
});

router.get('/signout', (req, resp) => {
  isSignedin = false;
  SignedinUsername = null;
  resp.redirect('/account');
});

module.exports = { router, SignedinUsername, isSignedin };