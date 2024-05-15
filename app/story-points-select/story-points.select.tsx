"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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
    console.log(selectedPoint);
    socket.emit("registerStoryPoint", selectedPoint, roomName);

    handleGetStoryPoints();
  };

  return (
    <div>
      <fieldset className="flex flex-initial gap-6 ">
        <ToggleGroup
          variant="default"
          type="single"
          onValueChange={(value: string) =>
            handleStoryPointSelection(Number(value))
          }
        >
          {FIBONACCI_NUMBERS.map((number) => (
            <div key={number} className="flex gap-2">
              <ToggleGroupItem
                value={String(number)}
                className="block max-w-sm bg-black text-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                {number}
              </ToggleGroupItem>
            </div>
          ))}
        </ToggleGroup>
      </fieldset>
    </div>
  );
}
