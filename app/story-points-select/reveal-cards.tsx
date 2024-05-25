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
        <div className="flex">
          {storyPoints.map((storyPoint, index) => {
            if (storyPoint.selectedPoint) {
              return (
                <Card
                  visible={visible}
                  key={index}
                  selectedPoint={storyPoint.selectedPoint}
                  username={storyPoint.user}
                />
              );
            }
          })}
        </div>

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
