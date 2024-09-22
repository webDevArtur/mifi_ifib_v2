import PDFViewer from './components/PdfViewer/PdfViewer';
import { Link } from 'react-router-dom';
import styles from './ArticleDetailsPage.module.scss';
import pdf from './assets/test.pdf';
import cover from './assets/cover.png';

const ArticleDetailsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / <Link to="/introduction">Введение в медицинскую физику</Link> / <Link to="/articles">Научно-популярные статьи</Link> /
      </div>
      
      <div className={styles.articleHeader}>
        <img 
          src={cover} 
          alt="Nuclear Medicine Book" 
          className={styles.articleImage}
        />
        
        <div className={styles.articleInfo}>
          <h1>The Role of Nuclear Medicine in Modern Healthcare</h1>
          <p className={styles.author}>Джон Хопкинс</p>
          <p className={styles.description}>
            Статья обсуждает важность ядерной медицины в современном здравоохранении, 
            подчеркивая её роль в диагностике и лечении заболеваний. Автор анализирует 
            различные методы, такие как ПЭТ и СКТ, и их применение в клинической практике. 
            Рассматриваются преимущества ядерной медицины, включая высокую точность 
            диагностики и возможность оценки функций органов. Также акцентируется внимание 
            на будущих направлениях развития этой области, включая новые радиомаркировочные 
            препараты и технологии, которые могут улучшить результаты лечения и расширить 
            возможности диагностики.
          </p>
        </div>
      </div>
      
      <PDFViewer file={pdf} />
    </div>
  );
};

export default ArticleDetailsPage;
