const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const FormData = require("../models/FormData");
// Welcome Page
// router.get('/', forwardAuthenticated, async (req, res) => {res.render('welcome')

// });

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

  res.redirect("/dashboard");
});

router.get("/delete/:id", ensureAuthenticated, async (req, res) => {
  await FormData.findByIdAndUpdate(req.params.id, { responses: false });

  res.redirect("/dashboard");
});

router.get("/redirect", (req, res) => {
  res.render("redirect");
});

module.exports = router;
