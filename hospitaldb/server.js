var http = require('http');
var fs = require('fs');
var path = require('path');
server = http.createServer(function (request, response) {

    //console.dir(request.param);

    console.log(request.method + " " + request.url);

    if (request.method == 'POST') {

        request.on('end', function () {
            console.log("write");
            //write out the body to a file!
        });

    }

    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';

    var extname = String(path.extname(filePath)).toLowerCase();
    var contentType = 'text/html';
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.css': 'text/css',        
    };

    contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function (error, content) {
        if (error) {
            if (error.code == 'ENOENT') {
                fs.readFile('./404.html', function (error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });



});

port = 3000;
host = '127.0.0.1';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);
