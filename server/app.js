const express = require('express');

require('./db/mongoose')
const path = require('path')

const https = require('https')
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const userRouter = require('./routes/userRoute');

const serveIndex = require('serve-index');

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

//app.use(require('./middlewares/auth'));
app.use(baseUrl, userRouter);
app.use('/profilepic', serveIndex('assets/pics'))

app.use('/profilepic', express.static(path.join(__dirname, 'assets/pics')))


// catch all routes that are not api route
// app.all('*', (req, res) => {
//     res.redirect('/');
// });


app.listen(8000, () => console.log('Server listening on port 8000'))