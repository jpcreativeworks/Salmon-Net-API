const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const router = require('./routes/api/index');


const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(require('./routes'));
app.use(router);

mongoose.connect('mongodb://127.0.0.1:27017/salmon-net', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('debug', true);


app.listen(PORT, function() {console.log(`app is running on ${PORT}`)})