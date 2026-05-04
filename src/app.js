const express = require('express');
const authRoutes = require("./routers/user.router")
const postRoutes = require("./routers/post.router")
const cookies = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookies());

app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);

module.exports = app;