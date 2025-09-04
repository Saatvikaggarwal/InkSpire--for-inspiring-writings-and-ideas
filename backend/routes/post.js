const router=require("express").Router();
const auth=require("../middlewares/auth");
const postCtrl=require("../controllers/postsController");
const upload=require("../utils/imageStorage");

router.get("/",postCtrl.getAllPosts);
router.get("/user", auth, postCtrl.getPostByUserId);
router.get("/:id",postCtrl.getPostById);

router.post("/",auth,upload.single('img'),postCtrl.createPost);
router.put("/:id", auth, postCtrl.updatePost);
router.delete("/:id",auth, postCtrl.deletePost);

module.exports=router;