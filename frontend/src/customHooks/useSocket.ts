import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5173';

// type CallbackResponse = { status: string };
// type Message = string | Record<string, any>;

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL);
    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('Connected:', socketInstance.id);
      setConnected(true);
    });

    socketInstance.on('disconnect', (reason: string) => {
      console.log('Disconnected:', reason);
      setConnected(false);
    });

    socketInstance.on('updated-votes', () => {
      console.log('Room message received:');
      
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  function leaveRoom(room: string) {
    if (socket) {
      socket.emit('leave', room);
      console.log(`Leaving room: ${room}`);
    }
  }

  return {
    connected,
  };
}