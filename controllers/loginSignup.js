const express = require("express");
const userModel = require("../models/user");
const router = express.Router();
const bcrypt = require("bcryptjs");

// get signup route
router.get("/signUp", (req, res) => {
  // rendering signUp page.
  res.render("loginSignUp/signUp");
});

// get login route
router.get("/login", (req, res) => {
  // rendering login page.
  res.render("loginSignUp/login");
});

// post login route
router.post("/login", (req, res) => {
  console.log(req.body);

  let results = {};
  let valid = true;

  const { email, password } = req.body;

  // server side validation of email.
  if (email.length === 0) {
    valid = false;
    results.email = "Enter a email!";
  }

  // server side validation of password
  if (password.length === 0) {
    valid = false;
    results.password = "Enter a password!";
  }

  // checking email and password into database.
  // if validation failed
  if (!valid) {
    res.render("loginSignup/login", {
      values: req.body,
      results: results,
    });
  } else {
    // validation successful
    console.log("Successfully Logged In.");

    // checking email and password in database.
    userModel
      .findOne({
        email: email,
      })
      .then((user) => {
        if (user) {
          bcrypt
            .compare(password, user.password)
            .then((isTrue) => {
              if (!isTrue) {
                results.password =
                  "Sorry, you entered wrong password or email.";
                res.render("loginSignUp/login", {
                  result: results,
                  values: req.body,
                });
              } else {
                res.send(user);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          results.password = "Sorry, you entered wrong password or email.";
          res.render("loginSignUp/login", {
            result: results,
            values: req.body,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// post route on signup
router.post("/signUp", (req, res) => {
  console.log(req.body);

  let results = {};
  let valid = true;

  const {
    firstName,
    lastName,
    email,
    password,
    address,
    postalCode,
    city,
    phoneNumber,
  } = req.body;

  // server side validation of first name.
  if (typeof firstName !== "string" || firstName.length === 0) {
    valid = false;
    results.firstName = "Enter a First Name!";
  } else if (firstName.length < 2) {
    valid = false;
    results.firstName = "Enter a valid First Name!";
  }

  // server side validation of last name.
  if (typeof lastName !== "string" || lastName.length === 0) {
    valid = false;
    results.lastName = "Enter a Last Name!";
  } else if (lastName.length < 2) {
    valid = false;
    results.lastName = "Enter a valid Last Name!";
  }

  // server side validation of email.
  let emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (email.length < 2) {
    valid = false;
    results.email = "Enter a valid email!";
  } else if (emailReg.test(email) == false) {
    valid = false;
    results.email = "Entear a valid email!";
  }

  // // server side validation of password
  let passwordReg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
  if (passwordReg.test(password) == false) {
    valid = false;
    results.password = "Enter a password properly.";
  }

  // // server side validation of phonenumber
  if (phoneNumber.length < 10 || phoneNumber.length > 10) {
    valid = false;
    results.phoneNumber = "Enter a valid Phone Number.";
  }

  // // server side validation of address
  if (address.length < 5) {
    valid = false;
    results.street = "Enter a Valid Street Address.";
  }

  // // server side validation of postalcode.
  if (postalCode.length > 6 || postalCode.length < 6) {
    valid = false;
    results.postalCode = "Enter a valid postal code.";
  }

  // // server side validation of city.
  if (typeof city !== "string" || city.length === 0) {
    valid = false;
    results.city = "Enter a valid city.";
  } else if (city.length < 2) {
    valid = false;
    results.city = "Enter a valid city.";
  }

  // if validation failed
  if (!valid) {
    res.render("loginSignUp/signUp", {
      result: results,
      values: req.body,
    });
  } else {
    // validation successful than
    const user = new userModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      street: address,
      postalCode: postalCode,
      phoneNumber: phoneNumber,
      city: city,
    });

    // saving to database.
    user
      .save()
      .then((userSaved) => {
        console.log(`User ${userSaved} save to the Database.`);
        res.send("Welcome to Kerala Lunch Box.");
      })
      .catch((err) => {
        console.log(`Error updating the user.  ${err}`);
        results.email = "Email already exist!";
        res.render("loginSignup/signup", {
          result: results,
          values: req.body,
        });
      });
  }
});

module.exports = router;
