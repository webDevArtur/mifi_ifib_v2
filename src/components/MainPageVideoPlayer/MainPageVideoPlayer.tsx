import React, { useState } from "react";
import { Skeleton } from "antd";
import styles from "./MainPageVideoPlayer.module.scss";

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Skeleton.Button active className={styles.skeleton} />}
      <iframe
        src={src}
        title="Video"
        frameBorder="0"
        allowFullScreen
        onLoad={handleIframeLoad}
        className={styles.video}
        style={{ display: isLoading ? "none" : "block" }}
      />
    </>
  );
};

export default VideoPlayer;
