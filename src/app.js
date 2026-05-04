const express = require('express');
const authRoutes = require("./routers/user.router")
const cookies = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookies());

app.use('/api/auth',authRoutes);
module.exports = app;