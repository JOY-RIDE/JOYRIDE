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
  name: string;
}

const CourseItem = memo(({ course, name }: CourseItemProp) => (
  <Link
    to={`/roads/${course.crsKorNm}`}
    className={cn('link')}
    state={{ name: name }}
  >
    <article className={cn('course')}>
      {/* 사진 있을시
                  <div className={cn('top')}>
                    <img
                      className={cn('image')}
                      src="https://images.unsplash.com/photo-1559235270-2df4dcfb4eca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
                      alt="cycling"
                    />
                  </div> */}
      <div className={cn('bottom')}>
        <p className={cn('title')}>
          <span className={cn('sigun')}>{course.sigun}</span>{' '}
          <span className={cn('name')}>{course.crsKorNm}</span>
        </p>
        <p className={cn('info')}>
          <span className={cn('dstnc')}>{course.crsDstnc}km </span>
          <span className={cn('hour')}>
            {stringifyCourseHours(course.crsTotlRqrmHour)}
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
            <span className={cn('value')}>4.5</span>
          </span>
          ·
          <span className={cn('likes')}>
            <span className={cn('type')}>♥</span>{' '}
            <span className={cn('value')}>12</span>
          </span>
        </p>
      </div>
    </article>
  </Link>
));

export default CourseItem;
