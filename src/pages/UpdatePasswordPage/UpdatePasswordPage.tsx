import { useParams, Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Alert, Modal } from "antd";
import { useUpdatePassword } from "hooks/useUpdatePassword";
import styles from "./UpdatePasswordPage.module.scss";
import { useState } from "react";

const UpdatePasswordPage = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { mutate, isPending } = useUpdatePassword();
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onFinish = async (values: { password: string; confirmPassword: string }) => {
    setSubmitted(true);
    setErrorMessage("");
  
    try {
      await form.validateFields();
  
      if (values.password !== values.confirmPassword) {
        form.setFields([
          { name: "password", errors: ["Пароли не совпадают"] },
          { name: "confirmPassword", errors: ["Пароли не совпадают"] },
        ]);
        return;
      }
  
      mutate(
        { uuid: uuid!, password: values.password },
        {
          onSuccess: () => {
            setIsModalVisible(true);
          },
          onError: (error: any) => {
            setErrorMessage(error.response?.data?.errorMessage || "Ошибка обновления пароля");
          },
        }
      );
    } catch {
      setSubmitted(false);
    }
  };

  const handleModalButton = () => {
    setIsModalVisible(false);
    navigate("/login");
  };

  return (
    <div className={styles.updatePasswordContainer}>
      <Link to="/" className={styles.backLink}>
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

      <div className={styles.updatePasswordCard}>
        <h2 className={styles.updatePasswordTitle}>Восстановление пароля</h2>

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
          layout="vertical"
          form={form}
          onFinish={onFinish}
          className={styles.formContainer}
        >
          <Form.Item
            label="Новый пароль"
            name="password"
            rules={[
              {
                validator: (_, value) => {
                  if (submitted && !value) {
                    return Promise.reject(
                      new Error('Поле "Пароль" обязательно для заполнения')
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
            className={styles.inputItem}
          >
            <Input.Password placeholder="Введите новый пароль" />
          </Form.Item>

          <Form.Item
            label="Подтвердите пароль"
            name="confirmPassword"
            rules={[
              {
                validator: (_, value) => {
                  if (submitted && !value) {
                    return Promise.reject(
                      new Error('Поле "Подтверждение пароля" обязательно для заполнения')
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
            className={styles.inputItem}
          >
            <Input.Password placeholder="Подтвердите пароль" />
          </Form.Item>

          <Form.Item className={styles.inputItem}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              className={styles.updatePasswordButton}
            >
              Сохранить пароль
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Modal
        title="Пароль изменен"
        open={isModalVisible}
        footer={null}
        onCancel={handleModalButton}
      >
        <p>Ваш пароль был успешно изменен.</p>
        <div className={styles.modalButtonContainer}>
          <Button
            type="primary"
            loading={isPending}
            className={styles.updatePasswordButton}
            onClick={handleModalButton}
          >
            Перейти на страницу авторизации
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UpdatePasswordPage;
