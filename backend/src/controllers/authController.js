import User from "../models/User.js";
import jwt from "jsonwebtoken";

// JWT token generator
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || "secret123", {
    expiresIn: "1d", // 1 day
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate role
    const allowedRoles = ["user", "admin"];
    const userRole = allowedRoles.includes(role) ? role : "user";

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user (password will auto-hash in model)
    const user = await User.create({
      username,
      email,
      password,
      role: userRole,
    });

    // Respond with user data + token
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Verify password
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Respond with user data + token
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};
