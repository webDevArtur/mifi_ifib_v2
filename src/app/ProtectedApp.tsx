import { Outlet } from "react-router-dom";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import { useAuth } from "hooks/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import styles from "./App.module.css";

const App = () => {

  const { isAuthenticated } = useAuth();

  const location = useLocation();

  if (!isAuthenticated) {
    localStorage.setItem("redirectPath", location.pathname);
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.app}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
