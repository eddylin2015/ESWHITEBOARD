var App;
var canvas_pencolor='#FF0000';
var lastPt=null;
(function() {
  
  App = {};
  /*
  	Init 
  */
  App.init = function() {
    App.canvas = document.createElement('canvas');
    App.canvas.height = 700;
    App.canvas.width = 1100;
    document.getElementsByTagName('article')[0].appendChild(App.canvas);
    App.ctx = App.canvas.getContext("2d");
    App.ctx.fillStyle = "solid";
    //App.ctx.strokeStyle = "#ECD018";
	App.ctx.strokeStyle = "#0000FF";
    App.ctx.lineWidth = 5;
    App.ctx.lineCap = "round";
    App.socket = io.connect('http://192.168.102.135:4000');
    App.socket.on('draw', function(data) {
      return App.draw(data.x, data.y, data.type,data.pencolor);
    });
	App.socket.on('cleardraw', function(data) {
      return App.cleardraw(data.x, data.y, data.type);
    });
	App.socket.on('drawbg', function(data) {
      return App.drawbg(data.x, data.y, data.type);
    });
	App.socket.on('openMP4', function(data) {
      return App.openMP4(data.x, data.y, data.type);
    });	
	App.socket.on('drawdot', function(data) {
      return App.drawbg(data.x, data.y, data.type);
    });
	App.openMP4 = function(x, y, type) {
		//var url='pngshow?filename='+x;
		var video = document.getElementById("video");
		video.src=x;
		video.style.display = "block";		
		video.play(); 
		video.onload = function() {
      };
    };
    App.draw = function(x, y, type,pencolor) {
      if (type === "dragstart" || type==='touchstart') {
        App.ctx.beginPath();
        return App.ctx.moveTo(x, y);
      } else if (type === "drag"|| type==='touchmove') {
        App.ctx.lineTo(x, y);
	    App.ctx.strokeStyle = pencolor;
        return App.ctx.stroke();
      } else {
        return App.ctx.closePath();
      }
    };
	 App.cleardraw = function(x, y, type) {
		 App.ctx.strokeStyle = canvas_pencolor;
		 App.ctx.clearRect(0, 0, App.canvas.width, App.canvas.height);
		 
    };
	App.drawbg = function(x, y, type) {
		var url='pngshow?filename='+x;
		var backgroundImage = new Image(); 
		backgroundImage.onload = function() {
			var context=App.ctx;
		w=App.canvas.height /backgroundImage.height*backgroundImage.width;
		context.drawImage(backgroundImage, 0, 0,w,App.canvas.height );
		//context.drawImage(backgroundImage, 0, 0);
      };
		backgroundImage.src = url; 
	    //document.body.style.backgroundImage = "url('pngshow?filename=640_0807fe4a5be2105fe465766f63fde0e4.jpg')";
		 //App.ctx.clearRect(0, 0, App.canvas.width, App.canvas.height);
    };
	
	App.touchHandlers = function(e) {
		e.preventDefault();
//		App.ctx.fillRect(e.touches[0].pageX,e.touches[0].pageY,5,5);
		lastPt={x:e.touches[0].pageX,y:e.touches[0].pageY};
App.socket.emit('drawClick', {
		x: e.touches[0].pageX,
		y: e.touches[0].pageY,
		type: 'dragstart',
		pencolor:canvas_pencolor
    });
	}
	App.touchHandlerm = function(e) {
		e.preventDefault();
		if(lastPt !=null){
		App.ctx.beginPath();
		App.ctx.moveTo(lastPt.x,lastPt.y);
		App.ctx.lineTo(e.touches[0].pageX,e.touches[0].pageY);
		App.ctx.strokeStyle = canvas_pencolor;
		App.ctx.stroke();
		App.socket.emit('drawClick', {
		x: e.touches[0].pageX,
		y: e.touches[0].pageY,
		type: 'drag',
		pencolor:canvas_pencolor
    });
		}
		lastPt={x:e.touches[0].pageX,y:e.touches[0].pageY};
		//App.ctx.fillRect(e.touches[0].pageX,e.touches[0].pageY,5,5);
	};
	App.touchHandlere = function(e) {
		e.preventDefault();
		lastPt=null;
		App.socket.emit('drawClick', {
		x: e.touches[0].pageX,
		y: e.touches[0].pageY,
		type: 'dragend',
		pencolor:canvas_pencolor
    });
//
	};
	App.canvas.addEventListener("touchstart",App.touchHandlers,false);
	App.canvas.addEventListener("touchmove",App.touchHandlerm,false);
	App.canvas.addEventListener("touchend",App.touchHandlere,false);
  };
  
    ///
	 //touchstart touchmove touchend
	 
	 
  /*
  	Draw Events
  */
  
  $('canvas').live('drag dragstart dragend', function(e) {
    var offset, type, x, y;
    type = e.handleObj.type;
    offset = $(this).offset();
    e.offsetX = e.layerX - offset.left;
    e.offsetY = e.layerY - offset.top;
    x = e.offsetX;
    y = e.offsetY;
    App.draw(x, y, type,canvas_pencolor);
    App.socket.emit('drawClick', {
      x: x,
      y: y,
      type: type,
	  pencolor:canvas_pencolor
    });
  });
	
  
  $(function() {
    return App.init();
	
  });
}).call(this);
