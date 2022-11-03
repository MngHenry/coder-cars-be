const mongoose = require('mongoose');
//create a schema
const carSchema = new mongoose.Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, min: 1900, required: true },
    transmission_type: {
      type: String,
      enum: [
        "MANUAL",
        "AUTOMATIC",
        "AUTOMATED_MANUAL",
        "DIRECT_DRIVE",
        "UNKNOWN",
      ],
      required: true,
    },
    size: {
      type: String,
      enum: ["Compact", "Midsize", "Large"],
      required: true,
    },
    style: { type: String, required: true },
    price: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model('Car', carSchema);

module.exports = Car;