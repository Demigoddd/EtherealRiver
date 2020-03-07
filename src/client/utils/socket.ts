import io from "socket.io-client";
import { get } from 'lodash-es';

const rootSocket = io(get(window, "appConfig.URL"), { transports: ['websocket'] });

rootSocket.on('reconnect_attempt', () => {
  rootSocket.io.opts.transports = ['polling', 'websocket'];
});

rootSocket.on('connect', () => {
  // console.log('Socket Connected!');
});

export default rootSocket;
