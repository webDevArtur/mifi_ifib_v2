import React from "react";
import { Spin, Flex } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./VideoPlayer.module.scss";

interface VideoPlayerProps {
  src: string;
  loading?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, loading = false }) => {
  if (loading) {
    return (
      <Flex className={styles.spinner} justify="center" align="center">
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </Flex>
    );
  }

  return (
    <iframe
      src={src}
      title="Video"
      frameBorder="0"
      allowFullScreen
      className={styles.video}
      style={loading ? { display: "none" } : { display: "block" }}
    />
  );
};

export default VideoPlayer;
