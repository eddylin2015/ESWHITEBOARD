var exec = require("child_process").exec;
var formidable = require('formidable');
  //  http = require('http'),
 //   util = require('util');
var querystring = require("querystring");
var    fs = require("fs");
var path = require('path'); 
var url = require("url");
var mysql=require("mysql");
var pool  = mysql.createPool({
	//var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: '',
    password: '',
    database: ''
	});	
function start(response,request) {
  console.log("Request handler 'start' was called.");
  var content = "empty";
// exec("ls -lah",function (error, stdout, stderr) {});
// exec("find /",    { timeout: 10000, maxBuffer: 20000*1024 },    function (error, stdout, stderr) {});
//dir tmp /b
  exec("wrgTotal.exe SC1A", function (error, stdout, stderr) {
    content = stdout;
//	response.writeHead(200, {"Content-Type": "text/plain"});
	response.writeHead(200, {"Content-Type": "text/html"});
	var res = stdout.split("\n");
	for(i=0;i<res.length;i++){
		 response.write(res[i]);
   // response.write("file:"+res[i]+"<img src='/pngshow?filename="+res[i]+"'><br>");
	
	}

    response.end();
  });

  return content;
}
function form(response,request) {
 console.log("Request handler 'form' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}
function upload(response,request) {
console.log("Request handler 'upload' was called.");	
	var postData = "";
    
    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '"+
      postDataChunk + "'.");
    });

    request.addListener("end", function() {
		response.writeHead(200, {"Content-Type": "text/plain"});
       response.write("You've sent: " +  querystring.parse(postData).text);
        response.end();
    });
}
function pngupload(response,request) {
console.log("Request handler 'upload' was called.");
  console.log(request);
  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
   console.log("parsing done");
   var r=Math.floor((Math.random() * 10) + 1);
   var str=	files.upload.name;
 if (fs.existsSync("tmp/"+files.upload.name)) {
    // Do something
	fs.renameSync(files.upload.path, "tmp/"+r+files.upload.name);
	str=	r+files.upload.name;
}else
{
	fs.renameSync(files.upload.path, "tmp/"+files.upload.name);  
}
  response.writeHead(200, {"Content-Type": "text/html"});
    //response.write("received image:<br/>");
	if(files.upload.type=='image/jpeg' 
	||files.upload.type=='image/png' 
	||files.upload.type=='image/bmp'
	||files.upload.type=='image/gif'
	||files.upload.type=='image/tif'  ){
	var str=	files.upload.name;
	console.log(str);
    //response.write("<img src='/pngshow?filename="+str+"' />");
	response.write(str);
	}else{
	var str=	files.upload.name;
	console.log(str);
	response.write(str);
	
	}
    response.end();	
  
    
    
  });
}
function pngform(response,request) {

 console.log("Request handler 'start' was called.");
  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/pngupload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}
function pngshow(response,request) {
	////////
	if (request.method == 'POST') {
                var body = '';
                request.on('data', function (data) {
                    body += data;
                });
                request.on('end',function() {
                    var POST =  qs.parse(body);
                    //console.log(POST);                   
                    console.log( JSON.stringify( POST ) );
                });
        }
        else if(request.method == 'GET') {
            //  request.setEncoding("utf8");
            var url_parts = url.parse(request.url,true);
            // console.log(url_parts.query);
            console.log( JSON.stringify( url_parts.query ) );
			var filename=url_parts.query['filename'];
			//filename=querystring.parse(filename).text;
			console.log("Request handler 'show' was called."+filename);
			fs.readFile("tmp/"+filename, "binary", function(error, file) {
			if(error) {
				response.writeHead(500, {"Content-Type": "text/plain"});
				response.write(error + "\n");
				response.end();
			} else {
				response.writeHead(200, {"Content-Type": "image/png"});
				response.write(file, "binary");
				response.end();
			}
  });

			
        }
	//////////
}
function listtmpfiles(response,request) {
	////////
	response.writeHead(200, {"Content-Type": "text/plain"});
				
	fs.readdir("tmp", function(err, items) {
    console.log(items);
 
    for (var i=0; i<items.length; i++) {
		response.write(items[i] + "\n");
        console.log(items[i]);
    }
	response.end();
    });
			
			// Don't use the connection here, it has been returned to the pool. 
}
function mysqltest(response,request) {
	////////
	pool.getConnection(function(err, connection) {
		connection.query( 'SELECT RoleID,RoleName,Privilege,SysPrivilege,SubSysPrivilege FROM es_role', function(err, rows) {
			// And done with the connection. 
			try{
			console.log(rows);
			for(i=0;i<rows.length;i++){
			response.write(rows[i]["RoleID"].toString());
			response.write(rows[i]["RoleName"].toString());
			if(rows[i]["Privilege"] != null){
			   response.write(rows[i]["Privilege"].toString());
			}
			response.write("<br>");
			}
			//response.write(rows);
			}catch(except_error){
				console.log(except_error)
			}
			connection.release();
			response.end();
			// Don't use the connection here, it has been returned to the pool. 
		});
	});
	//////////
}
exports.start = start;
exports.upload = upload;
exports.form = form;
exports.pngform = pngform;
exports.pngupload = pngupload;
exports.pngshow = pngshow;
exports.mysqltest = mysqltest;
exports.listtmpfiles=listtmpfiles;