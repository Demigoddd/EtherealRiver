import io from "socket.io-client";
// @ts-ignore
import window from "global";

const url = (process.env.NODE_ENV === 'production') ? window.location.origin : 'http://localhost:3003';

const rootSocket = io(url, { transports: ['websocket'] });

rootSocket.on('reconnect_attempt', () => {
  rootSocket.io.opts.transports = ['polling', 'websocket'];
});

rootSocket.on('connect', () => {
  console.log('Socket Connected!');
});

export default rootSocket;
