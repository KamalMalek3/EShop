const express = require('express');
const router = express.Router();
const con = require('../Database/connection');
const path = require('path');

// Encapsulating state in an object
const sessionState = {
  _signedinUsername: null,
  _isSignedin: false,

  // Getter for SignedinUsername
  getSignedinUsername() {
    return this._signedinUsername;
  },

  // Setter for SignedinUsername
  setSignedinUsername(username) {
    this._signedinUsername = username;
  },

  // Getter for isSignedin
  getIsSignedin() {
    return this._isSignedin;
  },

  // Setter for isSignedin
  setIsSignedin(status) {
    this._isSignedin = status;
  }
};

router.post('/signin', (req, resp) => {
  const username = req.body.loginname.toLowerCase();
  const password = req.body.loginpassword;

  con.query('SELECT * FROM customers WHERE username = ? AND password = ?', [username, password], (err, result) => {
    if (err) {
      resp.render("alert", { message: "An error has occurred while fetching database" });
    } else if (result.length === 1) {
      sessionState.setIsSignedin(true);
      sessionState.setSignedinUsername(username);
      resp.redirect('/account');
    } else {
      resp.render("alert", { message: "Wrong Username and/or password" });
    }
  });
});

router.post('/register', (req, resp) => {
  const username = req.body.registername.toLowerCase();
  const email = req.body.registeremail;
  const password = req.body.registerpassword;

  con.query('INSERT INTO customers (Username, email, Password) VALUES (?, ?, ?)', [username, email, password], (err) => {
    if (err) {
      resp.render("alert", { message: "Could not Register, username maybe taken or other error has occurred" });
    } else {
      resp.redirect('/account');
    }
  });
});

router.get('/account', (req, resp) => {
  if (sessionState.getIsSignedin()) {
    resp.render('signout', { Curruser: sessionState.getSignedinUsername() });
  } else {
    resp.sendFile(path.join(__dirname, "../shopweb/account.html"));
  }
});

router.get('/signout', (req, resp) => {
  sessionState.setIsSignedin(false);
  sessionState.setSignedinUsername(null);
  resp.redirect('/account');
});

router.get("/forgot",(req,resp)=>{
  resp.sendFile(`${Webpath}/NewPassword.html`);
}
)

router.post("/Changepass",(req,resp)=>{
  var user=req.body.username;
  var pass=req.body.newPassword;
  if(user==="admin")
  {
    resp.render("alert",{message:"Cannot change admin password"});
    return;
  }
  con.query(
    "UPDATE customers SET Password = ? WHERE Username=?",
    [pass,user],
    (err, result) => {
        if (err || result.affectedRows==0) {
          resp.render("alert",{message:"Could not Change Password"});
        } else{
            console.log(""+result.affectedRows+" Row Affected");
            resp.redirect('/account')
        }
    }
);
}
)

// Exporting the router and session state
module.exports = { router, sessionState };
