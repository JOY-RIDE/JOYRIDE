import styles from './ComingSoon.module.scss';
import classNames from 'classnames/bind';
import { BsHourglassSplit } from 'react-icons/bs';

const cn = classNames.bind(styles);

const ComingSoon = () => (
  <section className={cn('wrapper')}>
    <BsHourglassSplit />
    <h1 className={cn('title')}>준비 중인 기능입니다.</h1>
  </section>
);

export default ComingSoon;
