import { useEffect, useState } from "react";
import { socket } from "../socket";

export const Users = ({ roomName }: { roomName: string }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("usersInRoom", (usersList) => {
      setUsers(usersList);
    });

    socket.emit("getUsersInRoom", roomName);

    return () => {
      socket.off("usersInRoom");
    };
  }, [roomName]);

  return (
    <div className="absolute top-12 right-12 border border-emerald-600 p-2">
      <h2 className="font-semibold">lista de usuários na sala</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};
