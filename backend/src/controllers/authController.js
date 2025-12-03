const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");
const User = require("../models/User");
const db = require("../config/database");

const register = async (req, res) => {
  try {
    const { email, password, full_name } = req.body;

    const existing = await User.findByEmail(email);
    if (existing) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password_hash,
      full_name,
    });

    return res.status(201).json({ msg: "Registered successfully", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = generateToken(user.id); // FIXED

    await db.query(
      `UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1`,
      [user.id]
    );

    return res.json({ token, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
};


const verifyToken = async (req, res) => {
  return res.json({ msg: "Valid token", user: req.user });
};

module.exports = { register, login, verifyToken };
