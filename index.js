const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const Order = require("./Routes/order.router");

app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);


const InitiateMongoServer = require("./Config/db");
InitiateMongoServer()

app.use("/", Order);

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})