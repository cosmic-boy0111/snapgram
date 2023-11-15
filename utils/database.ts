import mongoose from "mongoose";
let isConnected = false;

const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log('MongoDB is already connected');
        return;
    }
    
    try {
        const URL : string = process.env.MONGODB_URL ? process.env.MONGODB_URL : ""; 
        await mongoose.connect(URL)

        isConnected = true;
        console.log('mongodb is connected');
    } catch (error) {

        console.log(error);
        
    }
}

export default connectToDB;