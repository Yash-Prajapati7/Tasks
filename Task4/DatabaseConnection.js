import 'dotenv/config';
import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/Muggles`);
        console.log("Database successfully connected!");
    }
    catch(error) {
        console.log("MongoDB Connection Failed :(");
        process.exit(1);
    }
}
export default connectDB;