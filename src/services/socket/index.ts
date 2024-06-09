import { Server, Socket } from 'socket.io';

interface Message {
  from: string;
  text: string;
}

export default function initializeSocket(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log('Client connected',socket.id);

    socket.on('message', (message: Message) => {
      console.log('Received message:', message);
      io.emit('receive-message', message);
    });

    // socket.emit('message', { from: 'Server', text: `Welcome to the chat ${socket.id}` });
    // socket.broadcast.emit('welcome', { from: 'Server', text: `New user joined the chat ${socket.id}` });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}
