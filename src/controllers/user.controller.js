const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');




async function registerUser(req, res) {
    try {
        const { name, username, email, password, number } = req.body;
        const avtar = req.file.path;
        if (!name || !username || !email || !password || !avtar) {
            return res.status(400).json({ message: "all fields are required" })
        }
        const alreadyExistingUser = await userModel.findOne({
            $or: [
                { username },
                { email },
                { number }
            ]
        });

        if (alreadyExistingUser) {
            return res.status(400).json({ message: "username or email alresdy Exist in side" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = userModel.create({
            name,
            username,
            email,
            password: hashedPassword,
            number,
            avtar
        })


        const token = jwt.sign({
            id: newUser._id,
            username: newUser.username,
        }, process.env.JWT_SECRET)

        res.cookies('token', token)

        res.status(201).json({
            user: {
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
                avtar: newUser.avtar,
                number: newUser.number
            },
            token
        })

    } catch (error) {
        console.log(error)
    }
}

async function loginUser(req, res) {
    try {
        const { email, username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: "all fields are required" })

        }
        const user = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]

        });
        if (!user) {
            res.status(401).json({ message: "Invalid credentials" })

        }
        const isVaildPassword = await bcrypt.compare(password, user.password);
        if (!isVaildPassword) {
            res.status(401).json({ message: "Invalid credentials" })


        }
        const token = jwt.sign({
            id: user._id,
            username: user.username,
        }, process.env.JWT_SECRET)

        res.cookies('token', token)

        res.status(200).json({
            user: {
                name: user.name,
                username: user.username,
                email: user.email,
                avtar: user.avtar,
                number: user.number
            },
            token
        })



    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

async function logout(req, res) {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "User logged out successfully" });
    }
    catch(error){
        res.status(500).json({ message: error.message })

    }
}





module.exports = {
    registerUser,
    loginUser,
    logout



}


// C:\Users\akmau\AppData\Local\Android\Sdk