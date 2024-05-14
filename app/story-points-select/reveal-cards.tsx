"use client";
import { useEffect, useState } from "react";
import { StoryPoint } from "./interfaces";
import { socket } from "../socket";

export default function RevealCards({
  storyPoints,
}: {
  storyPoints: StoryPoint[];
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    socket.on("cardsVisible", (showCards) => {
      setVisible(showCards);
    });

    return () => {
      socket.off("cardsVisible");
    };
  }, []);

  const handleToggleVisible = () => {
    const newVisibility = !visible;
    setVisible(newVisibility);
    socket.emit("toggleVisibleCards", newVisibility);
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
              {storyPoint.selectedPoint}
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            handleToggleVisible();
          }}
        >
          <p>revelar cartas</p>
        </button>
      </>
    </div>
  );
}
