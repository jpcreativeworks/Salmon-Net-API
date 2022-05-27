const express = require('express');
const path = require('path');


const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, function() {console.log(`app is running on ${PORT}`)})