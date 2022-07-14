const fs = require('fs');
const http = require('http');
const { title } = require('process');
const url = require('url');

const app = http.createServer((req, res) => {
    let _url = req.url;
    let queryData = url.parse(_url, true).query;

    if (_url === "/") {
        res.writeHead(200);

        let title = "연습";
        let content = `
        <h1>페이지 생성</h1>
        <ul>
            <h2>
                <a href = "/create">create</a>
            </h2>
        </ul>
        `;
        res.end(getTemplateHTML(title, content));
    } else if (_url === "/create") {
        res.writeHead(200);

        let title = "페이지 생성 창";
        let content = `
            <form action = "http://localhost:3000/process" method = post>
            <p><input type = "text", name = "title" placeholder = "title"></p>
            <p><textarea name = "content" placeholder = "content"></textarea></p>
            <p><input type = "submit"></p>
            </form>
        `;
        res.end(getTemplateHTML(title, content));
    } else if (_url === "/process") {
        res.writeHead(200);
        res.end(_url);
    } else {
        res.writeHead(404);
        res.end('Not Found!');
    }

});

function getTemplateHTML(title, content) {
    return `
<!DOCTYPE html>
<html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
    </head>

    <body>
        ${content}
    </body>
</html>
`;
}

app.listen(3000);