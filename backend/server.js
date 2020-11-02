const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io');
require('dotenv').config();

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

// TODO: insert a mongo db connection to a locally-running mongo instance

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 5000

// run this code when user connects
io.on('connection', socket => {
  console.log('New websocket connection');

  socket.on('join', ({name, room}, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    // i don't know if i like this error architecture of passing callbacks between the client and the server for error handling
    if (error) {
      return callback(error);
    }

    // 'message' is emitted when we want to send a message from the server to the client
    socket.emit('message', { user: 'server', text: `${user.name}, welcome to the room ${user.room}` })
    socket.broadcast.to(user.room).emit('message', { user: 'server', text: `${user.name} has joined`});

    socket.join(user.room);

    callback();
  });

  // 'sendMessage' events are emitted by the client when an user sends a message
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    console.log('User has left')
  });
});


app.use(cors());
app.use(express.json());

// add routes for teh api
const chatRouter = require('./routes/chat');
app.use('/chat', chatRouter);

const deckbuilderRouter = require('./routes/deckbuilder');
app.use('/deckbuilder', deckbuilderRouter);

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});