import { useState } from 'react';
import { likeVideo } from "../api/api"


export default function LikeButton({ videoId, initialLikes,oldLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (liked) return;
    setLiked(true);
    setLikes(l => l + 1); // Optimistic update
    try {
      const data = await likeVideo(videoId);
      if (!data.success) setLikes(l => l - 1); // Rollback if already liked
    } catch {
      setLikes(l => l - 1);
      setLiked(false);
    }
  };

  return (
    <button onClick={handleLike} className={`like-btn ${liked ? 'liked' : ''}`}>
    {liked || oldLikes < likes  ?  <i className="fa-solid fa-heart text-red-600"></i>  : <i className="fa-regular fa-heart"></i> }{likes}
    </button>
  );
}