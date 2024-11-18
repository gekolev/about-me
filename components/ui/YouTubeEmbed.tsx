"use client";

import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const YouTubeEmbed = ({ src }: { src: string }) => {
  const videoSrc = `${src}?autoplay=1&controls=0&modestbranding=1&rel=0`;

  return (
    <div
      style={{
        position: "relative",
        maxWidth: "600px", // Set the maximum width of the video container
        margin: "0 auto",
        height: "auto",
      }}
    >
      <div
        style={{
          position: "relative",
          paddingBottom: "56.25%", // 16:9 aspect ratio
          height: 0,
          overflow: "hidden",
        }}
      >
        <ReactPlayer
          url={videoSrc}
          playing={true}
          controls={false}
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>
    </div>
  );
};

export default YouTubeEmbed;
