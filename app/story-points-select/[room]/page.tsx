"use client";
import RevealCards from "../reveal-cards";
import StoryPointsSelect from "../story-points.select";

export default function Page({ params }: { params: { room: string } }) {
  return (
    <div className="flex flex-col justify-center items-center w-full bg-slate-200 h-screen">
      <h2>{params.room}</h2>
      <RevealCards roomName={params.room} />
      <StoryPointsSelect roomName={params.room} />
    </div>
  );
}
