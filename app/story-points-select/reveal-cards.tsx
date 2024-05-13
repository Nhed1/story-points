"use client";
import { useState } from "react";
import { Button } from "../components/button";

export default function RevealCards({
  storyPointSelected,
}: {
  storyPointSelected: number | undefined;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center ">
      {storyPointSelected && (
        <>
          <div
            className={`w-2 p-4 flex justify-center bg-zinc-950 ${
              visible ? "text-slate-200" : "text-opacity-0"
            }`}
          >
            {storyPointSelected}
          </div>
          <button onClick={() => setVisible(!visible)}>
            <p>revelar cartas</p>
          </button>
        </>
      )}
    </div>
  );
}
