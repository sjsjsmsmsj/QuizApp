import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.9wumyqq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
console.log(process.env.DB_USERNAME)
console.log(process.env.DB_PASSWORD)

console.log(url)
const connectMongoDB = async () => {
    try {
        await mongoose.connect(url)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}

export default connectMongoDB;