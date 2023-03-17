import styles from './style.module.scss';
import avatarDelete from './../../assets/images/photo-cover.svg';
import { FC, useEffect, useRef } from 'react';
import Tippy from '@tippyjs/react';

interface IUserCard {
  avatar: string;
  name: string;
  position: string;
  mail: string;
  phone: string;
}

const UserCard: FC<IUserCard> = ({ avatar, mail, name, phone, position }) => {
  return (
    <div className={styles.card}>
      <p className={styles.card__img}>
        <img src={avatar || avatarDelete} alt="avatar" />
      </p>
      <p className={styles.card__name + ' ' + 'cutWithDots'}>{name}</p>
      <p className={styles.card__position + ' ' + 'cutWithDots'}>{position}</p>
      <Tippy content={<div className="tooltip"> {mail}</div>} placement="bottom">
        <p className={styles.card__mail + ' ' + 'cutWithDots'}>{mail}</p>
      </Tippy>
      <p className={styles.card__phone + ' ' + 'cutWithDots'}>{phone}</p>
    </div>
  );
};

export default UserCard;
