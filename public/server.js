'use strict';

const body = require('body-parser');
const cors = require('cors');
const cookie = require('cookie-parser');
const app = express();
const morgan = require('morgan');
const fallback = require('express-history-api-fallback');

app.use(morgan('dev'));

app.use(express.static('public'));
app.use(express.static('dist'));
app.use(fallback('index.html', { root: 'public' }));

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(body.json());
app.use(cookie());

const users = {};
const ids = {};

app.post('/signup', function (req, res) {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    console.log (req.body.username);
    if (
        !email || !username || !password ||
        !email.match(/@/) ||
        !username.match(/^\S{4,}$/) ||
        !password.match(/^\S{4,}$/)

    ) {
        return res.status(400).json({error: 'not valid data'});
    }
    if (users[username]) {
        return res.status(400).json({error: 'user is already exist'});
    }

    const id = uuid();
    ids[id] = username;
    users[username] = {password, email};


    res.cookie('cookie', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    // res.json({id});
});

app.post('/signin', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!password || !username) {
        return res.status(400).json({error: 'not valid e-mail or password'});
    }
    if (!users[username] || users[username].password !== password) {
        return res.status(400).json({error: 'not valid e-mail or password'});
    }

    const id = uuid();
    ids[id] = username;

    res.cookie('cookie', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    // res.status(201).json({id});
});

app.post('/session', function (req, res) {
    
    res.status(200);
});



app.delete('/signout', function (req, res) {
    res.cookie('cookie', null, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.status(200).json(null);
});



const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server listening port ${port}`);
});