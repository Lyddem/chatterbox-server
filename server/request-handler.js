/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
const querystring = require('query  string');

const messages = [];

var requestHandler = function(request, response) {

  var statusCode;
  if (request.method === 'POST' && request.url === '/classes/messages') {

    let body = '';
    request.on('data', chunk => {
      body += chunk;

      // console.log('Data received ---------------------- BODY IS', body);

      messages.unshift(JSON.parse(body));
    });

    statusCode = 201;

    } else if (request.method === 'GET' && request.url.startsWith('/classes/messages')) {
      statusCode = 200;

        //if it has a roomname...
        if(request.url.indexOf('?') !== -1) {
        var headers = defaultCorsHeaders;
        headers['Content-Type'] = 'application/json';
        response.writeHead(statusCode, headers);

          var responseObject = {};
          var query = querystring.parse(request.url.substr(request.url.indexOf('?') + 1));
          responseObject.results = messages.filter(function(obj) {
            return obj.roomname === query.roomname;
          });
            response.end(JSON.stringify(responseObject));
          return;
        } else {
           statusCode = 404;
    }
}
  // const responseObject = {};
  // responseObject.results = messages;
  // response.end(JSON.stringify(responseObject), function() {});

  // console.log('REQUEST METHOD', request.method);
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.


  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;
  //console.log('HEADERS ARE-------------------------------', defaultCorsHeaders)
  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'application/json';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.

  //when server recieves data...
  var responseObject = {};
  responseObject.results = messages;

  response.end(JSON.stringify(responseObject), function() {
    console.log(responseObject);
  });
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

console.log('----------------------------> ABOUT To EXPORT');
module.exports.requestHandler = requestHandler;

/*
throws error if no room.
expect('.........')
  if (!JSON.parse(body).roomname) {
    throw new error('You must supply a roomname')
 }
returns messages with dateTime()

test filter by room.
//sends in a specific room name -- response has that roomname.
//submit 3 different rooms
//expect "filtered" room

var messages = JSON.parse(body).results;
        expect(messages[message.length - 1].roomname).;
*/



















