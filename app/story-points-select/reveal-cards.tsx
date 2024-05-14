"use client";
import { useState } from "react";
import { socket } from "../socket";

export default function RevealCards({ roomName }: { roomName: string }) {
  const [storyPoints, setStoryPoints] = useState<number[]>([]);
  const [visible, setVisible] = useState(false);

  const handleGetStoryPoints = () => {
    socket.emit("getStoryPoints", roomName);

    socket.on("storyPoints", (points) => {
      setStoryPoints(points);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <>
        <div className="flex gap-4">
          {storyPoints.map((storyPoint, index) => (
            <div
              key={index}
              className={`w-2 p-4 flex justify-center bg-zinc-950 ${
                visible ? "text-slate-200" : "text-opacity-0"
              }`}
            >
              {storyPoint}
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            handleGetStoryPoints();
            setVisible(!visible);
          }}
        >
          <p>revelar cartas</p>
        </button>
      </>
    </div>
  );
}
