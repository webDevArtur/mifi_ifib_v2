import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import styles from "./IframeWithLoader.module.scss";
import { NoData } from "components/NoData/NoData";

interface IframeWithLoaderProps {
  src?: string;
  loading?: boolean;
}

const IframeWithLoader: React.FC<IframeWithLoaderProps> = ({ src, loading }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading !== undefined) {
      setIsLoading(loading);
    }
  }, [loading]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <Skeleton.Button active className={styles.skeleton} />}
      {src ? (
        <iframe
          src={src}
          title="Stepik Course"
          className={styles.iframe}
          onLoad={handleIframeLoad}
          style={{ display: isLoading ? "none" : "block" }}
        ></iframe>
      ) : (
        <NoData text="Задания отсутствуют" />
      )}
    </div>
  );
};

export default IframeWithLoader;
