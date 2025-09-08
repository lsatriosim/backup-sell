'use client';

export default function FilterRowSkeleton() {
  return (
    <div className="flex gap-3 px-4 overflow-x-auto">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="h-10 w-[140px] bg-gray-200 rounded-full animate-pulse"
        />
      ))}
    </div>
  );
}
