const express = require("express");
const router = express.Router();
const {
  register,
  login,
  googleAuth,
  googleCallback,
  googleLoginCallback,
  logout
} = require("../controllers/authConttroller");

// Register
router.post("/auth/register", register);

// Login
router.post("/auth/login", login);
router.post("/auth/logout", logout);
// Google Login
// router.get("/auth/google", googleAuth);
// router.get("/auth/google/callback", googleCallback, googleLoginCallback);

module.exports = router;
