import express from 'express'
import dotenv from 'dotenv'
import connectMongoDB from './src/dbConfig.js'
import questionRouter from './src/routers/question.js'
import userRouter from './src/routers/user.js'
dotenv.config()
const app = express()

app.use(express.json())
app.use('/questions', questionRouter)
app.use('/users', userRouter)


connectMongoDB().then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
})

app.listen(3000, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Server is running on port 3000')
    }
})