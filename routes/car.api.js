const express = require("express");
const router = express.Router();
const { getAllCars, createCar, editCar, deleteCar } = require("../controllers/car.controllers.js");

/**
 * @route GET api/cars
 * @description get list of cars
 * @access public  */
router.get("/", getAllCars);

/** @route POST api/cars
 * @description create a car info
 * @access public */
router.post("/", createCar);

/** @route put api/cars/:id
 * @description edit a car info
 * @access public */
router.put("/:id", editCar);

/** @route delete api/:id
 * @description delete a car info
 * @access public */
router.delete("/:id", deleteCar);

module.exports = router;
