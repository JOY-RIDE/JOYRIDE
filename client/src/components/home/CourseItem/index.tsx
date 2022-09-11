import styles from './CourseItem.module.scss';
import { ServerIRoads } from 'types/course';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { stringifyCourseDifficulty } from 'utils/stringify';

const cn = classNames.bind(styles);

interface CourseItemProp {
  course: ServerIRoads;
  index: number;
}

const CourseItem = ({ course, index }: CourseItemProp) => {
  return (
    <Link to={`/roads/${course.crsKorNm}`}>
      <div className={styles.course}>
        <div className={cn('rank')}>{index + 1}</div>
        <div className={cn('info')}>
          <p className={cn('top')}>
            <span className={cn('sigun')}>{course.sigun}</span>{' '}
            <span className={cn('title')}>{course.crsKorNm}</span>
          </p>
          <p className={cn('bottom')}>
            <span className={cn('level')}>
              <span className={cn('type')}>난이도</span>{' '}
              <span className={cn('value')}>
                {stringifyCourseDifficulty(course.crsLevel)}
              </span>
            </span>{' '}
            ·{' '}
            <span className={cn('rate')}>
              <span className={cn('type')}>♥</span>{' '}
              <span className={cn('value')}>{course.likeCount}</span>
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CourseItem;
