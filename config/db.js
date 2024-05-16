import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const Mongodb_Pass = process.env.MONGODB_PASS;

mongoose.connect(`mongodb+srv://gMuhiuddin:${Mongodb_Pass}@cluster0.xdif6qu.mongodb.net/test`);

export default mongoose;