const jwt=require("jsonwebtoken");
//cookie parser to read a cookie >>npm i cookie-parser

module.exports=function(req,res,next){
    const token=req.cookies.token;
    

    if (!token) return res.status(404).json({
        message: "Authentication Failed"
    })
    console.log(res.statusCode);

    try{
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token Data", tokenData);

        req.userId = tokenData.userId;

        next();  //if user is found so store its ID in the req object
        // and then we can actually fetch it anywhere by req.userId
    
    }catch(err){
        res.status(500).json({
            msg: "error occured"
        })
    }
}
