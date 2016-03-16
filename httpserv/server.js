var http = require("http");
var url = require("url");
var fs = require('fs');
var path = require("path");
function start(route,handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
	
	if(pathname=="/") { pathname="/index.html"}
	if(pathname.indexOf(".html") > -1
	||pathname.indexOf(".css") > -1
	||pathname.indexOf(".js") > -1

	)
	{
		contenttype="text/html";
		if(pathname.indexOf(".css") > -1)
		{
			contenttype="text/css";
		}
		fs.readFile("www/"+pathname.substr(1), function (err, data) {
       if (err) {
         console.log(err);
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{	
         //Page found	  
         // HTTP Status: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': contenttype});	
         // Write the content of the file to response body
         response.write(data.toString());		
      }
      // Send the response body 
      response.end();
      });   
	}else if(
	pathname.indexOf(".mp4") > -1
	){
		 //var file = path.resolve("www/"+pathname.substr(1));
		 console.log( pathname.substr(1));
		 var file = path.resolve("tmp/"+pathname.substr(1));
		 
		var range = request.headers.range;
		var positions = range.replace(/bytes=/, "").split("-");
		var start = parseInt(positions[0], 10);
		fs.stat(file, function(err, stats) {
		var total = stats.size;
		var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
		var chunksize = (end - start) + 1;
		response.writeHead(206, {
			"Content-Range": "bytes " + start + "-" + end + "/" + total,
			"Accept-Ranges": "bytes",
			"Content-Length": chunksize,
			"Content-Type": "video/mp4"
		});
		var stream = fs.createReadStream(file, { start: start, end: end })
        .on("open", function() {
          stream.pipe(response);
        }).on("error", function(err) {
          response.end(err);
        });
		});
	}
	else{
	route(handle, pathname, response, request);
	}
	/*
	var postData = "";
   
    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '"+
      postDataChunk + "'.");
    });
    request.addListener("end", function() {
      route(handle, pathname, response, postData);
    });
	*/
	
 //  response.writeHead(200, {"Content-Type": "text/plain"});
 //   response.write("Hello World");
 //   response.end();
  }

  http.createServer(onRequest).listen(80);
  console.log("Server has started.");
}

exports.start = start;
