"use client";
import { useState } from "react";
import StoryPointsSelect from "./story-points-select/story-points.select";
import RevealCards from "./story-points-select/reveal-cards";

export default function Home() {
  const [storyPointSelected, setStoryPointSelected] = useState<number>();

  return (
    <div className="flex flex-col justify-center items-center w-full bg-slate-200 h-screen">
      <RevealCards storyPointSelected={storyPointSelected} />
      <StoryPointsSelect setStoryPointSelected={setStoryPointSelected} />
    </div>
  );
}
