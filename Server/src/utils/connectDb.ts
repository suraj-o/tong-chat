import mongoose from "mongoose";


export function connectDb(){
    mongoose.connect(process.env.DB_URL as string,{
        dbName:"chatapp"
    }).then((db)=>console.log(db.connection.host)).catch((err)=>console.log(err))  
}