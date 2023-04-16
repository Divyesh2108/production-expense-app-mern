const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const connectDb = require("./config/connectDB");


// config dotenv
dotenv.config();

// database call
connectDb();
// rest object
const app = express();

// middleWare
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// static files
app.use(express.static(path.join(__dirname,'./client/build')));

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./client/build/index.html"))
})

// routes
app.use('/api/v1/users', require('./routes/userRoute'))
app.use('/api/v1/transaction', require('./routes/transactionRoutes'))

// port
const PORT = 8080 || process.env.PORT
app.listen(PORT, ()=>{
    return `your server is running on ${PORT}`
})