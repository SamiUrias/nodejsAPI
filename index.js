/**
 * Primary file for the API
 */

 // Dependencies
 const http =  require('http')
 const url = require('url')
 const stringDecoder = require('string_decoder').stringDecoder

// The server should respond to all request with a string
var server = http.createServer(function(req, res){
    
    // Get the URL and parse it
    var parsedUrl = url.parse(req.url, true);

    // GEt the path
    var path = parsedUrl.pathname; 
    var trimmmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the querystrings as an object
    var queryStringObject = parsedUrl.query;

    // Get the HTTP Method
    var method  = req.method.toLowerCase();

    // Get the headers as and object
    var headers = req.headers;




    // Send the response
    res.end('Hello World\n');

    // Log the request path
    console.log('Request is receivd on this path: ' + trimmmedPath + ' with method: ' + method +' with these query string paramters: ', queryStringObject); 
    console.log('Request Headers: ', headers, '\n')
});


 // Start the server, and have it listen on port 3000
 server.listen(3000, function(){
    console.log('The server is listening on port 3000 now');
    console.log('Check it on: http://localhost:3000');
 });