require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4444;
const cors=require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");


const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();


app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cookieParser());

app.use(cors({
  origin: [
    'https://ink-spire-for-inspiring-writings-an-steel.vercel.app',
    'https://inkspire-for-inspiring-writings-and-ideas.vercel.app',
    // Include any other deployment preview URLs Vercel may create
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// /api/auth
app.use("/api/auth",require("./routes/auth"));

// /api/post
app.use("/api/post",require("./routes/post"));

// /api/gemini

app.use("/api/gemini",require("./routes/gemini"));

//  /api/like

app.use("/api/like",require("./routes/like"));


//logout

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("token"); // 'token' = your JWT cookie name
  res.json({ message: "Logged out" });
});

app.listen(PORT, () => {
  console.log(`http://localhost:`+PORT);
});
