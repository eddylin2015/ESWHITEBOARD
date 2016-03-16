(function() {
  var io;
  io = require('socket.io').listen(4000);
  io.sockets.on('connection', function(socket) {
    socket.on('drawClick', function(data) {
      socket.broadcast.emit('draw', {
        x: data.x,
        y: data.y,
        type: data.type,
		pencolor:data.pencolor
      });
    });
	socket.on('cleardrawClick', function(data) {
      socket.broadcast.emit('cleardraw', {
        x: data.x,
        y: data.y,
        type: data.type
      });
    });
	socket.on('drawbgClick', function(data) {
      socket.broadcast.emit('drawbg', {
        x: data.x,
        y: data.y,
        type: data.type
      });
    });
	socket.on('openMP4Click', function(data) {
      socket.broadcast.emit('openMP4', {
        x: data.x,
        y: data.y,
        type: data.type
      });
    });
	socket.on('penOpenCloseClick', function(data) {
      socket.broadcast.emit('penOpenClose', {
        x: data.x,
        y: data.y,
        type: data.type
      });
    });
	
  });
}).call(this);
