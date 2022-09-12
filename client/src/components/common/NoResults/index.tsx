import styles from './NoResults.module.scss';
import classNames from 'classnames/bind';
import { BsExclamationCircle } from 'react-icons/bs';

const cn = classNames.bind(styles);

interface NoResultsProp {
  content: string;
}

// TODO: refactor
const NoResults = ({ content }: NoResultsProp) => (
  <div className={cn('wrapper')}>
    <BsExclamationCircle />
    <h1 className={cn('title')}>{content}</h1>
  </div>
);

export default NoResults;
