import styles from './style.module.scss';
import Button from '../Button';
import UserCard from '../UserCard';
import Loader from 'react-ts-loaders';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useEffect } from 'react';
import { getUsers } from '../../store/reducers/UsersReducer/ActionCreators';
import { usersSlice } from '../../store/reducers/UsersReducer';
import { IUser } from '../../store/reducers/UsersReducer/Interfaces';

const GetRequest = () => {
  const dispatch = useAppDispatch();

  const { setPage } = usersSlice.actions;

  const users = useAppSelector<Array<IUser>>((state) => state.usersSlice.users);
  const page = useAppSelector<number>((state) => state.usersSlice.page);
  const count = useAppSelector<number>((state) => state.usersSlice.count);
  const isLastPage = useAppSelector<boolean>((state) => state.usersSlice.isLastPage);
  const isLoading = useAppSelector<boolean>((state) => state.usersSlice.isLoading);

  const getNewUsers = () => {
    dispatch(
      getUsers({
        page,
        count,
      }),
    ).then(() => {
      dispatch(setPage(page + 1)); // on next request we will take users from following page (1page, 2page...)
    });
  };

  useEffect(() => {
    getNewUsers();
  }, []);

  return (
    <section className={styles.getRequest + ' ' + 'section'}>
      <div className="container">
        <h2 className="title">Working with GET request</h2>
        {isLoading ? (
          <Loader type="ring" color="#00BDD3" size={150} />
        ) : (
          <div className={styles.getRequest__row}>
            {users.map((user) => {
              return (
                <UserCard
                  key={user.id}
                  avatar={user.photo}
                  mail={user.email}
                  name={user.name}
                  phone={user.phone}
                  position={user.position}
                />
              );
            })}
          </div>
        )}

        <Button text="Show more" onClick={getNewUsers} additionalClasses={isLastPage ? 'dn' : ''} />
      </div>
    </section>
  );
};

export default GetRequest;
