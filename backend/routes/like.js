const express = require("express");
const router = express.Router();
const {toggleLike,getLikes}=require("../controllers/likeController");
const auth=require("../middlewares/auth");

router.post("/toggle/:postId",auth,toggleLike);
router.get("/:postId", auth,getLikes);


module.exports = router;