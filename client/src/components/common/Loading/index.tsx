import { GiCartwheel } from 'react-icons/gi';
import styles from './Loading.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const Loading = () => {
  return (
    <section className={styles.loading}>
      <GiCartwheel className={cn('wheel')}></GiCartwheel>
    </section>
  );
};

export default Loading;
