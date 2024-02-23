/**
# @author Jonas Svay <svay.jonas6@gmail.com>
# @version CryptoHUB 1.0
# Changes: -
# Date 23.02.2024
#
# Description: Real-time chat function with Socket.io
#
#============================================
#
#              CryptoHUB
#
#============================================
 */

const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const allUser = document.getElementById('users');

// Get information from the url (username and room)
const {username, room} = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

// Connect to the server using Socket.IO
const socket = io();

// Emit a 'joinRoom' event to notify the server about the user joining
socket.emit('joinRoom', {username, room});

// Listen for 'roomUsers' event to update room name and user list
socket.on('roomUsers', ({room, users}) => {
  RoomNameOutput(room);
  UsersOutput(users);
})

// Listen for 'message' event to output messages
socket.on('message', message => {
  messageOutput(message);

  // Auto-scroll to the latest message
  chatMessage.scrollTop = chatMessage.scrollHeight;
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the message input value
  const msg = e.target.elements.msg.value;

  // Emit 'chatMessage' event to send the message to the server
  socket.emit('chatMessage', msg)

  // Clear the message input field
  e.target.elements.msg.value = '';
});

// Function to output a message in the chat
function messageOutput(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

// Function to output the current room name
function RoomNameOutput(room) {
  roomName.innerText = room;
}

// Function to output the list of users in the room
function UsersOutput(users) {
  allUser.innerHTML = `
${users.map(user => `<li>${user.username}</li>`).join('')}
  `;
}