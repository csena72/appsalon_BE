import express from 'express';
import { db } from './config/db.js';
import servicesRoutes from './routes/servicesRoutes.js';
import { configDotenv } from 'dotenv';


configDotenv('./.env');

const app = express();
const port = process.env.PORT || 3000;

db();

app.use('/api/services', servicesRoutes);

app.listen(port, () => {
    console.log(`Server listening at ${process.env.HOST}:${port}`); 
});