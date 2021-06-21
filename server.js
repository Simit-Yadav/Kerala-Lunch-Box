const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
const exphbs = require("express-handlebars");
dotenv.config({ path: "./config/keys.env" });

// SETTING UP PORT
var HTTP_PORT = process.env.PORT || 8080;

// SETTING STATIC FOLDER
app.use(express.static("./static"));

// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

// setting up template engine
app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", ".hbs");

// controller for home routes
const generalController = require("./controllers/general");
app.use("/", generalController);

const loginSignUp = require("./controllers/loginSignup");
app.use("/loginSignUp", loginSignUp);

// connection of mongodb.

// on server start function.
function onHttpStart() {
  console.log("Express server running on port " + HTTP_PORT);
}

//route to wrong paths
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(404).send("Page Not Found");
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MongoDb_String, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    // making app to listen on  port and startup function.
    app.listen(HTTP_PORT, onHttpStart);
  } catch (err) {
    console.log(`There was a problem connecting to MongoDB ... ${err}`);
  }
};

start();
