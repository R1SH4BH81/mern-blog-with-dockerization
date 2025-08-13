import User from "../models/user.models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: "all feilds are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashPass, username });
    await newUser.save();
    res.status(200).json({ message: "user is created" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUser = await User.findOne({ email });
    if (!isUser) {
      return res.status(404).json({ message: "user doesnt exists " });
    }

    const isMatch = await bcrypt.compare(password, isUser.password);
    if (!isMatch) {
      return res.status(404).json({ message: "password galat h bhai :<" });
    }

    const token = jwt.sign({ id: isUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user: { id: isUser._id, name: isUser.name, email: isUser.email },
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { login, register };
