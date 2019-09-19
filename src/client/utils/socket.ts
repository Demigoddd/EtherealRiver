import io from "socket.io-client";

const rootSocket = io('http://localhost:3003');

rootSocket.on('connect', () => {
  console.log('Socket Connected!');
});

export default rootSocket;
