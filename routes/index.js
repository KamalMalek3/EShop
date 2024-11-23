const express = require('express');
const path = require('path');
const router = express.Router();

router.get("/", (req, resp) => {
  resp.sendFile(path.join(__dirname, "../shopweb/index.html"));
});

router.get("/home", (req, resp) => {
  resp.sendFile(path.join(__dirname, "../shopweb/index.html"));
});

module.exports = router;