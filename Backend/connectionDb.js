import mongoose from "mongoose";

//
import dotenv from "dotenv";

//
dotenv.config({ path: "./config/config.env" });//




export const dbConnection = () =>{
    mongoose
    .connect(`mongodb+srv://nivethikashivakumar56:root0@cluster1.wn3novm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`, {
     
        dbName: "inventory-management",
  
        
    })
    .then(()=> {
        console.log("Connected to database successfully");
    })
    .catch((err)=>{
        console.log(`Some error occured while connecting to database! ${err}`);
    });
};