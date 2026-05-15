import { useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import VideoCard from "./VideoCard"
import InnerSlider from "./InnerSlider"
import isMobile from "react-device-detect";


export default function OuterCarousel({ videos,loading }) {
  const [emblaRef] = useEmblaCarousel({ slidesToScroll: 2, loop: false });
  const [activeIndex, setActiveIndex] = useState(null);

  if (isMobile) {
  console.log("Running on mobile.");
} else {
  console.log("Not on mobile (desktop/tablet).");
}


  console.log("videos in textt",activeIndex);

  return (
    <section className="outer-carousel">
    <p className="text-2xl font-medium text-center pb-2">Our Best Sellers</p>
      <div className="embla mt-5 scrollBar-hide" ref={emblaRef}>
        <div className="embla__container mt-4">
          {videos?.slice(0,20)?.map((video, i) => (
            <div className="embla__slide outer-slide" key={video.id}>
              <VideoCard loading={loading} video={video} onClick={() => setActiveIndex(i)} />
            </div>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <InnerSlider
          videos={videos}
          startIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </section>
  );
}