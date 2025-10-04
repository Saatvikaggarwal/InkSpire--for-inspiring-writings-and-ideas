const {PrismaClient}=require("../generated/prisma");
const prisma=new PrismaClient();

module.exports.toggleLike=async function(req,res){
    const userId=req.userId;
    const postId = Number(req.params.postId);

    try{
        const existing = await prisma.like.findUnique({
            where: { userId_postId: { userId, postId } },
        });

        if (existing) {  //unlike
            await prisma.like.delete({ where: { id: existing.id } });
            return res.json({ liked: false });
        } 
        else {      //like
            await prisma.like.create({ data: { userId, postId } });
            return res.json({ liked: true });
        }

    } catch (err) {
        console.error(err);
        res.status(402).json({ message: "Error toggling like" });
    }
}

module.exports.getLikes=async function (req,res) {
    const postId = Number(req.params.postId);
    try {
        const count = await prisma.like.count({
            where: { postId },
        });
        res.json({ likes: count });

    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching likes" });
    }
}