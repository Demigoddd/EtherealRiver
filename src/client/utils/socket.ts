import io from "socket.io-client";

const rootSocket = io('http://localhost:3003');
const roomsSocket = io('http://localhost:3003/rooms');
const messagesSocket = io('http://localhost:3003/messages');

rootSocket.on('connect', () => {
  console.log('root connected!');
});
roomsSocket.on('connect', () => {
  console.log('rooms connected!');
});
messagesSocket.on('connect', () => {
  console.log('messages connected!');
});

export {
  rootSocket,
  roomsSocket,
  messagesSocket
};
