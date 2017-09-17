'use strict';

const  http = require('http');
const notFound = require('./routes/notFound');
const index = require('./routes/index');
const publication = require('./routes/public');

http.createServer((req,res)=>{
    if (req.url.match(/\.(html|css|png|js|jpg)$/)) {
    publication(req,res);
    }
        else if ((req.url.startsWith('/index') || (req.url === '/'))) {

            index(req,res);
        }

    else {
        notFound(req,res);
    }


}).listen(process.env.PORT || '8080',() => console.log("Hello fucking world !"));
