import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Select, DatePicker } from 'antd';
import styles from './RegistrationPage.module.scss';

const { Option } = Select;

const RegistrationPage = () => {
  const [status, setStatus] = useState('');

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log('Form Submitted:', values);
  };

  return (
    <div className={styles.registrationContainer}>
      <div className={styles.registrationCard}>
        <Link to="/" className={styles.backLink}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.33325 8.00065C1.33325 6.23254 2.03563 4.53685 3.28587 3.28661C4.53612 2.03636 6.23181 1.33398 7.99992 1.33398C8.8754 1.33398 9.7423 1.50642 10.5511 1.84145C11.36 2.17649 12.0949 2.66755 12.714 3.28661C13.333 3.90566 13.8241 4.64059 14.1591 5.44943C14.4941 6.25827 14.6666 7.12517 14.6666 8.00065C14.6666 9.76876 13.9642 11.4645 12.714 12.7147C11.4637 13.9649 9.76803 14.6673 7.99992 14.6673C7.12444 14.6673 6.25753 14.4949 5.4487 14.1598C4.63986 13.8248 3.90493 13.3338 3.28587 12.7147C2.03563 11.4645 1.33325 9.76876 1.33325 8.00065ZM11.9999 7.33398H6.66658L8.99992 5.00065L8.05325 4.05398L4.10659 8.00065L8.05325 11.9473L8.99992 11.0007L6.66658 8.66732H11.9999V7.33398Z" fill="white"/>
          </svg>

          На главную
        </Link>

        <h2 className={styles.registrationTitle}>Регистрация</h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className={styles.registrationForm}
        >
        <Form.Item
            label={
              <span>
                Фамилия<span className={styles.requiredStar}>*</span>
              </span>
            }
            name="surname"
            rules={[{ message: 'Введите вашу фамилию' }]}
            className={styles.inputItem}
          >
            <Input placeholder="Введите вашу фамилию" />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Имя<span className={styles.requiredStar}>*</span>
              </span>
            }
            name="name"
            rules={[{ message: 'Введите ваше имя' }]}
            className={styles.inputItem}
          >
            <Input placeholder="Введите ваше имя" />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Отчество<span className={styles.requiredStar}>*</span>
              </span>
            }
            name="patronymic"
            rules={[{ message: 'Введите ваше отчество' }]}
            className={styles.inputItem}
          >
            <Input placeholder="Введите ваше отчество" />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Дата рождения<span className={styles.requiredStar}>*</span>
              </span>
            }
            name="birthdate"
            className={styles.inputItem}
          >
            <DatePicker placeholder="__.__.____" format="DD.MM.YYYY" showToday={false} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Номер телефона<span className={styles.requiredStar}>*</span>
              </span>
            }
            name="phone"
            rules={[{ message: 'Введите номер телефона' }]}
            className={styles.inputItem}
          >
            <Input placeholder="+7(999)99-99-99" />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Почта<span className={styles.requiredStar}>*</span>
              </span>
            }
            name="email"
            rules={[{ message: 'Введите почту' }]}
            className={styles.inputItem}
          >
            <Input placeholder="example@email.com" />
          </Form.Item>

          <Form.Item
            label={
              <span>
                VK/Telegram<span className={styles.requiredStar}>*</span>
              </span>
            }
            name="social"
            rules={[{ message: 'Введите ссылку на VK/Telegram' }]}
            className={styles.inputItem}
          >
            <Input placeholder="Вставьте ссылку на ваш VK/Telegram" />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Место учёбы/работы<span className={styles.requiredStar}>*</span>
              </span>
            }
            name="workplace"
            rules={[{ message: 'Введите место учёбы/работы' }]}
            className={styles.inputItem}
          >
            <Input placeholder="Введите ваше место учёбы/работы" />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Статус на платформе<span className={styles.requiredStar}>*</span>
              </span>
            }
            name="status"
            rules={[{ message: 'Выберите статус на платформе' }]}
            className={styles.inputItem}
          >
            <Select placeholder="Выберите статус" onChange={handleStatusChange}>
              <Option value="schoolboy">Школьник</Option>
              <Option value="teacher">Преподаватель</Option>
              <Option value="student">Студент</Option>
            </Select>
          </Form.Item>

          {status && (
            <Form.Item
              label={
                <span>
                  {status === 'schoolboy'
                    ? 'Класс'
                    : status === 'teacher'
                    ? 'Должность'
                    : 'Курс'}
                  <span className={styles.requiredStar}>*</span>
                </span>
              }
              name="class"
              rules={[{ message: 'Введите информацию' }]}
              className={styles.inputItem}
            >
              <Input placeholder={`Введите ваш(у) ${status === 'schoolboy' ? 'класс' : status === 'teacher' ? 'должность' : 'курс'}`} />
            </Form.Item>
          )}

          <Form.Item
            label={
              <span>
                Сфера интересов<span className={styles.requiredStar}>*</span>
              </span>
            }
            name="interests"
            rules={[{ message: 'Выберите сферу интересов' }]}
            className={styles.inputItem}
          >
            <Select placeholder="Выберите сферу интересов">
              <Option value="science">Наука</Option>
              <Option value="technology">Технологии</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            className={styles.inputItem}
          >
            <Checkbox required>
              <div className={styles.checkboxBlock}>
                Нажимая кнопку «Зарегистрироваться», я даю согласие на <span className={styles.dataAllow}>обработку, передачу и хранение персональных данных</span>
              </div>
            </Checkbox>
          </Form.Item>

          <Form.Item className={styles.inputItem}>
            <Button type="primary" htmlType="submit" className={styles.submitButton}>
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>


        <div className={styles.loginLink}>
          Есть аккаунт? <Link to="/login">Войти</Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
