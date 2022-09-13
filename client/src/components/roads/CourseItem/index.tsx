import { memo } from 'react';
import { ServerIRoads } from 'types/course';
import { Link } from 'react-router-dom';
import styles from './CourseItem.module.scss';
import classNames from 'classnames/bind';
import {
  stringifyCourseDifficulty,
  stringifyCourseHours,
} from 'utils/stringify';

const cn = classNames.bind(styles);

interface CourseItemProp {
  course: ServerIRoads;
}

const CourseItem = memo(({ course }: CourseItemProp) => (
  <Link
    to={`/roads/${course.crsKorNm}`}
    className={cn('link')}
    state={{ lat: course.latitude, lng: course.longitude }}
  >
    <article className={cn('course')}>
      <div className={cn('top')}>
        <img className={cn('image')} src={course.image} alt="코스 이미지" />
      </div>
      <div className={cn('bottom')}>
        <p className={cn('title')}>
          <span className={cn('sigun')}>{course.sigun}</span>{' '}
          <span className={cn('name')}>{course.crsKorNm}</span>
        </p>
        <p className={cn('info')}>
          <span className={cn('dstnc')}>{course.crsDstnc}km </span>
          <span className={cn('hour')}>
            {stringifyCourseHours(course.required_at)}
          </span>
        </p>
        <p className={cn('info2')}>
          <span className={cn('level')}>
            <span className={cn('type')}>난이도</span>{' '}
            <span className={cn('value')}>
              {stringifyCourseDifficulty(course.crsLevel)}
            </span>
          </span>
          ·
          <span className={cn('rate')}>
            <span className={cn('type')}>평점</span>{' '}
            <span className={cn('value')}>{course.totalRate}</span>
          </span>
          ·
          <span className={cn('likes')}>
            <span className={cn('type')}>♥</span>{' '}
            <span className={cn('value')}>{course.likeCount}</span>
          </span>
        </p>
      </div>
    </article>
  </Link>
));

export default CourseItem;
