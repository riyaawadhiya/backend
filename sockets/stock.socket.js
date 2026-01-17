export const registerStockSocket = (io) => {
  
  io.on("connection", (socket) => {
    console.log(` Client connected: ${socket.id}`);

    socket.on("stock:join", () => {
      socket.join("stock-room");
      console.log(` ${socket.id} joined stock-room`);
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};