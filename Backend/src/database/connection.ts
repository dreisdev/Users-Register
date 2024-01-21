import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const Connection = async (): Promise<void> => {
    try {
        await mongoose.connect(
            `mongodb+srv://project_mao_amiga:${process.env.DATA_BASE_PASS}@datadreis.dnoi4fg.mongodb.net/?retryWrites=true&w=majority`
        )

        console.log("Connected to database");

    } catch (error) {
        console.log(`Error connecting to database: ${error}`);
        throw error;
    }
}
export default Connection;