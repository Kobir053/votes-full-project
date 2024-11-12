import mongoose from "mongoose";
import candidateModel from "../models/candidateModel";

const connectDB = async () => {
    try {
        const connected = await mongoose.connect(process.env.MONGO_URI as string);
        await seed();
        console.log("mongoDB connected: ", connected.connection.host);
    } 
    catch (error: any) {
        console.error(error.message);
    }
}

const seed = async () => {
    if((await candidateModel.find()).length == 0){
        await candidateModel.insertMany([
            {name: "trump", image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg"},
            {name: "Bibi Netanyahu", image: "https://www.jewishvirtuallibrary.org/jsource/images/People/Benjamin-Netanyahu1.jpg"},
            {name: "Joe Biden", image: "https://d1y822qhq55g6.cloudfront.net/default/_superImage/Pres_Joe_Biden_Official_Photo.jpg"},
            {name: "Putin", image: "https://media.npr.org/assets/img/2024/03/18/gettyimages-2084802691-61eb12cb6a65a2f28afb3c34dc12d361919bc699.jpg?s=1100&c=85&f=jpeg"}
        ]);
    }
}

export default connectDB;