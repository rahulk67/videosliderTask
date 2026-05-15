import { useState } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export default function VideoCard({ video, onClick }) {

  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.2,
  });

  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      ref={ref}
      className="video-card relative overflow-hidden"
      onClick={onClick}
    >

      {/* LOADER */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
          <div className="video-loader"></div>
        </div>
      )}

      {/* VIDEO */}
      {isVisible && (
        <video
          src={video.url}
          loop
          autoPlay
          muted
          playsInline
          preload="metadata"
          onLoadedData={() => setIsLoading(false)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

    </div>
  );
}