import express from "express";
import logger from "morgan";
import cors from "cors";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import socket from "socket.io";
import socketController from "./socketController";
import { sequelize } from "./database/sequelize";
import env from "./lib/env";

const server = express();

const { PORT } = env;

server.use(logger("dev"));
server.use(cors());
server.use(express.json());

server.use(routes.user, userRouter);

const app = server.listen(PORT, () => {
  console.log(`Server Running On http://localhost:${PORT}`);
});

const io = socket.listen(app);

io.on("connection", (socket: any) => {
  socketController(socket);
});

sequelize.sync();
