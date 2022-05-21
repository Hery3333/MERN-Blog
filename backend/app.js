import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js'
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user",userRouter); // http://localhost:5000/api/users
app.use("/api/blogs/",blogRouter);

const port = process.env.PORT || 5000
const Database_uri = "mongodb+srv://hery:hery@cluster0.ndxb2.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(Database_uri)
    .then(app.listen(port, () => {console.log(`server running on ${port}`)} ))
    .then(console.log('Database connected'))
    .catch(err => console.log(err))
