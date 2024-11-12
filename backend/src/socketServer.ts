import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';

export function initializeSocketServer(httpServer: HTTPServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected to ', socket.id);

    socket.on('disconnect', (reason) => {
      console.log('A user disconnected', socket.id, 'reason:', reason);
    });
  });

  return io;
}