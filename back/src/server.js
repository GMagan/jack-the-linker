import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import linksRouter from './components/link.js';

const app = express();


app.use(cors({
   origin: '*',
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/links', linksRouter);

app.use(cors());

const PORT = 3000;
app.listen(PORT, () => {
   console.log("Server is up on port " + PORT);
});