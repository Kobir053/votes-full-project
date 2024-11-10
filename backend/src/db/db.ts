import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connected = await mongoose.connect(process.env.MONGO_URI as string);
        console.log("mongoDB connected: ", connected.connection.host);
    } 
    catch (error: any) {
        console.error(error.message);
    }
}

export default connectDB;