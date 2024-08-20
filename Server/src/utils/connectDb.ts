import mongoose from "mongoose";


export function connectDb(){
    mongoose.connect("mongodb://root:chatapp2024@localhost:27017/",{
        dbName:"chatapp"
    }).then((db)=>console.log(db.connection.host)).catch((err)=>console.log(err))  
}