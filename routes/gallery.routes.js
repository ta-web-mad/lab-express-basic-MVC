const express = require('express');
const router = express.Router();
const Coasters = require("../models/Coasters.model")

/* GET home page */
router.get("/", (req, res, next) => {
    Coasters
        .find()
        .then(data =>{
            console.log(data)
            res.render("gallery", {coasters: data});
        })
        .catch(err =>{
            console.log(err)
        })
});

router.get("/longest", (req, res, next) => {
    Coasters
        .find({length: {$gt:100}})
        .then(data =>{
            console.log(data)
            res.render("gallery", {coasters: data});
        })
        .catch(err =>{
            console.log(err)
        })
});

router.get("/craziest", (req, res, next) => {
    Coasters
        .find({inversions: {$gt:3}})
        .then(data =>{
            console.log(data)
            res.render("gallery", {coasters: data});
        })
        .catch(err =>{
            console.log(err)
        })

});


module.exports = router;