import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Spin, Flex } from 'antd';
import { Link } from 'react-router-dom';
import atom from './assets/atom.png';
import styles from './MainBanner.module.scss';

const MainBanner = () => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <section className={styles.bannerContainer}>
      <div className={styles.bannerContent}>
        <div className={styles.leftContainer}>
          <h1 className={styles.title}>Платформа медицинских физиков</h1>

          <div className={styles.infoContainer}>
            <div className={styles.info}>
              <p className={styles.subtitle}>Обучайся передовым технологиям в медицине вместе с нами!</p>

              <div className={styles.buttonGroup}>
                <Button className={styles.button} type="default">Видеолекции</Button>

                <Button className={styles.button} type="default">Статьи</Button>

                <Button className={styles.button} type="default">Подкасты</Button>

                <Button className={styles.button} type="default">VR тренажеры</Button>
                
                <Button className={styles.button} type="default">Практика</Button>
                
                <Button className={styles.button} type="default">ИФИБ</Button>
              </div>
            </div>

          <img className={styles.atom} src={atom} alt="Preview" />
          </div>
        </div>

        <Link style={{width: '100%'}} to="/registration">
          <Button className={styles.registerBtn} type="primary">
              Зарегистрироваться
          </Button>
        </Link>
      </div>
      
      {loading && (
        <Flex className={styles.spinner} justify="center" align="center" >
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </Flex>
      )}

      <iframe
        src="https://www.youtube.com/embed/iSjvnUn27EU"
        frameBorder="0"
        allowFullScreen
        className={styles.video}
        onLoad={handleLoad}
        style={loading ? { display: 'none' } : { display: 'block' }}
      />
    </section>
  );
};

export default MainBanner;
