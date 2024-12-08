import { useState } from 'react';
import { Skeleton } from 'antd';
import styles from './IframeWithLoader.module.scss';

interface IframeWithLoaderProps {
  src: string;
}

const IframeWithLoader: React.FC<IframeWithLoaderProps> = ({ src }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && (
        <Skeleton.Button active className={styles.skeleton} />
      )}
      <iframe
        src={src}
        title="Stepik Course"
        className={styles.iframe}
        onLoad={handleIframeLoad}
        style={{ display: isLoading ? 'none' : 'block' }}
      ></iframe>
    </div>
  );
};

export default IframeWithLoader;
