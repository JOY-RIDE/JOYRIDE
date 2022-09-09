import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useMatch } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { fetchCourses } from '../../apis/CrsAPI';
import queryString from 'query-string';
import styles from './Roads.module.scss';
import classNames from 'classnames/bind';
import PageTitle from 'components/common/PageTitle';
import Loading from 'components/common/Loading';
import CourseFilterToggleButton from 'components/roads/CourseFilterToggleButton';
import CourseFilterChoices from 'components/roads/CourseFilterChoices';
import SortBox from 'components/roads/SortBox';
import Paging from 'components/common/Paging';
import _ from 'lodash';
import { CoursePageState, courseFiltersState } from 'states/course';
import { stringifyCourseDifficulty } from 'utils/stringify';
import { stringifyCourseHours } from 'utils/stringify';
import { IRoad } from 'types/course';

const cn = classNames.bind(styles);

const Roads = () => {
  const { isLoading, data } = useQuery<IRoad[]>(['allCourses'], fetchCourses);
  const RoadsData = _.uniqBy(data, 'crsKorNm');

  let RoadsData1 = [...RoadsData];
  RoadsData1.sort((a, b) => (a.crsKorNm < b.crsKorNm ? -1 : 1));

  const resetFilters = useResetRecoilState(courseFiltersState);
  useEffect(() => resetFilters, []);

  const url = window.location.search;
  const query = queryString.parse(url);
  console.log(query.page);

  const reviewMatch = useMatch('roads/:roadId/review');

  const LIMIT = 5;
  const [page, setPage] = useRecoilState(CoursePageState);
  const offset = (page - 1) * LIMIT;

  return (
    <section className={styles.roads}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={cn('container')}>
          <PageTitle size="md">자전거 코스</PageTitle>
          <div className={cn('func')}>
            <div className={cn('filter-container')}>
              <div className={cn('filter')}>
                <CourseFilterToggleButton />
              </div>
              <CourseFilterChoices />
            </div>
            <SortBox />
            {/* <Sort
              sortOptionData={sortOptionData}
              setCurrentSort={setCurrentSort}
              currentSort={currentSort}
            /> */}
          </div>
          <ul className={cn('contents')}>
            {RoadsData1?.slice(offset, offset + LIMIT).map(road => (
              <li className={cn('content')} key={road.crsIdx}>
                <Link to={`${road.crsKorNm}`} state={{ name: road.crsKorNm }}>
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
                      <span className={cn('sigun')}>{road.sigun}</span>{' '}
                      <span className={cn('name')}>{road.crsKorNm}</span>
                    </p>
                    <p className={cn('info')}>
                      <span className={cn('dstnc')}>{road.crsDstnc}km </span>
                      <span className={cn('hour')}>
                        {stringifyCourseHours(road.crsTotlRqrmHour)}
                      </span>
                    </p>
                    <p className={cn('info2')}>
                      <span className={cn('level')}>
                        <span className={cn('type')}>난이도</span>{' '}
                        <span className={cn('value')}>
                          {stringifyCourseDifficulty(road.crsLevel)}
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
                </Link>
              </li>
            ))}
          </ul>
          {/* TODO url 페이지 파라미터 받아와서 처리 */}
          <Paging
            total={RoadsData1.length}
            limit={LIMIT}
            page={page}
            setPage={setPage}
          />
        </div>
      )}
    </section>
  );
};

export default Roads;
