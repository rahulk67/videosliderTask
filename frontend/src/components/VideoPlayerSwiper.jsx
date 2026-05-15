import { useState, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useVideoPlayback } from '../hooks/useVideoplayback';



export default function VideoPlayer({ video }) {
  console.log(video,"video in video player");
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.6 });
  const videoRef = useVideoPlayback(isVisible);



  return (
    <div ref={ref} className="video-player-wrapper">

      <img
        src={video?.thumbnail}
        className="video-el"
      />
      
    </div>
  );
}