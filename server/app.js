const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.use('/api',routes);

const port = process.env.port || 8000;

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})