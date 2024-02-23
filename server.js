/**
# @author Jonas Svay <svay.jonas6@gmail.com>
# @version CryptoHUB 1.0
# Changes: -
# Date 23.02.2024
#
# Description: Real-time chat server for CryptoHUB
#
#============================================
#
#              CryptoHUB
#
#============================================
 */

// Import modules
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require('./utils/messages');

// Import functions
const {userJoin, getCurrentUser,userLeave,
getRoomUsers} = require('./utils/users');

// Create Express app, HTTP server, and Socket.io
const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use(express.static(path.join('./public')));

// Bot name for system messages
const bot = 'CryptoBot';

io.on('connection', socket => {

  // User joining
  socket.on('joinRoom', ({username, room}) => {

  // Add user to room
  const user = userJoin(socket.id, username, room);
  
  socket.join(user.room);
  
  // Welcome message to user
  socket.emit('message', formatMessage(bot, 'Welcome to CryptoChat'));

  // Broadcasting that a other user has joined
  socket.broadcast.to(user.room).emit('message', formatMessage(bot, `${user.username} has joined the chat!`));
  });

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    // Broadcasting that a user has left
    if (user){
      io.to(user.room).emit('message', formatMessage(bot, `${user.username} has left the chat!`));

      // Update user and room list after disconnect
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });

  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id);

    // Broadcasting message to room
    io.to(user.room).emit('message', formatMessage(user.username, msg));

    // Update room and user after message
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });

  });
});


const port = 3000;

// Server list on port 3000
server.listen(port, () => console.log(`Server running on port ${port}`));
