import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if(!MONGODB_URI){
    throw new Error("check the db environment variables")
}

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

export default async function dbConnect() : Promise<void> {
    if(connection.isConnected){
        console.log("Already connected to db");
        return
    }

    try{
        const db = await mongoose.connect(MONGODB_URI)
        connection.isConnected = db.connections[0].readyState
        console.log("DATABASE CONNECTED SUCCESSFULLY!");
        
    }catch(error){
        console.log("DATABASE CONNECTION FAILED", error);
        process.exit(1)
    }

}




