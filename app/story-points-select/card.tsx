"use client";

interface ICard {
  selectedPoint: number;
  username: string;
}

export default function Card({ selectedPoint, username }: ICard) {
  return (
    <div className="flex flex-col p-2 ">
      <div className={`w-2 p-5 flex justify-center bg-emerald-900`}>
        <p className="font-semibold text-lg text-white">{selectedPoint}</p>
      </div>

      <p className="">{username}</p>
    </div>
  );
}
