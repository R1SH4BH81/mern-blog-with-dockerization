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
      minlength: [6, "minimum 6 characters required"],
      required: [true, "password is required"],
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

module.exports = mongoose.model("User", userSchema);
