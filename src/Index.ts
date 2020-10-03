var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

interface Player {
	x: number;
	y: number;
}

interface Players {
	[id: string]: Player;
}

let players: Players = {};

io.on('connection', function(socket: SocketIO.Socket){
	console.log('a user connected');
	socket.on("new-player", function(data) {
		socket.emit("update-players", players);
		socket.broadcast.emit("create-player", {id: socket.id});
		players[socket.id] = {x: 700, y: 1000};
	});
	socket.on("new-place", function(data) {
		socket.broadcast.emit("new-place", {id: socket.id, x: data.x, y: data.y});
	});
});
 
http.listen(4000, function(){
  console.log('listening on *:4000');
});