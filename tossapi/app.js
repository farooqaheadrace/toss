const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const api = require('./api');
require('dotenv').config({ path: __dirname + '/config/.env' })


const app = express();
app.set('port', (process.env.PORT || 8081));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use('/api', api);
app.use(express.static('static'));
app.use(morgan('dev'));

app.use(function (req, res) {
    const err = new Error('not found');
    err.status = 404;
    res.json(err);
});

const mongoUrl = process.env.MONGOURL || 'mongodb://localhost:27017/tossDb';

app.listen(app.get('port'), function () {
    console.log('API Server listening on ' + app.get('port'));
});