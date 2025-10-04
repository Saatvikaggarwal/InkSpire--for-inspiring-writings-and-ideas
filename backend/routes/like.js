const express = require("express");
const router = express.Router();
const {toggleLike,getLikes,isLikedByUser}=require("../controllers/likeController");
const auth=require("../middlewares/auth");

router.post("/toggle/:postId",auth,toggleLike);
router.get("/:postId",getLikes);
router.get("/hasLiked/:postId",auth,isLikedByUser);


module.exports = router;