import { FC } from 'react';
import styles from './style.module.scss';

interface IButton {
  text: string;
  additionalClasses?: string;
  onClick?: (data: any) => void;
}

const Button: FC<IButton> = ({ text, additionalClasses = '', onClick = () => {} }) => {
  return (
    <button className={`${styles.button} ${additionalClasses}`} onClick={onClick} type="button">
      {text}
    </button>
  );
};

export default Button;
