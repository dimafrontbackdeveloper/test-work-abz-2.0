import styles from './style.module.scss';
import Button from '../Button';

const Intro = () => {
  return (
    <section className={styles.intro + ' ' + 'section'}>
      <div className={styles.intro__container}>
        <div className="container">
          <div className={styles.intro__block}>
            <h1 className="title">Test assignment for front-end developer</h1>
            <p>
              What defines a good front-end developer is one that has skilled knowledge of HTML,
              CSS, JS with a vast understanding of User design thinking as they'll be building web
              interfaces with accessibility in mind. They should also be excited to learn, as the
              world of Front-End Development keeps evolving.
            </p>
            <Button text="Sign up" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
