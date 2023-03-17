import { useAppSelector } from '../../hooks/hooks';
import PostRequestForm from './PostRequestForm';
import styles from './style.module.scss';
import success from './../../assets/images/success-image.svg';

const PostRequest = () => {
  const isUserAuth = useAppSelector((state) => state.usersSlice.isUserAuth);

  return (
    <section className={styles.postRequest + ' ' + 'section'}>
      <div className="container">
        {!isUserAuth ? (
          <>
            <h2 className="title">Working with POST request</h2>
            <PostRequestForm />
          </>
        ) : (
          <div className="ta-c">
            <h2 className="title">User successfully registered</h2>
            <div>
              <img src={success} alt="success" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PostRequest;
