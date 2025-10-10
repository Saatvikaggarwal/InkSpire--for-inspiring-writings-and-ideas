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
    // 1. PRIMARY STABLE DOMAINS
    'https://ink-spire-for-inspiring-writings-an-steel.vercel.app',
    'https://inkspire-for-inspiring-writings-and-ideas.vercel.app',
    'https://ink-spire-for-inspiring-wr-git-b6b283-saatvikaggarwals-projects.vercel.app',
    // // 2. VERCEL PREVIEW/HYPHENATED DOMAINS (Safeguard against mismatches)
    // // You need to manually add the temporary domain Vercel may be using (e.g., the one that caused the previous error):
    // 'https://inkspire-for-inspiring-writings-and-ideas-of7i.vercel.app',
    // 'https://inkspire-for-inspiring-writings-and-ideas-git-master.vercel.app',

    // 3. LOCAL DEVELOPMENT (Safe for testing)
    // 'http://localhost:3000',
    'http://localhost:5173'
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

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`http://localhost:`+PORT);
});
