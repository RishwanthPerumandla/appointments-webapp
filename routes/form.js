const express = require("express");
const router = express.Router();

const FormData = require("../models/FormData");

//GET Request
router.get("/", (req, res) => {
  res.render("form");
});
//POST Request
router.post("/", (req, res) => {
  const {
    person,
    role,
    date,
    name,
    userid,
    reason,
    email,
    phoneno,
  } = req.body;
  const formData = new FormData({
    person,
    role,
    date,
    name,
    userid,
    reason,
    email,
    phoneno,
  });

  formData.save().then(() => res.redirect("/redirect"));
});

module.exports = router;
