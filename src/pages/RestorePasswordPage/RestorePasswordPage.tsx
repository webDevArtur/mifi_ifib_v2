import { useState } from "react";
import { Form, Input, Button, Alert, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useRestorePassword } from "hooks/useRestorePassword";
import styles from "./RestorePasswordPage.module.scss";

const RestorePasswordPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { mutate: restorePasswordMutation, isPending } = useRestorePassword();
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (values: { email: string }) => {
    setSubmitted(true);

    setErrorMessage("");
    try {
    await form.validateFields();
      restorePasswordMutation(values, {
        onSuccess: () => {
          setIsModalVisible(true);
        },
        onError: (error: any) => {
          setErrorMessage(error.response?.data?.errorMessage || "Ошибка восстановления пароля");
        },
      });
    } catch {
      setSubmitted(false);
    }
  };
  

  const handleModalButton = () => {
    setIsModalVisible(false);
    navigate("/");
  };

  return (
    <div className={styles.restorePasswordContainer}>
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

      <div className={styles.restorePasswordCard}>
        <h2 className={styles.restorePasswordTitle}>Восстановление пароля</h2>

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
          onFinish={handleSubmit}
        >
          <Form.Item
            label={
              <span>
                Почта<span className={styles.requiredStar}>*</span>
              </span>
            }
            name="email"
            className={styles.inputItem}
            rules={[
              {
                validator: (_, value) => {
                  if (submitted) {
                    if (!value) {
                      return Promise.reject('Поле "Почта" обязательно для заполнения');
                    }
                    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
                      return Promise.reject("Введите e-mail в формате example@email.com");
                    }
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input placeholder="example@email.com" />
          </Form.Item>

          <Form.Item className={styles.inputItem}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              className={styles.restorePasswordButton}
            >
              Восстановить
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Модальное окно */}
      <Modal
        title="Письмо отправлено"
        visible={isModalVisible}
        footer={null}
        onCancel={handleModalButton}
      >
        <p>Мы отправили письмо с инструкциями по восстановлению пароля на вашу почту.</p>
        <div className={styles.modalButtonContainer}>
          <Button
            type="primary"
            loading={isPending}
            className={styles.restorePasswordButton}
            onClick={handleModalButton}
          >
            Перейти на главную
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default RestorePasswordPage;
