import mongoose from "mongoose";
import colors from "colors";


// mongo db steps
// step 1 create a shared cluter
//step 2 create new database and table
//step3 Go to security-> database acces->create new user and password 
//go to ecurity-> network acces-> whitelist the ip (0.0.0.0./0)   so that the db can be access from anywher
//step 4 now find the connection stringof cluster from database option and enter in mongodb compass and pres save and connect
//step 5 now your db is connected you can work freely

const MONGO_URL="mongodb+srv://samarraj1304:samking1304@cluster1.eet2bpl.mongodb.net/ecommerce";//it is our connection string
//in case you are using different db than ecoomerce replace the name ecoomeerce at end of mongo url by the name of db

const connectDB=async()=>{
    try{
      const conn=await mongoose.connect(MONGO_URL);
      console.log(`connected to mongodb database ${conn.connection.host}`.bgGreen.white);
    }
    catch(error){
        console.log(`Error in mongo db ${error}`.bgRed.white)
    }
}

export default connectDB;