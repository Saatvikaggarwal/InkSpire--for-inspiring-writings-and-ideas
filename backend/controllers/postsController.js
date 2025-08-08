const {PrismaClient}=require("../generated/prisma");
const prisma=new PrismaClient();

module.exports.createPost=async function (req,res) {
    const { title, content } = req.body;
    console.log(title,content);
    try{
        // const { title, content } = req.body;
        // console.log()

        const post = await prisma.post.create({
            data: { title, content, authorId: req.userId }
        })

        res.status(200).json({
            message: "Post added Successfully",
            post
        })
    }catch(err){
        res.status(501).json({
            msg:"error creating a post",
            id:req.userId,
            error: err,
        });
    }
}


module.exports.getAllPosts=async (req,res)=>{

    // const records = await prisma.modelName.findMany({
    //     where: { ... },       // (optional) filtering
    //     select: { ... },      // (optional) pick specific fields by default all fields will be selected
    //     include: { ... },     // (optional) join related models
    //     orderBy: { ... },     // (optional) sorting
    //     take: 10,             // (optional) limit
    //     skip: 0,              // (optional) offset for pagination
    // });

    const posts=await prisma.post.findMany({
        include: { author: { select: { id: true, username: true } } },  // (optional) join related models
        orderBy: {createdAt:"desc"}
    })
    res.json(posts);

}

module.exports.getPostById=async(req,res) =>{
    const id = Number(req.params.id);  

    try{
       const post=await prisma.post.findUnique({where:{id}});
       if (!post) return res.status(404).json({message:"Not Found"});
       res.json(post);

    }catch(err){
        res.json(
            {
                msg:"id not found",
                error:err
            }
        )
    }
}

module.exports.updatePost=async(req,res)=>{
    const id=Number(req.params.id);  //req.params.id is a string convert it to nuumber
    const {title,content}=req.body;

    try{

        //we have done this using middlewares
        // const post = await prisma.post.findUnique({ where: { id } });
        // if (post.authorId!=req.userId) return res.status(401).json({ msg: "Not Authorised"})
        
        const id = Number(req.params.id);  //req.params.id is a string convert it to nuumber
        const { title, content } = req.body;
        console.log(title,content);
        const updatePost= await prisma.post.update({
            where: {
                id: id,
            },
            data: {
                title: title,
                content: content,
            }
        })
        res.json(updatePost);

    }catch(err){
        res.status(500).json({
            msg: "incompatible or id not found"
            ,error: err
        })
    }
    res.json(post)
}

module.exports.deletePost=async(req,res)=>{
    const id = Number(req.params.id);
    try{
        const deleteUser = await prisma.post.delete({
            where: {
                id: id
            },
        })
        res.json(deleteUser);

    }catch(err){
        res.status(401).json({
            error:err
        })
    }
}

