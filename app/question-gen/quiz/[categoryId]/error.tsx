"use client";

export default function Error({ error, reset }: { 
  error: Error; 
  reset: () => void 
}) {
  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold text-red-600">Something went wrong.</h2>
      
      {/* Optional debugging during development */}
      <p className="text-sm text-gray-500">{error.message}</p>

      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Retry
      </button>
    </div>
  );
}