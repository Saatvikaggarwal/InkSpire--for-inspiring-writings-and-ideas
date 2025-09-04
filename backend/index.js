require("dotenv").config();
const express = require('express');
const app = express();
const PORT = 4444;
const cors=require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");


const { PrismaClient } = require("../backend/generated/prisma");
const prisma = new PrismaClient();


app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cookieParser());

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}))


// /api/auth
app.use("/api/auth",require("./routes/auth"));

// /api/post
app.use("/api/post",require("./routes/post"));

app.get("/api/auth/me", async (req,res)=>{
      const token=req.cookies.token;
      if (!token) return res.status(404).json({
          message: "Not Logged in user",
          user:null
      })
      console.log(res.statusCode);
  
      try{
          const tokenData = jwt.verify(token, process.env.JWT_SECRET);
          console.log("Token Data", tokenData);
  
          const user=await prisma.user.findUnique({
              where:{id:tokenData.userId},
              select:{id:true,username:true},
          })

          console.log(user);
          return res.status(200).json({
            message: "Logged in user",
            user: user
          })
    
      }catch(err){
          res.status(500).json({
              msg: "error occured"
          })
      }
})

app.listen(PORT, () => {
  console.log(`http://localhost:`+PORT);
});