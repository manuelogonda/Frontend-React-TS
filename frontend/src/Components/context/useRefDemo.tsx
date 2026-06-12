import { useRef, useState } from "react";

export function VideoPlayer() {
  // 1. Explicitly type the ref to target an HTML5 Video element
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    // Safety guard: Always check if the DOM node exists on .current
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause(); // Direct native DOM execution
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-900 rounded-2xl shadow-xl border border-gray-800">
      <video
        ref={videoRef}
        src="https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-32156-large.mp4"
        className="w-full h-64 object-cover rounded-xl border border-gray-700"
        loop
        muted
      />
      
      <div className="mt-4 flex justify-between items-center px-2">
        <span className="text-xs text-gray-400 uppercase font-mono tracking-wider">
          {isPlaying ? "Status: Live Playing" : "Status: Paused"}
        </span>
        <button
          onClick={togglePlayback}
          className={`px-6 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 ${
            isPlaying 
              ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20' 
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20'
          }`}
        >
          {isPlaying ? 'Pause Element' : 'Play Element'}
        </button>
      </div>
    </div>
  );
}