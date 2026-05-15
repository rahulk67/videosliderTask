import { useEffect, useRef } from 'react';

export function useVideoPlayback(isVisible) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      video.play().catch(() => {}); // Autoplay may be blocked
    } else {
      video.pause();
    }
  }, [isVisible]);

  return videoRef;
}