import styles from './Error404.module.scss';
import classNames from 'classnames/bind';
import { TbFaceIdError } from 'react-icons/tb';

const cn = classNames.bind(styles);

const Error404 = () => (
  <section className={cn('wrapper')}>
    <TbFaceIdError />
    <h1 className={cn('title')}>존재하지 않는 페이지입니다.</h1>
  </section>
);

export default Error404;
