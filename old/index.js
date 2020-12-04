const mongoose = require("mongoose");
require("dotenv").config({
    path:"./config.env"
})

const cookieParser = require("cookie-parser")


const express = require('express');
const app = express();
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 8080;

// routes for 1 and 2
app.use("/users",require('./routes/userRoutes'));

// routes for  3
app.use("/api/cart",require('./routes/cartRoutes'));

// routes for  4
app.use("/api/item",require('./routes/storeRoutes'));

app.listen(port);
console.log(`listening on port ${port}`);
mongoose.connect(process.env.DB_CONNECTION_STRING,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false


}).then( ()=> console.log("DB connection successful")).catch((err)=> console.log(err))


