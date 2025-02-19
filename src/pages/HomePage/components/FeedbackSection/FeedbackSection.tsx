import { useState } from "react";
import { Form, Input, Button, Checkbox, Alert } from "antd";
import { useFeedback } from "hooks/useFeedback";
import feedback from "./assets/feedback.png";
import styles from "./FeedbackSection.module.scss";

const { TextArea } = Input;

const baseUrl = import.meta.env.VITE_BASE_URL;

interface FeedbackData {
  name: string;
  phoneNumber: string;
  email: string;
  text: string;
  allowPersonalDataProcessing: boolean;
}

const FeedbackSection = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);

  const { mutate: feedbackMutation, isPending } = useFeedback();

  const handleSubmit = (values: FeedbackData) => {
    setSubmitted(true);

    const phoneNumberWithoutPrefix = values.phoneNumber.slice(2);

    const submissionData = {
      ...values,
      phoneNumber: phoneNumberWithoutPrefix,
    };

    feedbackMutation(submissionData, {
      onSuccess: () => {
        form.resetFields();
        setSuccessMessage("Ваше обращение успешно отправлено!");
        setSubmitted(false);
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

          setSuccessMessage("");
        } else {
          setSuccessMessage("Произошла ошибка при отправке обращения.");
        }
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
                {
                  validator: (_, value) => {
                    if (submitted) {
                      if (!value) {
                        return Promise.reject(
                          "Поле обязательно для заполнения",
                        );
                      } else if (!/^[А-Яа-яЁёA-Za-z\s-]+$/.test(value)) {
                        return Promise.reject(
                          "Введите корректное имя (только буквы, пробелы и дефисы)",
                        );
                      }
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="Напишите своё имя" />
            </Form.Item>

            <Form.Item
              className={styles.inputField}
              label="Телефон"
              name="phoneNumber"
              initialValue="+7"
              rules={[
                {
                  validator: (_, value) => {
                    if (submitted) {
                      if (
                        !value ||
                        value.length < 12 ||
                        !/^\+7\d{10}$/.test(value)
                      ) {
                        return Promise.reject(
                          "Поле обязательно для заполнения",
                        );
                      }
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                maxLength={12}
                onChange={(e) => {
                  const inputValue = e.target.value;

                  if (inputValue.startsWith("+7")) {
                    const digitsOnly = inputValue.slice(2).replace(/\D/g, "");

                    if (digitsOnly.length <= 10) {
                      form.setFieldsValue({ phoneNumber: `+7${digitsOnly}` });
                    }
                  } else {
                    form.setFieldsValue({ phoneNumber: "+7" });
                  }
                }}
                value={form.getFieldValue("phoneNumber") || "+7"}
                onFocus={(e) => {
                  const value = e.target.value;
                  if (value === "+7") {
                    e.target.setSelectionRange(2, 2);
                  } else if (value.startsWith("+7")) {
                    e.target.setSelectionRange(2, value.length);
                  }
                }}
              />
            </Form.Item>

            <Form.Item
              className={styles.inputField}
              label="E-mail"
              name="email"
              rules={[
                {
                  validator: (_, value) => {
                    if (submitted && !value) {
                      return Promise.reject("Поле обязательно для заполнения");
                    } else if (
                      submitted &&
                      value &&
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                    ) {
                      return Promise.reject(
                        "Введите e-mail в формате example@email.com",
                      );
                    }
                    return Promise.resolve();
                  },
                },
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
                validator: (_, value) => {
                  if (submitted && !value) {
                    return Promise.reject("Поле обязательно для заполнения");
                  }
                  return Promise.resolve();
                },
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
                  submitted && !value
                    ? Promise.reject(
                        "Вы должны согласиться с условиями обработки персональных данных!",
                      )
                    : Promise.resolve(),
              },
            ]}
          >
            <div
              style={{ display: "flex", alignItems: "center", width: "80%" }}
            >
              <Checkbox />
              <span style={{ marginLeft: "8px" }}>
                Нажимая кнопку «Отправить», я даю согласие на{" "}
                <a className={styles.docLink} href={`${baseUrl}static/docs/privacy.pdf`} target="_blank" rel="noopener noreferrer">
                  обработку, передачу и хранение персональных данных
                </a>
              </span>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              loading={isPending}
              type="primary"
              htmlType="submit"
              className={styles.submitButton}
              onClick={() => setSubmitted(true)}
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
