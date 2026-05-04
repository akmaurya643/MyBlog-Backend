const express = require('express');
const userController = require("../controllers/user.controller");
const upload = require("../storages/multer.config");

const router = express.Router();

router.post('/register', upload.single("avtar"), userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logout);

module.exports = router;

