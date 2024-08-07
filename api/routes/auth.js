const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const dotenv=require('dotenv').config();
// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const username=req.body.username;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json("Invalid username or password");
    }

    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);
      // console.log(decryptedPassword)
    if (decryptedPassword !== req.body.password) {
      return res.status(401).json("Invalid username or password");
    }

    // for authorizing using web tokens by id
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    
    // to display everything but password
    const { password, ...userData } = user._doc;
    res.status(200).json({ ...userData, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
