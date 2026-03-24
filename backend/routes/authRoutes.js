const express = require("express");
const { register, login } = require('../services/authService')
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

const authMiddleWAre = require("../middleware/authMiddleware");

router.get("/dashboard", authMiddleWAre, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    userId: req.user.id,
  });

});

module.exports = router;
