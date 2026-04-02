require('dotenv').config();
const express = require("express");
const cors = require('cors');
const linksRouter = require('./components/link');
const app = express();


app.use(cors({
   origin: '*',
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/links', linksRouter);

app.options('*', cors());

const PORT = 3000;
app.listen(PORT, () => {
   console.log("Server is up on port " + PORT);
});