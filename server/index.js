const express =require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");

const app = express();

require("dotenv").config();


app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages",messageRoutes);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser : true,
    useUnifiedTopology : true
    
}).then(()=>{
    console.log("DB connection Successfull");
}).catch((error)=>{console.log(error.message)});



const server = app.listen(process.env.PORT,()=>{

    console.log(`Server started on Port ${process.env.PORT}`)
})