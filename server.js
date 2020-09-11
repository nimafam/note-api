const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const bodyParse = require('body-parser');
const mongoose = require('./config/database');
const authUser = require('./app/middelwares/authentication');

dotenv.config();

// Router
const noteRouter = require('./routes/notes');
const userRouter = require('./routes/users');

const app = express();

app.set('secretKey', process.env.SECRET_KEY);

mongoose.connection.on('error', console.error.bind(console, 'Mongo connection error: '));

app.use(logger('dev'));

app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json())

app.get('/', (req, res) => {
    res.json({message: 'Api worked fine'});
});

// public route
app.use('/users', userRouter);
// private route
app.use('/notes', authUser.checkToken , noteRouter);

app.get('/favicon.ico', (req, res) => {
    res.sendStatus(204);
});

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use((err, req, res, next) => {
    console.log(err);

    if(err.status === 404)
        res.status(404).json({message: "Not found"});
    else
        res.status(500).json({message: "Something looks wrong :( !!!"});
});

app.listen( process.env.PORT || 3000, () => {
    console.log(`Server works on ${process.env.PORT || 3000}`)
});