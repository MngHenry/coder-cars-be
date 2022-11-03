const mongoose = require("mongoose");
const Car = require("../models/Car");
const carController = {};

//get all cars
carController.getAllCars = async (req, res, next) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    //mongoose query
    const cars = await Car.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const sum = await Car.count();
    const total = await Car.countDocuments({ isDeleted: true });
    return res.status(200).json({
      message: "Get Car List Successfully!",
      cars,
      page,
      total: Math.ceil((sum - total) / limit),
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
//create new car
carController.createCar = async (req, res, next) => {
  try {
    const { make, model, release_date, transmission_type, size, style, price } =
      req.body;
    if (
      !make ||
      !model ||
      !release_date ||
      !transmission_type ||
      !size ||
      !style ||
      !price
    ) {
      throw new Error("Missing required info!");
    }
    const car = await Car.create({
      make,
      model,
      release_date,
      transmission_type,
      size,
      style,
      price,
    });

    return res.status(200).send({ message: "Create Car Successfully!", car });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

//update car info
carController.editCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) throw new Error("Invalid ID");

    const car = await Car.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!car) throw new Error("Car not found!");
    return res.status(200).send({ message: "Update Car Successfully!", car });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
//delete car
carController.deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) throw new Error("Invalid ID");
    const car = await Car.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, runValidators: true }
    );
    if (!car) throw new Error("Car not found!");
    return res.status(200).send({ message: "Delete Car Successfully!", car });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = carController;
