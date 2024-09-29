import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Select, DatePicker } from 'antd';
import { useRegister } from 'hooks/useRegistration';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import styles from './RegistrationPage.module.scss';

const { Option } = Select;

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [educationalStatus, setEducationalStatus] = useState<string | null>(
    null
  );
  const { mutate: register, isPending } = useRegister();

  const handleSubmit = async (values: any) => {
    const registerData = {
      lastName: values.lastName,
      firstName: values.firstName,
      middleName: values.middleName || null,
      birthDate: values.birthdate.format('DD.MM.YYYY'),
      email: values.email,
      socialNetwork: values.social,
      educationalStatus: values.educationalStatus,
      educationalFacility: values.workplace || null,
      sphereOfInterest: values.interests,
      password: values.password,
      passwordConfirmation: values.passwordConfirmation,
    };

    register(registerData, {
      onSuccess: (data) => {
        if (data.token) {
          navigate(`confirmation/${data.token}`);
        }
      },
      onError: (error) => {
        console.error('Registration failed:', error);
      },
    });
  };

  const handleEducationalStatusChange = (value: string) => {
    setEducationalStatus(value);
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
            name="lastName"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        'Поле "Фамилия" обязательно для заполнения'
                      ),
              },
            ]}
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
            name="firstName"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject('Поле "Имя" обязательно для заполнения'),
              },
            ]}
            className={styles.inputItem}
          >
            <Input placeholder="Введите ваше имя" />
          </Form.Item>

          <Form.Item
            label={<span>Отчество</span>}
            name="middleName"
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
            rules={[
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.reject(
                      'Поле "Дата рождения" обязательно для заполнения'
                    );
                  }

                  const today = dayjs();
                  const sixYearsAgo = today.subtract(6, 'year');

                  if (value.isAfter(today) || value.isAfter(sixYearsAgo)) {
                    return Promise.reject('Вы должны быть старше 6 лет');
                  }

                  return Promise.resolve();
                },
              },
            ]}
          >
            <DatePicker
              placeholder="__.__.____"
              format="DD.MM.YYYY"
              showToday={false}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <hr style={{ border: '1px solid #E3E3E3' }} />

          <Form.Item
            label={
              <span>
                Почта<span className={styles.requiredStar}>*</span>
              </span>
            }
            name="email"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject('Поле "Почта" обязательно для заполнения'),
              },
              { type: 'email', message: 'Некорректный формат почты' },
            ]}
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
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        'Поле "VK/Telegram" обязательно для заполнения'
                      ),
              },
            ]}
            className={styles.inputItem}
          >
            <Input placeholder="Вставьте ссылку на ваш VK/Telegram" />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Чем вы занимаетесь по жизни
                <span className={styles.requiredStar}>*</span>
              </span>
            }
            name="educationalStatus"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        'Поле "Чем вы занимаетесь по жизни" обязательно для заполнения'
                      ),
              },
            ]}
            className={styles.inputItem}
          >
            <Select
              placeholder="Выберите ваш статус"
              onChange={handleEducationalStatusChange}
            >
              <Option value="school_student">Учусь в школе</Option>

              <Option value="university_student">Учусь в вузе</Option>
            </Select>
          </Form.Item>

          {(educationalStatus === 'school_student' ||
            educationalStatus === 'university_student') && (
            <Form.Item
              label={
                <span>
                  Место учёбы<span className={styles.requiredStar}>*</span>
                </span>
              }
              name="workplace"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          'Поле "Место учёбы" обязательно для заполнения'
                        ),
                },
              ]}
              className={styles.inputItem}
            >
              <Input placeholder="Введите ваше место учебы" />
            </Form.Item>
          )}

          <Form.Item
            label={
              <span>
                Сфера интересов<span className={styles.requiredStar}>*</span>
              </span>
            }
            name="interests"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        'Поле "Сфера интересов" обязательно для заполнения'
                      ),
              },
            ]}
            className={styles.inputItem}
          >
            <Select placeholder="Выберите сферу интересов">
              <Option value="science">Наука</Option>
              <Option value="it">Программирование</Option>
            </Select>
          </Form.Item>

          <hr style={{ border: '1px solid #E3E3E3' }} />

          <Form.Item
            label={
              <span>
                Пароль<span className={styles.requiredStar}>*</span>
              </span>
            }
            name="password"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        'Поле "Пароль" обязательно для заполнения'
                      ),
              },
              { min: 6, message: 'Пароль должен содержать минимум 6 символов' },
            ]}
            className={styles.inputItem}
          >
            <Input.Password placeholder="Введите ваш пароль" />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Подтверждение пароля
                <span className={styles.requiredStar}>*</span>
              </span>
            }
            name="passwordConfirmation"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        'Поле "Подтверждение пароля" обязательно для заполнения'
                      ),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают'));
                },
              }),
            ]}
            className={styles.inputItem}
          >
            <Input.Password placeholder="Подтвердите ваш пароль" />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            className={styles.inputItem}
          >
            <div className={styles.checkboxBlock}>
              <Checkbox required />
              <div className={styles.checkboxTextBlock}>
                Нажимая кнопку «Зарегистрироваться», я даю согласие на{' '}
                <span className={styles.dataAllow}>
                  обработку, передачу и хранение персональных данных
                </span>
              </div>
            </div>
          </Form.Item>

          <Form.Item className={styles.inputItem}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.submitButton}
              loading={isPending}
            >
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
