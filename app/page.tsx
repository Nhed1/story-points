"use client";

import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center w-full bg-slate-200 h-screen">
      <button onClick={() => router.push("story-points-select")}>
        go to story points
      </button>
    </div>
  );
}
