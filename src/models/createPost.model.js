const mongoose = require('mongoose');

const createPostSchema = new mongoose.Schema({
    image:{
        type: String,
        required: true
        
    },
    caption:{
        type: String,
        required: true
    
    },
    location:{
        type: String,
        required: true
    
    },
    tag:{
        type: String,
        required: true
    
    
    },
    video:{
        type: String,
        required: true
    
    
    },
    mention:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    },
    
    

})

const PostModel = mongoose.model('Post', createPostSchema);

module.exports = PostModel;