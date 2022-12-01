import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import { app as App } from './app.js';

dotenv.config({
    path: path.resolve(process.cwd(), '.env.local'),
});

const __dirname = path.resolve();
const PORT = process.env.PORT || 8080;

const mongoUri = `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.iiuphqi.mongodb.net/?retryWrites=true&w=majority`;

mongoose
    .connect(mongoUri, (err) => {
        if (err) {
            console.log(err);
        }
    })
    .then(() => {
        console.log('Mongoose connected to the Atlas DB');
    });

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(morgan('tiny'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

        return res.status(200).json({});
    }
    next();
});

app.use('/api', App);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
}

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);

process.on('SIGINT', () => {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });
});

process.once('SIGTERM', () => {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });
});
