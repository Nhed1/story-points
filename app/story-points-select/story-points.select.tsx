"use client";

const FIBONACCI_NUMBERS = [1, 2, 3, 5, 8, 13, 21, 34, 55];

export default function StoryPointsSelect({
  setStoryPointSelected,
}: {
  setStoryPointSelected: (v: number) => void;
}) {
  return (
    <div>
      <fieldset className="flex flex-initial gap-6 ">
        {FIBONACCI_NUMBERS.map((number) => (
          <div key={number} className="flex gap-2">
            <input
              type="radio"
              id={String(number)}
              name="fibonacci"
              value={String(number)}
              onChange={() => setStoryPointSelected(number)}
            />
            <label htmlFor={String(number)}>{number}</label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}
