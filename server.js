require("dotenv").config();
const app = require("./src/app");
const connectDb = require("./src/db/connectDb");

connectDb()
const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log("server start successfuly", port)
})