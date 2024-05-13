"use client";

import { socket } from "./socket";
import { useState } from "react";

type Action = "createRoom" | "joinRoom";

const ACTIONS: Action[] = ["createRoom", "joinRoom"];

export default function Home() {
  const [actionSelected, setActionSelected] = useState<Action>("createRoom");
  const [roomName, setRoomName] = useState("");

  const handleRoomAction = (action: Action, roomName: string) =>
    socket.emit(action, roomName);

  return (
    <div className="flex flex-col justify-center items-center w-full bg-slate-200 h-screen">
      <div className="flex flex-col ">
        <input
          type="text"
          placeholder="criar ou entrar em uma sala"
          onChange={(e) => setRoomName(e.target.value)}
        />
        {ACTIONS.map((action) => (
          <div key={action} className="flex gap-2">
            <input
              type="radio"
              id={action}
              value={action}
              name="action"
              onChange={() => setActionSelected(action)}
            />
            <label htmlFor={action}>{action}</label>
          </div>
        ))}
        <button
          onClick={() => {
            handleRoomAction(actionSelected, roomName);
          }}
        >
          criar ou entrar
        </button>
      </div>
    </div>
  );
}
