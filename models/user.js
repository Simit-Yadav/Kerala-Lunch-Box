const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// user schema
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

// encrypting password before saving to database.
userSchema.pre("save", function (next) {
  var user = this;

  // generate a unique salt.
  bcrypt
    .genSalt(10)
    .then((salt) => {
      bcrypt
        .hash(user.password, salt)
        .then((encryptedPass) => {
          user.password = encryptedPass;
          next();
        })
        .catch((err) => {
          console.log(`Error occured while hashing. ${err}`);
        });
    })
    .catch((err) => {
      console.log(`Error occured while salting. ${err}`);
    });
});

// creating a usermodel.
const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
