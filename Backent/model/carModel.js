import mongoose from "mongoose";

const carModelSchema = new mongoose.Schema(
  {
    dealer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dealer",
      required: true,
    },
    rentalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bookingcollections",
      require: true,
    },

    carName: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },
    carType: {
      type: String,
      enum: [
        "sedan",
        "suv",
        "truck",
        "coupe",
        "convertible",
        "wagon",
        "van",
        "hatchback",
        "other",
      ],
      required: true,
    },
    fuelType: {
      type: String,
      enum: ["petrol", "diesel", "electric", "hybrid", "cng", "lpg", "other"],
      required: true,
    },
    transmission: {
      type: String,
      enum: ["manual", "automatic", "semi-automatic"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "image",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Car = mongoose.model("car", carModelSchema);
