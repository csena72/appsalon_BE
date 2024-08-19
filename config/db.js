import mongoose from "mongoose";
import colors from 'colors';


export const db = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log(colors.green(`MongoDB connected: ${db.connection.host}`));
    } catch (error) {
        console.log(colors.red.bold(`Error: ${error.message}`));
        process.exit(1);
    }
}