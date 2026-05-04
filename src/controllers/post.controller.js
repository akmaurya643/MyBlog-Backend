const cteatePostModel = require('../models/createPost.model');

async function createPost(req, res){
    try {
        const { caption, location, tag, mention} = req.body;
        const image = req.file.path;
        const video = req.file.path;

        if(!image || !caption || !location || !tag || !video || !mention){
            return res.status(400).json({message: "all fields are required"})
        }

        const newPost = await cteatePostModel.create({
            image,
            caption,
            location,
            tag,
            video,
            mention
        })

        res.status(201).json(newPost)


    } catch (error) {
        res.status(500).json({message: error.message})
    
    }
}

module.exports = {
    createPost
}

// C:\Users\akmau\AppData\Local\Android\Sdk