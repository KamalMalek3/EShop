const express = require('express');
const router = express.Router();
const con = require('../Database/connection');
const { sessionState } = require('./account');

router.get('/checkout', (req, resp) => {
  if (sessionState.getIsSignedin()) {
    con.query('INSERT INTO checkout (Username, Code, qty, Date, time) SELECT Username, Code, qty, date(now()),time(now()) FROM cart WHERE Username = ?;', [sessionState.getSignedinUsername()], (err) => {
      if (err) {
        resp.render("alert", { message: "Could not checkout (update)" });
      }
    });

    con.query('UPDATE items AS i JOIN cart AS c SET i.Qty = i.Qty - c.qty WHERE i.code = c.code AND c.Username = ?;', [sessionState.getSignedinUsername()], (err) => {
      if (err) {
        resp.render("alert", { message: "Could not checkout (update)" });
      }
    });

    con.query('DELETE FROM cart WHERE Username = ?;', [sessionState.getSignedinUsername()], (err) => {
      if (err) {
        resp.render("alert", { message: "Could not Checkout" });
      } else {
        resp.render('alert2', { message: "Checkout Successful. Thank you for choosing us!" });
      }
    });
  } else {
    resp.redirect('/account');
  }
});

module.exports = router;