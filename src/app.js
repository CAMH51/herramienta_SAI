require('dotenv').config();
require('./Config/pgdb');
const https = require("https");
const express = require('express');
const routes = require('./Router/router'); 
const app = express();


app.set("views", "src/views");
app.set("view engine", "ejs");

app.use(express.static("src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', routes);


https.createServer(app).listen(process.env.PORT, function (req, res) {
    console.log(`Server started at port: ${process.env.PORT}`);
  });


