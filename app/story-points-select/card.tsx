"use client";

interface ICard {
  selectedPoint: number;
  username: string;
  visible: boolean;
}

export default function Card({ selectedPoint, username, visible }: ICard) {
  return (
    <div className="flex flex-col p-2 ">
      <div className={`w-2 p-5 flex justify-center bg-emerald-900`}>
        <p
          className={`font-semibold text-lg ${
            visible ? "text-white" : "text-transparent"
          }`}
        >
          {selectedPoint}
        </p>
      </div>

      <p className="">{username || "---"}</p>
    </div>
  );
}
