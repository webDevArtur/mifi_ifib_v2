import { useState } from 'react';
import { Button, Input, Menu, Dropdown, Drawer } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined, MenuOutlined } from '@ant-design/icons';
import mifiLogo from './assets/mifiLogo.png';
import { useAuth } from 'hooks/AuthProvider';
import { UserMenu } from './components/UserMenu/UserMenu';

import styles from './Header.module.scss';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const menuItems1 = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/articles">Научно-популярные статьи</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/video-lectures">Видеолекции</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/podcasts">Подкасты</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/equipment">Оборудование ядерной медицины</Link>
      </Menu.Item>
    </Menu>
  );

  const menuItems2 = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/knowledge/radionuclidesDiagnosis">Радионуклидная диагностика и терапия</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/knowledge/radiationTherapy">Лучевая терапия</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/knowledge/ultraSoundDiagnosis">УЗИ</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/knowledge/mriDiagnosis">МРТ</Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="/knowledge/safety">Техника безопасности</Link>
      </Menu.Item>
      <Menu.Item key="6">
        <Link to="/knowledge/regulatoryDocuments">Нормативно-правовые документы</Link>
      </Menu.Item>
    </Menu>
  );

  const menuItems3 = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/virt-simulators">VERT</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/virtual-simulators">Виртуальные тренажеры ИФИБ</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/planning-systems">Система планирования</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/ultrasound">УЗИ</Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="/mpt">MPT</Link>
      </Menu.Item>
      <Menu.Item key="6">
        <Link to="/gamma-spectrometer">Гамма-спектрометр</Link>
      </Menu.Item>
      <Menu.Item key="7">
        <Link to="/biopac">Biopac</Link>
      </Menu.Item>
      <Menu.Item key="8">
        <Link to="/gate">GATE</Link>
      </Menu.Item>
      <Menu.Item key="9">
        <Link to="/monitor">Monitor</Link>
      </Menu.Item>
      <Menu.Item key="10">
        <Link to="/lingwaves">Lingwaves</Link>
      </Menu.Item>
    </Menu>
  );

  const menuItems4 = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/quest">Выбрать квест</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/user_rating">Рейтинг пользователей</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.headerLogo}>
          <img src={mifiLogo} alt="Logo" className={styles.logo} />
        </div>
      </Link>

      <nav className={styles.headerNav}>
        <Dropdown overlay={menuItems1}>
          <Link className={styles.navLink} to="/introduction">
            Введение в медицинскую физику
          </Link>
        </Dropdown>

        <Dropdown overlay={menuItems2}>
          <Link className={styles.navLink} to="/knowledge">
            База знаний
          </Link>
        </Dropdown>

        <Dropdown overlay={menuItems3}>
          <Link className={styles.navLink} to="#practicum">
            Практикум
          </Link>
        </Dropdown>

        <Dropdown overlay={menuItems4}>
          <Link className={styles.navLink} to="#quests">
            Квесты
          </Link>
        </Dropdown>
      </nav>

      <div className={styles.headerButtons}>
        <Input
          className={styles.headerSearch}
          placeholder="Поиск"
          prefix={<SearchOutlined />}
          bordered={false}
        />

        {isAuthenticated ? (
          <UserMenu isAuthenticated={isAuthenticated} logout={logout} />
        ) : (
          <Link to="/login">
            <Button className={styles.loginButton} type="primary">
              Войти
              <svg
                className={styles.loginButtonIcon}
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.6667 2.5H3.33333C2.59333 2.5 2 3.09333 2 3.83333V6.5H3.33333V3.83333H12.6667V13.1667H3.33333V10.5H2V13.1667C2 13.5203 2.14048 13.8594 2.39052 14.1095C2.64057 14.3595 2.97971 14.5 3.33333 14.5H12.6667C13.0203 14.5 13.3594 14.3595 13.6095 14.1095C13.8595 13.8594 14 13.5203 14 13.1667V3.83333C14 3.47971 13.8595 3.14057 13.6095 2.89052C13.3594 2.64048 13.0203 2.5 12.6667 2.5ZM6.72 10.8867L7.66667 11.8333L11 8.5L7.66667 5.16667L6.72 6.10667L8.44667 7.83333H2V9.16667H8.44667L6.72 10.8867Z"
                  fill="white"
                />
              </svg>
            </Button>
          </Link>
        )}

        <Button className={styles.menuButton} type="link" onClick={showDrawer} icon={<MenuOutlined />} />
      </div>

      <Drawer title="Меню" placement="right" onClose={closeDrawer} visible={drawerVisible}>
  <Menu mode="inline">
    <Menu.Item key="1" style={{ fontWeight: 'bold', paddingLeft: '5' }}>
      <Link to="/introduction">Введение в медицинскую физику</Link>
    </Menu.Item>
    
    <Menu.Item key="2" >
      <Link to="/articles">Научно-популярные статьи</Link>
    </Menu.Item>
    <Menu.Item key="3">
      <Link to="/video-lectures">Видеолекции</Link>
    </Menu.Item>
    <Menu.Item key="4">
      <Link to="/podcasts">Подкасты</Link>
    </Menu.Item>
    <Menu.Item key="5">
      <Link to="/equipment">Оборудование ядерной медицины</Link>
    </Menu.Item>

    <Menu.Item key="6" style={{ fontWeight: 'bold', paddingLeft: '5' }}>
      <Link to="/knowledge">База знаний</Link>
    </Menu.Item>
    <Menu.Item key="7">
      <Link to="/knowledge/radionuclidesDiagnosis">Радионуклидная диагностика и терапия</Link>
    </Menu.Item>
    <Menu.Item key="8">
      <Link to="/knowledge/radiationTherapy">Лучевая терапия</Link>
    </Menu.Item>
    <Menu.Item key="9">
      <Link to="/knowledge/ultraSoundDiagnosis">УЗИ</Link>
    </Menu.Item>
    <Menu.Item key="10">
      <Link to="/knowledge/mriDiagnosis">МРТ</Link>
    </Menu.Item>
    <Menu.Item key="11">
      <Link to="/knowledge/safety">Техника безопасности</Link>
    </Menu.Item>
    <Menu.Item key="12">
      <Link to="/knowledge/regulatoryDocuments">Нормативно-правовые документы</Link>
    </Menu.Item>

    <Menu.Item key="13"style={{ fontWeight: 'bold', paddingLeft: '5' }}>
      <Link to="/practicum">Практикум</Link>
    </Menu.Item>
    <Menu.Item key="14">
      <Link to="/virt-simulators">VERT</Link>
    </Menu.Item>
    <Menu.Item key="15">
      <Link to="/virtual-simulators">Виртуальные тренажеры ИФИБ</Link>
    </Menu.Item>
    <Menu.Item key="16">
      <Link to="/planning-systems">Система планирования</Link>
    </Menu.Item>
    <Menu.Item key="17">
      <Link to="/ultrasound">УЗИ</Link>
    </Menu.Item>

    <Menu.Item key="20" style={{ fontWeight: 'bold', paddingLeft: '5' }}>
      <Link to="/quest">Квест</Link>
    </Menu.Item>
    <Menu.Item key="18">
      <Link to="/quest">Выбрать квест</Link>
    </Menu.Item>
    <Menu.Item key="19">
      <Link to="/user_rating">Рейтинг пользователей</Link>
    </Menu.Item>
  </Menu>
</Drawer>

    </header>
  );
};

export default Header;
