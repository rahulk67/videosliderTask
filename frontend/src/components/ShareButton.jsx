import { shareVideo } from "../api/api";

export default function ShareButton({
  videoId,
  videoUrl,
  title,
  shareCount
}) {

  console.log(shareCount,"share count");
  const handleShare = async () => {

    await shareVideo(videoId, "native");

    // MOBILE + MODERN BROWSER SHARE
    if (navigator.share) {
      try {
        await navigator.share({
          title: "2 Images" + "" + title,
          text: title,
          url: videoUrl,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } 
    
    // FALLBACK
    else {
      navigator.clipboard.writeText(videoUrl);
      alert("Link copied!");
    }
  };

  return (
         <button className='relative' onClick={() => handleShare()}><i class="fa-regular fa-paper-plane"></i>{shareCount}</button>

  );
}