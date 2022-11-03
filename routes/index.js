var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.status(200).send("Welcome to CoderSchool!, Coder Cars project")
});

//car routes
const carRouter = require("./car.api.js");
router.use("/cars", carRouter);

module.exports = router;
