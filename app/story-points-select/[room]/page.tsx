"use client";
import { useEffect, useState } from "react";
import RevealCards from "../reveal-cards";
import StoryPointsSelect from "../story-points.select";
import { socket } from "@/app/socket";
import { StoryPoint } from "../interfaces";

export default function Page({ params }: { params: { room: string } }) {
  const [storyPoints, setStoryPoints] = useState<StoryPoint[]>([]);

  const handleGetStoryPoints = () => {
    socket.emit("getStoryPoints", params.room);

    socket.on("storyPoints", (points) => {
      if (points) setStoryPoints(points);
    });
  };

  useEffect(() => {
    socket.on("storyPoints", (points) => {
      if (points) setStoryPoints(points);
    });

    return () => {
      socket.off("storyPoints");
    };
  }, []);

  useEffect(() => {
    socket.emit("getStoryPoints", params.room);
  }, [params.room, storyPoints]);

  return (
    <div className="flex flex-col justify-around items-center w-full bg-slate-200 h-screen">
      <div>
        <RevealCards storyPoints={storyPoints} />
        <StoryPointsSelect
          roomName={params.room}
          handleGetStoryPoints={handleGetStoryPoints}
        />
      </div>
    </div>
  );
}
