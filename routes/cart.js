const express = require('express');
const router = express.Router();
const con = require('../Database/connection');
const user = require('./account');



router.get('/cart', (req, resp) => {
  if (user.SignedinUsername === "admin") {
    resp.redirect('/additems');
  } else if (user.isSignedin) {
    con.query('SELECT i.Code, i.Description, i.price, c.Qty, c.id FROM items AS i JOIN cart AS c WHERE c.Username = ? AND Status = "cart" AND i.code = c.code;', [SignedinUsername], (err, result) => {
      if (err) {
        resp.render("alert", { message: "Could not fetch database for any item in cart" });
      } else {
        resp.render('cart', { item: result });
      }
    });
  } else {
    resp.redirect('/account');
  }
});

module.exports = router;