import React, { useState } from "react";
import { Skeleton } from "antd";
import styles from "./MainPageVideoPlayer.module.scss";

interface VideoPlayerProps {
  src?: string;
  isLoading?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, isLoading }) => {

  return (
    <>
      {isLoading && <Skeleton.Button active className={styles.skeleton} />}

      
      <iframe
        src={src}
        title="Video"
        frameBorder="0"
        allowFullScreen
        className={styles.video}
        style={{ display: isLoading ? "none" : "block", backgroundColor: isLoading ? "transparent" : "#D3D3D3" }}
      />
    </>
  );
};

export default VideoPlayer;
