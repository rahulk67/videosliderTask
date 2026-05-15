import { useState, useRef ,useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useVideoPlayback } from '../hooks/useVideoplayback';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';


export default function VideoPlayer({ video }) {
  console.log(video,"video in video player");
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.6 });
  const videoRef = useVideoPlayback(isVisible);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showShare, setShowShare] = useState(false);

    // NEW
  const [isPlaying, setIsPlaying] = useState(true);

   const animationRef = useRef(null);


  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (v) setProgress((v.currentTime / v.duration) * 100);
  };

   useEffect(() => {

    const updateProgress = () => {

      const video = videoRef.current;

      if (video && video.duration) {

        const percentage =
          (video.currentTime / video.duration) * 100;

        setProgress(percentage);
      }

      animationRef.current =
        requestAnimationFrame(updateProgress);
    };

    if (isVisible) {
      animationRef.current =
        requestAnimationFrame(updateProgress);
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
    };

  }, [isVisible]);

    // PLAY / PAUSE
  const togglePlayPause = () => {

    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };


  return (
    <div ref={ref} className="video-player-wrapper">
      {loading && <div className="spinner animate-spin"><i className="fa-solid fa-spinner text-white"></i></div>}

      <video
        ref={videoRef}
        src={video.url}
        loop
        muted={muted}
        playsInline
        // onTimeUpdate={handleTimeUpdate}
        onLoadedData={() => setLoading(false)}
          preload="metadata"
           className={`w-full video-el h-full object-cover transition-opacity duration-500 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
      />

       {/* CENTER PLAY/PAUSE BUTTON */}
      <button
        className="play-pause-btn"
        onClick={togglePlayPause}
      >
        {isPlaying ? (
          <i className="fas fa-pause"></i>
        ) : (
          <i className="fas fa-play"></i>
        )}
      </button>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

        <div className="controls-volume">
        <button onClick={() => setMuted(m => !m)}>
          {muted ? <i className="fas fa-volume-mute"></i> : <i className="fas fa-volume-up"></i>}
        </button>
      </div>

      {/* Controls */}
      <div className="controls ">
        
        <LikeButton videoId={video.id} initialLikes={video.likes} oldLikes={video.oldLikes} />
        <ShareButton videoId={video.id} videoUrl={video.url} title={video.title} shareCount={video.shares} />
        <button><i className='fa-solid fa-cart-shopping'></i></button>
      </div>
    </div>
  );
}