const express = require('express');
const router = express.Router();
const con = require('../Database/connection');

router.get('/products', (req, resp) => {
  con.query('SELECT * FROM items', (err, result) => {
    if (err) {
      resp.render("alert", { message: "Could not fetch database for any item" });
    } else {
      resp.render('products', { items: result });
    }
  });
});

router.get('/productdetails', (req, resp) => {
  var itemcode = req.query.code;
  if (!itemcode) {
    resp.redirect('*');
  } else {
    con.query('SELECT * FROM items WHERE Code = ?;', [itemcode], (err, result) => {
      if (err) {
        resp.render("alert", { message: "Product not found" });
      } else {
        const Results = result;
        con.query('SELECT * FROM items WHERE Code <> ? ORDER BY RAND() LIMIT 5;', [itemcode], (err, otherResults) => {
          if (err) {
            resp.render("alert", { message: "Product not found" });
          } else {
            resp.render('productdetails', { item: Results, other: otherResults });
          }
        });
      }
    });
  }
});

module.exports = router;