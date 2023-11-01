const express = require("express");

const app = express();

app.use(express.static("public"));
app.set("views", `${__dirname}/views`);
app.set("view engine", "hbs");

require("./db/database-connection");
const Coaster = require("./models/coaster.model");

app.get("/", (req, res) => {
  res.render("home-page");
});

app.get("/coasters-gallery", (req, res) => {
  Coaster.find()
    .sort({ title: 1 })
    .then((listOfCoasters) => res.render("coasters-page", { listOfCoasters }))
    .catch((err) => console.log("Error jefe", err));
});

app.get("/longest", (req, res) => {
  Coaster.find({ length: { $gt: 100 } })
    .sort({ length: 1 })
    .then((listOfCoasters) => res.render("coasters-page", { listOfCoasters }))
    .catch((err) => console.log("Error jefe", err));
});

app.get("/craziest", (req, res) => {
  Coaster.find({inversions:{$gt:3}})
    .sort({ inversions: 1 })
    .then((listOfCoasters) => res.render("coasters-page", { listOfCoasters }))
    .catch((err) => console.log("Error jefe", err));
});

app.listen(3000, () => console.log("Conectado"));
