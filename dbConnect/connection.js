import mongoose from "mongoose";


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");
    } catch (error) {
        console.log("Error connecting to database", error);
    }
}

export default connect;