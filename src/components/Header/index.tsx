import logo from './../../assets/images/Logo.svg';
import Button from '../Button';
import styles from './style.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__row + ' ' + 'd-f jc-sb'}>
          <div className={styles.header__left}>
            <a href="#">
              <img src={logo} alt="logo" />
            </a>
          </div>
          <div className={styles.header__right + ' ' + 'd-f ai-c'}>
            <Button text="Users" />
            <Button text="Sign up" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
