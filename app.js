const express = require ('express');
const app=express();
const {createConnectionPool}=require('./dbService')
const path = require('path');
const session=require('express-session');
const bodyParser=require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


const oneDay = 1000 * 60 * 60 * 2;
const KEY='ordinary key';
const NAME='sid';

app.use(session({
    name:NAME,
    resave:false,
    saveUninitialized:false,
    secret:KEY,
    cookie: {
        maxAge:oneDay,
        sameSite:true,
        secure:false
    }
}));


const ruter=require('./index');  
app.use("/",ruter);


createConnectionPool();
app.listen(3000);
    