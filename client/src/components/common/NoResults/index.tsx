import styles from './NoResults.module.scss';
import classNames from 'classnames/bind';
import { BsExclamationCircle } from 'react-icons/bs';

const cn = classNames.bind(styles);

const NoResults = () => (
  <div className={cn('wrapper')}>
    <BsExclamationCircle />
    <h1 className={cn('title')}>검색 결과가 없습니다.</h1>
  </div>
);

export default NoResults;
