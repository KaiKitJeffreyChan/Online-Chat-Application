const express = require("express");

//creates router and calls it immediately
const router = express.Router();

//get requests from "/", following function is run that has acess to request and response objects
//with response object function .send, we send message to client
router.get("/", (req, res) => {
  res.send("muwah hahah its working!!");
});

module.exports = router;
