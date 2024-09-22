import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import styles from './App.module.css';

const App = () => {
  return (
      <div className={styles.app}>
          <Header />
            <Outlet />
          <Footer />
      </div>
  );
};

export default App;