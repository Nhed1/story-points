import { Socket } from "socket.io";

interface RoomStoryPoint {
  id: string;
  user: string;
  selectedPoint?: number;
}

interface ISocket extends Socket {
  roomName: string;
  name: string;
}

const roomStoryPoints: Record<string, RoomStoryPoint[]> = {};

const handleRoom = (socket: ISocket, roomName: string, user: string) => {
  socket.join(roomName);

  socket.roomName = roomName;
  socket.name = user;

  if (!roomStoryPoints[roomName]) {
    roomStoryPoints[roomName] = [];
  }

  roomStoryPoints[roomName].push({ id: socket.id, user });
};
export const handleRegisterPoint = (
  socket: ISocket,
  roomName: string,
  selectedPoint: number
) => {
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
    console.log("hello world");
    roomStoryPoints[roomName].push({
      selectedPoint,
      id: socket.id,
      user: "",
    });
  }
};
