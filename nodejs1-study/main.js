const http = require('http');
const fs = require('fs');
const url = require('url');
const folder = './text';

const app = http.createServer(function(request, response) {
    let _url = request.url;
    let queryData = url.parse(_url, true).query;
    let pathname = url.parse(_url, true).pathname;
    let title = queryData.id; 

    let filenames = fs.readdirSync(folder);

    if (pathname === "/") {
        response.writeHead(200);

        let list = '';
        for (let name of filenames) {
            list += `<li><a href="?id=${name}">${name}</a></li>`;
        }

        fs.readFile(`${__dirname}/text/${title}`, 'utf8', function(err, data) {
            let content;
            if (title === undefined) {
                title = "Welcome";
                content = "Hello World!";
            } else {
                content = data;
            }

            let template = `
            <!doctype html>
            <html>
                <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
                </head>
                <body> 
                <h1><a href="/">WEB</a></h1>
                <ul>
                    ${list}
                </ul>
                <h2>${title}</h2>
                <p>
                ${content}
                </p>
                </body>
            </html>
            `
            response.end(template);
        });

    } else if (pathname === "/picture") {
        fs.readFile('coding.jpg', function(err, data) {
            response.writeHead(200);
            response.end(data);
        });
    } else {
        response.writeHead(404);
        response.end('Not Found');
    }
});


app.listen(3000);