const express = require("express");
const router = express.Router();
const {postSignup}=require("../controllers/authController");
const {postLogin}=require("../controllers/authController");

router.post("/signup",postSignup);
router.post("/login", postLogin);
// router.post("/logout", postSignup);

module.exports=router;