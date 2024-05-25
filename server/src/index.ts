import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mainRouter from './routes/index'
import dotenv from 'dotenv';


dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api', mainRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
