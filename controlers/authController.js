import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); //findiing email
    if (!user) {
      res.status(404).json({ success: false, error: "User Not Found " });
    }

    const isMatch = await bcrypt.compare(password, user.password); // first is the pasword we pass and 2nd wala from user password
    if (!isMatch) {
      res.status(404).json({ success: false, error: "wrong Password" });
    }
    // if the password is match then generate JWT Token
    const token = jwt.sign(
      { _id: user._id, role: user.role }, //ye payload hai
      process.env.JWT_KEY, // here JWT_KEY is the key value we storein the .env file
      { expiresIn: "10d" } // and expire in 10 days, this token not work after 10days we have to login once again
    );

    // in response to frontend we send this property, jayo Login.jsx me wha par response variable me console karlena a jayega
    res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};
export { login, verify };
