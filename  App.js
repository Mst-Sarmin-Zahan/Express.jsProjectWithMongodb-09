let express = require("express");
let app = express();
let router = require("./src/Routes/ api");

//Security middleware

const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp")
const MongoClient = require('mongodb').MongoClient;


app.use(helmet());
app.use(cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.use(mongoSanitize);
app.use(hpp);



// Connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'CraftShop';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
client.connect((err) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }

    // Successfully connected to the database
    console.log('Connected to MongoDB');


});


// Defined routes here
app.use("/api",router);

// undefined routes and set 404 status code
app.use("*",(req, res, next) => {
    res.status(404).json({status:"fail", data: "404 - Not Found"})
});


module.exports = app;

