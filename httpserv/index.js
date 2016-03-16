var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/form"] = requestHandlers.form;
handle["/upload"] = requestHandlers.upload;
handle["/pngupload"] = requestHandlers.pngupload;
handle["/pngform"] = requestHandlers.pngform;
handle["/pngshow"] = requestHandlers.pngshow;
handle["/mysql"] = requestHandlers.mysqltest;
handle["/listtmpfiles"] = requestHandlers.listtmpfiles;
server.start(router.route,handle);
