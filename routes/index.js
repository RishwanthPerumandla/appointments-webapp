const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const FormData = require("../models/FormData");
const nodemailer = require('nodemailer');

// Welcome Page
// router.get('/', forwardAuthenticated, async (req, res) => {res.render('welcome')

// });



var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'grietconnect@gmail.com',
    pass: 'griet@connect123'
  }
});


router.get("/", (req, res) => {
  res.render("home");
});

router.get("/dashboard", ensureAuthenticated, async (req, res) => {
  const userrole = String(req.user.role);
  const appointmentRequests = await FormData.find({
    person: userrole,
    responses: undefined,
  });
  
  const appointmentsList = await FormData.find({
    person: userrole,
    responses: true,
  });

  const declinedList = await FormData.find({
    person: userrole,
    responses: false,
  });

  res.render("dashboard", {
    user: req.user,
    datas: appointmentRequests,
    lists: appointmentsList,
    lists1:declinedList
  });
});

router.get("/edit/:id", ensureAuthenticated, async (req, res) => {
  await FormData.findByIdAndUpdate(req.params.id, { responses: true });
  const person = await FormData.findById(req.params.id);
  console.log(person.email);
  var mailOptions = {
    from: 'grietconnect@gmail.com',
    to: person.email,
    subject: 'Response For Your Appointment',
    text: `Your Appointment on ${person.date} with ${person.person} is Approved`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.redirect("/dashboard");
});

router.get("/delete/:id", ensureAuthenticated, async (req, res) => {
  await FormData.findByIdAndUpdate(req.params.id, { responses: false });
  const person = await FormData.findById(req.params.id);
  console.log(person.email);
  var mailOptions = {
    from: 'grietconnect@gmail.com',
    to: person.email,
    subject: 'Response For Your Appointment',
    text: `Your Appointment on ${person.date} with ${person.person} is Declined`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.redirect("/dashboard");
});

router.get("/redirect",(req, res) => {
  res.render("redirect");
});

module.exports = router;




