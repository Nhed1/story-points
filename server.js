import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const roomStoryPoints = {};
let showCards = false;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const handleRoom = (socket, roomName, user) => {
  socket.join(roomName);

  socket.roomName = roomName;
  socket.name = user;

  if (!roomStoryPoints[roomName]) {
    roomStoryPoints[roomName] = [];
  }

  roomStoryPoints[roomName].push({ id: socket.id, user });
};

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on("disconnect", function () {
      const roomName = socket.roomName;

      roomStoryPoints[roomName] = roomStoryPoints[roomName].filter(
        (item) => item.id !== socket.id
      );

      console.log("user disconnected");
    });

    socket.on("connect", function () {
      console.log("user connected");
    });

    socket.on("createRoom", (roomName, user) => {
      handleRoom(socket, roomName, user);
    });

    socket.on("joinRoom", (roomName, user) => {
      handleRoom(socket, roomName, user);
    });

    socket.on("registerStoryPoint", (selectedPoint, roomName) => {
      if (!roomStoryPoints[roomName]) {
        roomStoryPoints[roomName] = [];
      }

      if (!selectedPoint) {
        roomStoryPoints[roomName] = roomStoryPoints[roomName].filter(
          (item) => item.id !== socket.id
        );

        return;
      }

      const user = roomStoryPoints[roomName].find(({ id }) => socket.id === id);

      if (user) {
        user.selectedPoint = selectedPoint;
      } else {
        roomStoryPoints[roomName].push({
          selectedPoint,
          id: socket.id,
          name: socket.name,
        });
      }
    });

    socket.on("getStoryPoints", (roomName) => {
      socket.emit("storyPoints", roomStoryPoints[roomName]);
    });

    socket.on("toggleVisibleCards", (isVisible) => {
      socket.broadcast.emit("cardsVisible", isVisible);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
