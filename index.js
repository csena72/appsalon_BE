import express from 'express';
import colors from 'colors';
import cors from 'cors';
import { db } from './config/db.js';
import servicesRoutes from './routes/servicesRoutes.js';
import { configDotenv } from 'dotenv';


configDotenv('./.env');

const app = express();
const port = process.env.PORT || 3000;

db();

const whiteList = [process.env.FRONTEND_URL];

if(process.argv[2] === '--postman') {
    whiteList.push(undefined);
}

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/services', servicesRoutes);

app.listen(port, () => {
    console.log( colors.blue(`Server listening at ${process.env.HOST}:${port}`)); 
});