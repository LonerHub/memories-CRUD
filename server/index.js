import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Cors from 'cors'; 
import postRoutes from './routes/posts.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(Cors());

app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
    .catch((error) => console.log(error));

