import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from './src/routes/crmRoute';
import authJWT from "./src/middlewares/authJWT";

require('dotenv').config();

const app = express();


const PORT = process.env.PORT;

//mongoose connection
const url = 'mongodb://127.0.0.1:27017/admin?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;
mongoose.connect(url,{
    dbName: "blogs",
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    useNewUrlParser : true
});

//bodyparser setup
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


//serving static files
app.use(express.static('public'));

routes(app);


app.listen(PORT, () => 
    console.log(`Your server is running on port ${PORT}`)
);
