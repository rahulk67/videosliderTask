
import { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import VideoPlayerSwiper from "./VideoPlayerSwiper";

export default function InnerSlider({
  videos,
  startIndex,
  onClose,
}) {

  const [currentIndex, setCurrentIndex] = useState(startIndex);

  // active video
  const currentVideo = videos[currentIndex];

  // prev video
  const prevVideo =
    currentIndex > 0
      ? videos[currentIndex - 1]
      : null;

  // next video
  const nextVideo =
    currentIndex < videos.length - 1
      ? videos[currentIndex + 1]
      : null;

  // prev
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // next
  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="inner-slider-overlay">

      <button className="close-btn" onClick={onClose}>
        ✕
      </button>

      <div
        className="flex items-center justify-center gap-5"
        style={{
          width: "100%",
          maxWidth: "1100px",
          margin: "auto",
        }}
      >

        {/* prev button */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="bg-white text-black rounded-full px-4 py-2 w-[48px] h-[48px] flex items-center justify-center"
          >
           <i class="fa-solid fa-arrow-left"></i>
          </button>
        )}

        {/* left vid */}
        <div
          style={{
            height: "420px",
            width: "240px",
            opacity: 1.5,
            transform: "scale(0.9)",
          }}
        >
          {prevVideo && (
            <VideoPlayerSwiper video={prevVideo} />
          )}
        </div>

        {/* main video */}
        <div
          key={currentVideo?.id}
          style={{
            width: "360px",
            height: "640px",
            transition: "3.9s ease",
          }}
        >
          <VideoPlayer video={currentVideo} />
        </div>

        {/* right video */}
        <div
          style={{
            height: "420px",
            width: "240px",
            opacity: 1.5,
            transform: "scale(0.9)",
          }}
        >
          {nextVideo && (
            <VideoPlayerSwiper video={nextVideo} />
          )}
        </div>

        {/* next video */}
        {currentIndex < videos.length - 1 && (
          <button
            onClick={handleNext}
            className="bg-white text-black rounded-full px-4 py-2 w-[48px] h-[48px] flex items-center justify-center"
          >
           <i class="fa-solid fa-arrow-right"></i>
          </button>
        )}

      </div>
    </div>
  );
}