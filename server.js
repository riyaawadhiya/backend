import http from "http";
import { Server } from "socket.io";

import dotenv from "dotenv";

import app from "./app.js";
import connectDB from "./config/db.js";
import { registerStockSocket } from "./sockets/stock.socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const httpServer = http.createServer(app);




const io = new Server(httpServer, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});


app.set("io", io);


registerStockSocket(io);

const startServer = async () => {
  try {
   
    await connectDB();

    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(" Failed to start server:", error);
    process.exit(1);
  }
};

startServer();