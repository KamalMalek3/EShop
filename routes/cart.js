const express = require('express');
const router = express.Router();
const con = require('../Database/connection');
const { sessionState } = require('./account');



router.get('/cart', (req, resp) => {
  if (sessionState.getSignedinUsername() === "admin") {
    resp.redirect('/additems');
  } else if (sessionState.getIsSignedin()) {
    con.query('SELECT i.Code, i.Description, i.price, c.Qty, c.id FROM items AS i JOIN cart AS c WHERE c.Username = ? AND Status = "cart" AND i.code = c.code;', [sessionState.getSignedinUsername()], (err, result) => {
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

router.get("/addtocart", (req, resp) => {
  if (sessionState.getSignedinUsername() === "admin") {
    resp.render("alert", { message: "Could not add to cart because you are an admin " });
  }
  else {
    if (sessionState.getIsSignedin()) {
      var code = req.query.Code;
      var Qty = req.query.Qty;
      con.query(
        "INSERT INTO cart (Username, Code, Status, qty) VALUES (?, ?, 'cart', ?);",
        [sessionState.getSignedinUsername(), code, Qty],
        (err, result) => {
          if (err) {
            resp.render("alert", { message: "Could not add to cart" });
          } else {
            console.log("" + result.affectedRows + " Row Affected");
            resp.render("alert2", { message: "item Succesfully added to cart" });
            //resp.redirect('/products')
          }
        }
      );
    } else {
      resp.redirect('/account');
    }
  }
}
)

router.get("/remove", (req, resp) => {
  if (sessionState.getIsSignedin()) {
    var id = req.query.Cartid;
    con.query(
      "Delete from cart Where ID=?",
      [id],
      (err, result) => {
        if (err) {
          resp.render("alert", { message: "Could not delete" });
        } else {
          console.log("" + result.affectedRows + " Row Affected");
          resp.redirect('/cart')
        }
      }
    );
  } else {
    resp.redirect('/account');
  }
}
)


module.exports = router;