const express = require("express");
const router = express.Router();

const {postSignup}=require("../controllers/authController");
const {postLogin}=require("../controllers/authController");
const {fetchLogin}=require("../controllers/authController");
const {logout} = require("../controllers/authController");


router.post("/signup",postSignup);
router.post("/login", postLogin);
router.get("/me",fetchLogin);
router.post("/logout",logout);

module.exports=router;