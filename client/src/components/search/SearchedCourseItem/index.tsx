import styles from './SearchedCourseItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cn = classNames.bind(styles);

const SearchedCourseItem = ({ crsKorNm, image, crsContents }: any) => {
  return (
    <li className={cn('container')}>
      <Link to={`/roads/${crsKorNm}`}>
        <h1 className={cn('title')}>{crsKorNm}</h1>
        <p className={cn('content')}>{crsContents.replaceAll('<br>', ' ')}</p>
      </Link>

      <img className={cn('img')} src={image} alt={crsKorNm} />
    </li>
  );
};

export default SearchedCourseItem;
