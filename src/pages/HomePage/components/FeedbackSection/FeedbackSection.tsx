import styles from './FeedbackSection.module.scss';
import { Input } from 'antd';
import feedback from './assets/feedback.png';

const { TextArea } = Input;

const FeedbackSection = () => {
  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.imageContainer}>
        <img src={feedback} style={{ filter: '' }} alt="Envelope" />
      </div>

      <div className={styles.formContainer}>
        <h1 className={styles.title}>Обратная связь</h1>

        <p className={styles.description}>
          Есть вопросы или предложения по улучшению платформы?
        </p>

        <p className={styles.description}>
          Оставьте свою заявку и мы в скором времени свяжемся с Вами.
        </p>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <div className={styles.inputField}>
              <label htmlFor="name">Имя *</label>

              <input type="text" id="name" placeholder="Напишите своё имя" />
            </div>

            <div className={styles.inputField}>
              <label htmlFor="phone">Телефон *</label>

              <input type="text" id="phone" placeholder="+7 (999) 999-99-99" />
            </div>

            <div className={styles.inputField}>
              <label htmlFor="email">E-mail *</label>

              <input type="email" id="email" placeholder="example@email.com" />
            </div>
          </div>

          <div className={styles.textAreaField}>
            <label htmlFor="message">Текст обращения *</label>

            <TextArea
              className={styles.textArea}
              id="message"
              placeholder="Напишите текст обращения/вопрос"
              rows={4}
            />
          </div>

          <div className={styles.checkboxField}>
            <input type="checkbox" id="accept" />

            <p className={styles.footerText}>
              Нажимая кнопку «Отправить», я даю согласие на обработку, передачу
              и хранение персональных данных
            </p>
          </div>

          <button type="submit" className={styles.submitButton}>
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackSection;
