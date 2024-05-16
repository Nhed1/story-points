"use client";
import { useEffect, useState } from "react";
import { StoryPoint } from "./interfaces";
import { socket } from "../socket";
import { Button } from "@/components/ui/button";
import Card from "./card";

export default function RevealCards({
  storyPoints,
}: {
  storyPoints: StoryPoint[];
}) {
  const [visible, setVisible] = useState(false);

  console.log(storyPoints);

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
    <div className="flex flex-col justify-center items-center mb-6">
      <div className="flex flex-col gap-4 items-center">
        {visible && (
          <div className="flex">
            {storyPoints.map((storyPoint, index) => (
              <Card
                key={index}
                selectedPoint={storyPoint.selectedPoint}
                username="teste"
              />
            ))}
          </div>
        )}
        <Button
          className="max-w-28"
          onClick={() => {
            handleToggleVisible();
          }}
        >
          revelar cartas
        </Button>
      </div>
    </div>
  );
}
