import io from "socket.io-client";

// const publicUrl = process.env.PUBLIC_URL || 'http://localhost:3003';

const rootSocket = io(window.location.origin, { transports: ['websocket'] });

rootSocket.on('reconnect_attempt', () => {
  rootSocket.io.opts.transports = ['polling', 'websocket'];
});

rootSocket.on('connect', () => {
  console.log('Socket Connected!');
});

export default rootSocket;
