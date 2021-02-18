const express = require('express');
const path = require('path');

const messenger = require('socket.io')();

const app = express();

app.use(express.static("public"));

const port = process.env.PORT || 5050;

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/chat", (req, res) => {
	res.sendFile(path.join(__dirname, "chat.html"));
});

const server = app.listen(port, () => {
	console.log(`app is running on ${port}`);
});

//messenger is the connection manager - like a switchboard operator 

messenger.attach(server);

messenger.on("connection", (socket) => {
	var name = "";

	// send the connected user their assigned ID
	socket.emit('connected', { sID: `${socket.id}`, message: 'new connection', nickname: name});

	socket.on('chatmessage', function(msg) {
		messenger.emit('message', { id: socket.id, message: msg});
	});

	socket.on('setname', function(user) {
		socket.emit('set-name', {name: user.name})
		name = user.name;
	});

	socket.on('new-joined', function(nickname) {
		var newName = nickname.name;
		messenger.emit('notif', {name: newName});
	})

	socket.on('disconnect', () => {
		console.log('a user has disconnected');
	})
});