const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./Routes/userRoutes");
const productRoutes = require("./Routes/productRoutes")
require("dotenv").config();

const app = express();

//middleware
app.use(express.json());
app.use(express.static("public"));

//routes
app.use("/users",userRouter);
app.use("/api/products",productRoutes)

//database connection
const dbURI = process.env.MONGODB_URL;
mongoose.connect(dbURI , {useNewUrlParser:true, useUnifiedTopology: true},
    (err) => {
        if(err) throw err;
        console.log("db connected");
    }
);

const PORT = process.env.PORT;
app.listen(PORT , () => {
    console.log("server running at", PORT);
});