import { io } from 'socket.io-client';

export const socketClient = io('http://172.16.2.254:8080');
