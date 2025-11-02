export default function setupSocket(io) {
  io.on('connection', (socket) => {
    console.log('A user connected with socket ID:', socket.id);

    socket.on('join_attempt_room', (attemptId) => {
      socket.join(attemptId);
      console.log(`Socket ${socket.id} joined room ${attemptId}`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}
