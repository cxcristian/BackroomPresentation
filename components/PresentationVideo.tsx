"use client";

import { useState, useRef, useEffect, createRef } from "react";

interface PresentationVideoProps {
  videos: string[];
  loop?: boolean;
}

export function PresentationVideo({ videos, loop = false }: PresentationVideoProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Use createRef inside an array to handle dynamic lengths
  const videoRefs = useRef(videos.map(() => createRef<HTMLVideoElement>()));

  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex]?.current;
    if (currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.play().catch(console.error);
    }

    videoRefs.current.forEach((ref, index) => {
      if (index !== currentIndex && ref.current) {
        ref.current.pause();
      }
    });
  }, [currentIndex]);

  const handleEnded = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (loop) {
      setCurrentIndex(0);
    }
  };

  if (videos.length === 0) return null;

  return (
    <div className="relative w-full h-full bg-[#111]">
      {videos.map((video, index) => (
        <video
          key={`${video}-${index}`}
          ref={videoRefs.current[index]}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            currentIndex === index ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          src={`/videos/${video}`}
          onEnded={handleEnded}
          muted
          playsInline
          controls={currentIndex === index}
          preload="auto"
        />
      ))}
    </div>
  );
}
