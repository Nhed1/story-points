"use client";
import { useState } from "react";
import RevealCards from "../reveal-cards";
import StoryPointsSelect from "../story-points.select";

export default function Page({ params }: { params: { room: string } }) {
  const [storyPointSelected, setStoryPointSelected] = useState<number>();

  return (
    <div className="flex flex-col justify-center items-center w-full bg-slate-200 h-screen">
      <h2>{params.room}</h2>
      <RevealCards storyPointSelected={storyPointSelected} />
      <StoryPointsSelect setStoryPointSelected={setStoryPointSelected} />
    </div>
  );
}