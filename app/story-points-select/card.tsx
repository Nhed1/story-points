"use client";
import { StoryPoint } from "./interfaces";

interface ICard {
  visible: boolean;
  selectedPoint: number;
  username: string;
}

export default function Card({ selectedPoint, username, visible }: ICard) {
  return (
    <div className="flex flex-col p-2 ">
      <div
        className={`w-2 p-5 flex justify-center bg-emerald-900 ${
          !visible && "text-opacity-0"
        }`}
      >
        <p className="font-semibold text-lg text-white">{selectedPoint}</p>
      </div>

      <p className="">{username}</p>
    </div>
  );
}
