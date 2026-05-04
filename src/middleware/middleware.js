const jwt = require("jsonwebtoken");

async function authUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Please log in" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

module.exports = { authUser };
// C:\Users\akmau\AppData\Local\Android\Sdk