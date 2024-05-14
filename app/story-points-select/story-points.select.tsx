"use client";

import { socket } from "../socket";
import { HandleGetStoryPoints } from "./interfaces";

const FIBONACCI_NUMBERS = [1, 2, 3, 5, 8, 13, 21, 34, 55];

export default function StoryPointsSelect({
  roomName,
  handleGetStoryPoints,
}: {
  roomName: string;
  handleGetStoryPoints: HandleGetStoryPoints;
}) {
  const handleStoryPointSelection = (selectedPoint: number) => {
    socket.emit("registerStoryPoint", selectedPoint, roomName);

    handleGetStoryPoints();
  };

  return (
    <div>
      <fieldset className="flex flex-initial gap-6 ">
        {FIBONACCI_NUMBERS.map((number) => (
          <div key={number} className="flex gap-2">
            <input
              type="radio"
              id={String(number)}
              name="fibonacci"
              value={String(number)}
              onChange={() => handleStoryPointSelection(number)}
            />
            <label htmlFor={String(number)}>{number}</label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}
