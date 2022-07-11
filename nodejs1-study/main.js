const http = require('http');
const fs = require('fs');
const url = require('url');

var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    console.log(_url);
    if(_url == '/') {
        title = 'Welcome';
    }
    if(_url == '/favicon.ico') {
        response.writeHead(404);
        response.end();
        return;
    }

    if(_url == '/picture') {
        console.log('picccc');
        fs.readFile('coding.jpg', function(err, data) {
            response.writeHead(200);
            response.end(data);
        });
    } else {
        response.writeHead(200);
        fs.readFile(`${__dirname}/text/${title}`, 'utf8', function(err, data) {
            var content = data;
            var template = `
            <!doctype html>
            <html>
                <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
                </head>
                <body> 
                <h1><a href="/">WEB</a></h1>
                <ol>
                    <li><a href="?id=HTML">HTML</a></li>
                    <li><a href="?id=CSS">CSS</a></li>
                    <li><a href="?id=JavaScript">JavaScript</a></li>
                </ol>
                <h2>${title}</h2>
                <p>
                ${content}
                </p>
                </body>
            </html>
            `
            response.end(template);
        });
    }
});


app.listen(3000);