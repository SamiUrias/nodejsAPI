/**
 * Primary file for the API
 */

 // Dependencies
 const http =  require('http')
 const url = require('url')

// The server should respond to all request with a string
var server = http.createServer(function(request, response){
    
    // Get the URL and parse it
    var parsedUrl = url.parse(request.url, true);

    // GEt the path
    var path = parsedUrl.pathname; 
    var trimmmedPath = path.replace(/^\/+|\/+$/g, '');

    // Send the response
    response.end('Hello World\n');

    // Log the request path
    console.log('Request is receivd on this path: ' +trimmmedPath);
});


 // Start the server, and have it listen on port 3000
 server.listen(3000, function(){
    console.log('The server is listening on port 3000 now');
    console.log('Check it on: http://localhost:3000');
 });