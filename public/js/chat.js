const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const allUser = document.getElementById('users');

// Get information from the url (username and room)
const {username, room} = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const socket = io();

socket.emit('joinRoom', {username, room});

socket.on('roomUsers', ({room, users}) => {
  RoomNameOutput(room);
  UsersOutput(users);
})

socket.on('message', message => {
  messageOutput(message);

  chatMessage.scrollTop = chatMessage.scrollHeight;
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;
  socket.emit('chatMessage', msg)

  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

function messageOutput(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

function RoomNameOutput(room) {
  roomName.innerText = room;
}

function UsersOutput(users) {
  allUser.innerHTML = `
${users.map(user => `<li>${user.username}</li>`).join('')}
  `;
}