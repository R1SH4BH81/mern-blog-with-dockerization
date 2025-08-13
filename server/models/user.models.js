const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
    },

    password: {
      type: String,
      minlenght: [6, "min 6 characters"],
      required: [true, "password is required  "],
    },

    email: {
      type: String,
      trim: true,
      required: [true, "email is required"],
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("user", userSchema);
