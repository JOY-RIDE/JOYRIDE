import styles from './NoResults.module.scss';
import classNames from 'classnames/bind';
import { MdSearchOff } from 'react-icons/md';

const cn = classNames.bind(styles);

const NoResults = () => (
  <div className={cn('wrapper')}>
    <MdSearchOff />
    <h1 className={cn('title')}>검색 결과가 없습니다.</h1>
  </div>
);

export default NoResults;
