import { useCurrentUser } from "hooks/useCurrentUser";
import { ReactNode } from "react";
import styles from "./ProtectedRoute.module.scss";
import fog from "./assets/fog.png";

interface ProtectedRouteProps {
  unAllowedStatuses?: string[];
  children: ReactNode;
}

const ProtectedRoute = ({ unAllowedStatuses, children }: ProtectedRouteProps) => {
  const { data, isLoading } = useCurrentUser();

  const educationalStatus = data?.user?.role ?? "";

  if ((unAllowedStatuses && unAllowedStatuses.includes(educationalStatus))) {
    return (
        <div className={styles.container}>

          <h1 className={styles.title}>Доступ ограничен</h1>
          <img className={styles.fog} src={fog} alt="fog" />
          <p className={styles.subTitle}>
          Текущий статус на платформе не соответствует требованиям для просмотра
          этого блока.
          </p>
          <p className={styles.text}>
          Если вы считаете, что это ошибка, пожалуйста, свяжитесь с администратором через форму обратной связи.
          </p>
        </div>
      );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
