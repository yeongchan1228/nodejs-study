const fs = require('fs');
const http = require('http');
const url = require('url');
const qs = require('querystring');

const app = http.createServer((req, res) => {
    let _url = req.url;
    let queryData = url.parse(_url, true).query;
    fs.readdir
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

        let title = "파일 생성 창";
        let content = `
            <form action = "http://localhost:3000/process" method = post>
            <p><input type = "text", name = "title" placeholder = "title"></p>
            <p><textarea name = "content" placeholder = "content"></textarea></p>
            <p><input type = "submit"></p>
            </form>
        `;
        res.end(getTemplateHTML(title, content));
    } else if (_url === "/process") {
        let body = '';
        req.on('data', (data) => {
            body = body + data;
        });
        req.on('end', () => {
            let post = qs.parse(body);
            let title = post.title;
            let content = post.content;
            fs.writeFile(__dirname + `/file/${title}`, content, 'utf8', (err) => {
                if (err) throw err;

                res.writeHead(302, { location: `/` });
                res.end("success");
                res.redir
            });
        });
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