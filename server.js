const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');
const fs = require('fs');
require("dotenv").config({ path: './.env' });
const session = require('express-session')
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 5001;
const cron = require('node-cron');
const allowlist = ['http://localhost:3000'];
// const axios = require('axios').default;
// const moment = require('moment-timezone');

const posterController = require("./controller/poster-contoller");
const multer = require('multer')


const corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate));
app.use(express.json());

app.use(express.static(`${__dirname}/client/build`));
app.use('/uploads', express.static('uploads'));

const { connection } = require("./config/dbconnect");
const FilesDbModel = require("./models/posterdb-model");

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisheresecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




app.post("/", (req, res) => {
    console.log('ok');
});

const storage = multer.diskStorage(
    {
        destination: 'uploads/',
        filename: function (req, file, cb) {

            cb(null, file.originalname + '-' + Date.now() + ".jpg");
        }
    }
);


const upload = multer({ storage: storage });


const cpUpload = upload.fields([{ name: 'file', maxCount: 1 }]);

app.post("/savePoster", cpUpload, posterController.savePoster.post);

app.post("/getList", posterController.getList.post);




connection.once("open", () => {
    // console.log(process.env.ATLAS_URI);
    console.log("MongoDB database connection established successfully");
    // log your server is running and the port
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        // console.log(`Click here to open: http://localhost:${port}`);
    });
});

module.exports = app;

