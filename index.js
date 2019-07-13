/**
 * Primary file for the API
 */

// Dependencies
const http = require('http')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder

// The server should respond to all request with a string
let server = http.createServer(function (req, res) {

   // Get the URL and parse it
   let parsedUrl = url.parse(req.url, true);

   // GEt the path
   let path = parsedUrl.pathname;
   let trimmmedPath = path.replace(/^\/+|\/+$/g, '');

   // Get the querystrings as an object
   let queryStringObject = parsedUrl.query;

   // Get the HTTP Method
   let method = req.method.toLowerCase();

   // Get the headers as and object
   let headers = req.headers;

   // Get the payload, if any
   let decoder = new StringDecoder('utf-8');
   let buffer = '';

   req.on('data', function (data) {
      buffer += decoder.write(data);
   });

   req.on('end', function () {
      buffer += decoder.end();

      console.log('TrimmedPath: ' + trimmmedPath);
      console.log('Typeof:: ' + typeof(router[trimmmedPath]), typeof(router[trimmmedPath])  )
      console.log()
      // Choose the handler this request should go to. If one is not found, use the notFound handler.
      let chosenHandler = typeof(router[trimmmedPath]) !== 'undefined' ? router[trimmmedPath] : handlers.notFound;
      
      console.log(chosenHandler)

      // Construct the data object to send to the handler
      let data = {
         trimmmedPath,
         queryStringObject,
         headers,
         payload: buffer
      };

      // Router the request to hte handler specified in the router
      chosenHandler(data, function(statusCode, payload){
         // Use the status code call back by the handler, of default 200
         statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

         // Use the payload call bakc by the handler, or use an empty object
         payload = typeof(payload) === 'object' ? payload : {}

         // Convert to String
         let payloadString = JSON.stringify(payload);

         // Return the response
         res.setHeader('Content-Type', 'application/json');
         res.writeHead(statusCode);
         res.end(payloadString);


         // Log the request path
         console.log('Returning this response: ', statusCode, payloadString);
      });

     
      console.log('Request Headers: ', headers, '\n')
      console.log('Request received with payload: ' + buffer)
   });
});


// Start the server, and have it listen on port 3000
server.listen(3000, function () {
   console.log('The server is listening on port 3000 now');
   console.log('Check it on: http://localhost:3000');
});


// Define the handlers
let handlers = {
 sample: (data, callback) => {
    // Calback a http status code, and a payload object
    callback(406, {'name': 'sample handler'})
 },

 notFound: (data, callback) => {
    callback(404)
 }
}

// Define a request router
let router = {
   sample: handlers.sample
}