require('dotenv').config();
require('./Config/pgdb');
const https = require("https");
const express = require('express');
const routes = require('./routes/router'); 
const path = require('path');

const multer = require('multer');
const app = express();


const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});

app.use(multer({ storage }).single("file"));


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', routes);


app.listen(process.env.PORT,()=>{
  console.log(`Server started at port: ${process.env.PORT}`);
})

/* https.createServer(app).listen(process.env.PORT, function (req, res) {
    console.log(`Server started at port: ${process.env.PORT}`);
  });
 */

