import { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "hooks/AuthProvider";
import { useLogin } from "hooks/useLogin";
import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate: loginMutation, isPending } = useLogin();

  const handleSubmit = (values: any) => {
    loginMutation(values, {
      onSuccess: (data) => {
        login(data.access, data.refresh);
        
        const redirectPath = localStorage.getItem("redirectPath") || "/";
        localStorage.removeItem("redirectPath");
        navigate(redirectPath);
      },
      onError: (error) => {
        setErrorMessage("Неверный логин или пароль");
        console.error("Login failed", error);
      },
    });
  };
  
  const handleGoHome = () => {
    localStorage.removeItem("redirectPath");
  };

  return (
    <div className={styles.loginContainer}>
      <Link to="/" className={styles.backLink} onClick={handleGoHome}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.33325 8.00065C1.33325 6.23254 2.03563 4.53685 3.28587 3.28661C4.53612 2.03636 6.23181 1.33398 7.99992 1.33398C8.8754 1.33398 9.7423 1.50642 10.5511 1.84145C11.36 2.17649 12.0949 2.66755 12.714 3.28661C13.333 3.90566 13.8241 4.64059 14.1591 5.44943C14.4941 6.25827 14.6666 7.12517 14.6666 8.00065C14.6666 9.76876 13.9642 11.4645 12.714 12.7147C11.4637 13.9649 9.76803 14.6673 7.99992 14.6673C7.12444 14.6673 6.25753 14.4949 5.4487 14.1598C4.63986 13.8248 3.90493 13.3338 3.28587 12.7147C2.03563 11.4645 1.33325 9.76876 1.33325 8.00065ZM11.9999 7.33398H6.66658L8.99992 5.00065L8.05325 4.05398L4.10659 8.00065L8.05325 11.9473L8.99992 11.0007L6.66658 8.66732H11.9999V7.33398Z"
            fill="white"
          />
        </svg>
        На главную
      </Link>

      <div className={styles.loginCard}>
        <h2 className={styles.loginTitle}>Вход в личный кабинет</h2>

        {errorMessage && (
          <Alert
            message={errorMessage}
            type="error"
            showIcon
            closable
            onClose={() => setErrorMessage("")}
          />
        )}

        <Form
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label={
              <span>
                Почта<span className={styles.requiredStar}>*</span>
              </span>
            }
            name="username"
            className={styles.inputItem}
          >
            <Input placeholder="example@email.com" />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Пароль<span className={styles.requiredStar}>*</span>
              </span>
            }
            name="password"
            className={styles.inputItem}
          >
            <Input.Password placeholder="Введите пароль" />
          </Form.Item>

          <Form.Item className={styles.inputItem}>
            <Link to="/update-password" className={styles.forgotPasswordLink}>
              Забыли пароль?
            </Link>
          </Form.Item>

          <Form.Item className={styles.inputItem}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              className={styles.loginButton}
            >
              Войти
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.registerLink}>
          Ещё не аккаунта? <Link to="/registration">Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
