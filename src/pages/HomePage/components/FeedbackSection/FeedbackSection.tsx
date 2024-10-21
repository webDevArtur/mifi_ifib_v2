import { useState } from "react";
import { AxiosError } from "axios";
import { Form, Input, Button, Checkbox, Alert } from "antd";
import { useFeedback } from "hooks/useFeedback";
import feedback from "./assets/feedback.png";
import styles from "./FeedbackSection.module.scss";

const { TextArea } = Input;

interface FeedbackData {
  name: string;
  phoneNumber: string;
  email: string;
  text: string;
  allowPersonalDataProcessing: boolean;
}

const FeedbackSection = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [form] = Form.useForm();

  const { mutate: feedbackMutation, isPending } = useFeedback();

  const handleSubmit = (values: FeedbackData) => {
    feedbackMutation(values, {
      onSuccess: () => {
        form.resetFields();
        setErrorMessage("");
        setSuccessMessage("Ваше обращение успешно отправлено!");
      },
      onError: (message) => {
        const errorData = message?.response?.data;

        if (errorData && typeof errorData === "object") {
          const errorMessages = Object.entries(errorData)
            .map(([field, errors]) => {
              if (Array.isArray(errors)) {
                return `${field}: ${errors.join(", ")}`;
              } else {
                return `${field}: ${errors}`;
              }
            })
            .join("\n");

          setErrorMessage(
            "Произошла ошибка при отправке обращения:" + "\n" + errorMessages,
          );
        } else {
          setErrorMessage("Произошла ошибка при отправке обращения.");
        }

        setSuccessMessage("");
      },
    });
  };

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.imageContainer}>
        <img src={feedback} alt="Envelope" />
      </div>

      <div className={styles.formContainer}>
        <h1 className={styles.title}>Обратная связь</h1>

        <p className={styles.description}>
          Есть вопросы или предложения по улучшению платформы?
        </p>
        <p className={styles.description}>
          Оставьте свою заявку и мы в скором времени свяжемся с Вами.
        </p>

        {successMessage && (
          <Alert
            style={{ marginTop: "20px", width: "94%" }}
            message={successMessage}
            type="success"
            showIcon
            closable
            onClose={() => setSuccessMessage("")}
          />
        )}

        {errorMessage && (
          <Alert
            style={{ marginTop: "20px", width: "94%", whiteSpace: "pre-wrap" }}
            message={errorMessage}
            type="error"
            showIcon
            closable
            onClose={() => setErrorMessage("")}
          />
        )}

        <Form
          form={form}
          name="feedback"
          layout="vertical"
          onFinish={handleSubmit}
        >
          <div className={styles.inputGroup}>
            <Form.Item
              className={styles.inputField}
              label="Имя"
              name="name"
              rules={[
                { required: true, message: "Пожалуйста, введите своё имя!" },
              ]}
            >
              <Input placeholder="Напишите своё имя" />
            </Form.Item>

            <Form.Item
              className={styles.inputField}
              label="Телефон"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите номер телефона!",
                },
                {
                  pattern: /^\d{10}$/,
                  message:
                    "Введите номер телефона без кода страны (10 цифр)",
                },
              ]}
            >
              <Input placeholder="(999) 999-99-99" />
            </Form.Item>

            <Form.Item
              className={styles.inputField}
              label="E-mail"
              name="email"
              rules={[
                { required: true, message: "Пожалуйста, введите ваш e-mail!" },
                { type: "email", message: "Введите корректный e-mail" },
              ]}
            >
              <Input placeholder="example@email.com" />
            </Form.Item>
          </div>

          <Form.Item
            label="Текст обращения"
            name="text"
            style={{ marginBottom: "30px" }}
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите текст обращения!",
              },
            ]}
          >
            <TextArea
              className={styles.textArea}
              rows={4}
              placeholder="Напишите текст обращения/вопрос"
            />
          </Form.Item>

          <Form.Item
            name="allowPersonalDataProcessing"
            valuePropName="checked"
            className={styles.checkbox}
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("Вы должны согласиться с условиями!"),
              },
            ]}
          >
            <div
              style={{ display: "flex", alignItems: "center", width: "80%" }}
            >
              <Checkbox />
              <span style={{ marginLeft: "8px" }}>
                Нажимая кнопку «Отправить», я даю согласие на обработку,
                передачу и хранение персональных данных
              </span>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              loading={isPending}
              type="primary"
              htmlType="submit"
              className={styles.submitButton}
            >
              Отправить
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FeedbackSection;
