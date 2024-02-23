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

const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser,userLeave,
getRoomUsers} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join('./public')));

const bot = 'CryptoBot';

io.on('connection', socket => {
  socket.on('joinRoom', ({username, room}) => {

  const user = userJoin(socket.id, username, room);
  
  socket.join(user.room);
    
  socket.emit('message', formatMessage(bot, 'Welcome to CryptoChat'));

  socket.broadcast.to(user.room).emit('message', formatMessage(bot, `${user.username} has joined the chat!`));
  });

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    if (user){
      io.to(user.room).emit('message', formatMessage(bot, `${user.username} has left the chat!`));

      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });

  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));

    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });

  });
});


const port = 3000;

server.listen(port, () => console.log(`Server running on port ${port}`));
