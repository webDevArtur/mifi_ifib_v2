import { Link, useParams, useNavigate } from "react-router-dom";
import { Typography, Button, Input, Alert } from "antd";
import { useEffect, useState } from "react";

import {
  useConfirmRegistration,
  useResendConfirmationCode,
} from "hooks/useRegistration";
import styles from "./ConfirmationPage.module.scss";

const { Title, Paragraph } = Typography;

const ConfirmationPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [confirmationCode, setConfirmationCode] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasAutoSent, setHasAutoSent] = useState(false);
  const { mutate: confirm, isPending } = useConfirmRegistration();
  const { mutate: resend } = useResendConfirmationCode();

  useEffect(() => {
    if (countdown > 0 && isTimerActive) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsTimerActive(false);
    }
  }, [countdown, isTimerActive]);

  const handleResend = async () => {
    if (!token) {
      setErrorMessage("Token is missing. Please try again.");
      return;
    }

    await resend({ register_token: token }, {
      onSuccess: () => {
        setErrorMessage("");
        setCountdown(60);
        setIsTimerActive(true);
      },
      onError: () => {
        setErrorMessage("");
      }
    });
  };

  useEffect(() => {
    if (token && !hasAutoSent) {
      setHasAutoSent(true);
      handleResend();
    } else if (!token) {
      setErrorMessage("Token is missing. Please try again.");
    }
  }, [token, hasAutoSent]);

  const handleConfirm = async () => {
    if (!token) {
      setErrorMessage("Token is missing. Please try again.");
      return;
    }

    confirm(
      { confirmationCode: confirmationCode },
      {
        onSuccess: () => {
          setErrorMessage("");
          navigate("/");
        },
        onError: () => {
          setErrorMessage(
            "Неправильный код подтверждения. Пожалуйста, попробуйте снова.",
          );
        },
      },
    );
  };

  return (
    <div className={styles.registrationContainer}>
      <div className={styles.registrationCard}>
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

        <Title className={styles.registrationTitle} level={2}>
          Введите код подтверждения
        </Title>

        <Paragraph className={styles.confirmationMessage}>
          Мы отправили вам письмо для подтверждения. Пожалуйста, проверьте свою
          почту и следуйте инструкциям.
        </Paragraph>

        {errorMessage && (
          <Alert message={errorMessage} type="error" showIcon />
        )}

        <Input
          className={styles.codeInput}
          size="large"
          placeholder="Код подтверждения"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleConfirm();
            }
          }}
        />

        <Button
          type="primary"
          htmlType="submit"
          className={styles.submitButton}
          onClick={handleConfirm}
          disabled={!confirmationCode}
          loading={isPending}
        >
          Подтвердить
        </Button>

        <Button
          className={styles.resendButton}
          onClick={handleResend}
          disabled={isTimerActive}
        >
          {isTimerActive
            ? `Повторно отправить письмо (${countdown}s)`
            : "Повторно отправить письмо"}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
