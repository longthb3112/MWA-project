const express = require('express');
require('./db/mongoose')

const https = require('https')
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const userRouter = require('./routes/userRoute');

const baseUrl = '/api';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// settings
app.set('trust proxy', true);
app.disable('x-powered-by');
app.use(helmet.hidePoweredBy())
app.disable('etag');
app.set('strict routing', true);
app.enable('case sensitive routing');

//unrem later
//app.use(require('./middlewares/auth'));
app.use(baseUrl, userRouter);



// catch all routes that are not api route
app.all('*', (req, res) => {
    res.redirect('/');
});



app.listen(8000, () => console.log('Server listening on port 8000'))