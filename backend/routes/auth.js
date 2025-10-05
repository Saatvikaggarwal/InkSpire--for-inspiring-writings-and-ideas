const express = require("express");
const router = express.Router();
const jwt=require("jsonwebtoken");

const {PrismaClient}=require("../generated/prisma");
const prisma=new PrismaClient();

const {postSignup}=require("../controllers/authController");
const {postLogin}=require("../controllers/authController");

router.post("/signup",postSignup);
router.post("/login", postLogin);


//fetch authentication using jwt
router.get("/me", async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(404).json({
        message: "Not Logged in user",
        user: null
    })
    // console.log(res.statusCode);

    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Token Data", tokenData);

        const user = await prisma.user.findUnique({
            where: { id: tokenData.userId },
            select: { id: true, username: true },
        })

        // console.log(user);
        return res.status(200).json({
            message: "Logged in user",
            user: user
        })

    } catch (err) {
        res.status(500).json({
            msg: "error occured"
        })
    }
})


module.exports=router;