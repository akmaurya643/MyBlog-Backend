const express = require('express');
const userController = require("../controllers/post.controller");
const upload = require("../storages/multer.config");
const middleware = require("../middleware/middleware");


const router = express.Router();

router.post("/creat/post", upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]) , middleware.authUser, userController.createPost)

module.exports = router;

// C:\Users\akmau\AppData\Local\Android\Sdk