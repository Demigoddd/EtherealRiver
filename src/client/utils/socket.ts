import io from "socket.io-client";

const rootSocket = io((window as any).appConfig.URL, { transports: ['websocket'] });

rootSocket.on('reconnect_attempt', () => {
  rootSocket.io.opts.transports = ['polling', 'websocket'];
});

rootSocket.on('connect', () => {
  console.log('Socket Connected!');
});

export default rootSocket;
