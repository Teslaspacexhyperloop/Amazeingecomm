// const express=require("express");
// const colors=require("colors");
//above two line valid when in package.json the type is "common js" when we have set the type "module "use import statements

import  express  from "express";
import  color  from "colors";
import 'dotenv/config';//pta nhi sala chal nhi rha h baad me isko configue karna h
import morgan from "morgan";//it helps in logging the request to the console whethet it is get post or any other request
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js'
import categoryRoute from "./routes/categoryroute.js";
import productRoute from "./routes/productroute.js";
import path from "path";

import cors from 'cors';//see about cors on yt
//cors is used because frontend run on port 3000 and backend run on port 8080 so no cross origin error come so use cors

//my env file data
const PORT=8080;
const DEV_MODE="development";



//configure env
// dotenv.config();
// dotenv.config({path:""})use this syntax when env file is not in root folder

// //database config
connectDB();

//rets object
const app=express();







//middlewares
app.use(cors());
app.use(morgan('dev'));//there are different type of preset available and each will log different type of information as required
app.use(express.json());//pehle body-parser use karna pdta tha
// The app.use() function is used to mount the specified middleware function(s) at the path which is being specified. It is mostly used to set up middleware for your application.
app.use(express.static(path.join(__dirname,'./client/build')))
//routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/category",categoryRoute);
app.use("/api/v1/product",productRoute);

// The code app.use("/api/v1/auth", authRoutes); is used to mount the authRoutes router on the /api/v1/auth path. This means that any requests that are made to the /api/v1/auth path will be handled by the authRoutes router.





//rest api
// app.get("/",(req,res)=>{
//     // res.send({
//     //     message:"welcome",
//     // });  //here in above we have sent the json object
//     res.send("<h1>welcome to our app</h1>");
//     //dont get confused why this text is not showing because our react app is on port 3000 this text will show on port 8080
// });

app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
})





//run listen
app.listen(PORT,()=>{
    console.log(`Server runnin on ${DEV_MODE} MODE port ${PORT}`.bgCyan.white);
    
    //to use the variable in our .env file use process.env.variablename
});