import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { fetchCourses, fetchCoursesFromServer } from '../../apis/CrsAPI';
import queryString from 'query-string';
import styles from './Roads.module.scss';
import classNames from 'classnames/bind';
import PageTitle from 'components/common/PageTitle';
import Loading from 'components/common/Loading';
import CourseFilterBoard from 'components/roads/CourseFilterBoard';
import ContentToggleButton from 'components/common/ContentToggleButton';
import CourseFilterChoices from 'components/roads/CourseFilterChoices';
import OrderList from 'components/roads/OrderList';
import CourseItem from 'components/roads/CourseItem';
import Paging from 'components/common/Paging';
import _ from 'lodash';
import { COURSE_ORDER_OPTIONS } from 'utils/constants';
import {
  CoursePageState,
  courseFiltersState,
  courseOrderState,
  courseBoardFiltersState,
} from 'states/course';
import { getCoursesOrderedBy } from 'utils/order';
import { COURSE_FILTERS_DISPATCHES } from 'utils/filter';
import { IRoad, ServerIRoads } from 'types/course';
import useClientFilter from 'hooks/useClientFilter';

const cn = classNames.bind(styles);

const Roads = () => {
  const { isLoading: isDurunubiLoading, data: durunubiData } = useQuery<
    ServerIRoads[]
  >(['allCourses'], fetchCourses);
  const RoadsData = _.uniqBy(durunubiData, 'crsKorNm');

  let newRoads = [...RoadsData];
  newRoads.sort((a, b) => (a.crsKorNm < b.crsKorNm ? -1 : 1));

  const { data: serverData } = useQuery<ServerIRoads[]>(
    ['serverCourses'],
    fetchCoursesFromServer
  );
  console.log(serverData);

  const { filters: boardFilters } = useClientFilter(
    courseBoardFiltersState,
    // @ts-ignore
    COURSE_FILTERS_DISPATCHES
  );

  const order = useRecoilValue(courseOrderState);
  const resetFilters = useResetRecoilState(courseFiltersState);
  const resetOrder = useResetRecoilState(courseOrderState);
  useEffect(() => resetFilters, []);
  useEffect(() => resetOrder, []);
  //   console.log(order.name);

  const LIMIT = 5;
  const [page, setPage] = useRecoilState(CoursePageState);
  const offset = (page - 1) * LIMIT;
  console.log(window.location.search);

  return (
    <section className={styles.roads}>
      {isDurunubiLoading ? (
        <Loading />
      ) : (
        <div className={cn('container')}>
          <PageTitle size="md">자전거 코스</PageTitle>
          <div className={cn('filter-order')}>
            {/* @ts-ignore */}
            <ContentToggleButton title="필터" Content={<CourseFilterBoard />} />
            <ContentToggleButton
              title={order.content}
              Content={
                // TODO
                // @ts-ignore
                <OrderList
                  options={COURSE_ORDER_OPTIONS}
                  // TODO
                  // @ts-ignore
                  recoilState={courseOrderState}
                />
              }
            />
          </div>
          <CourseFilterChoices />

          <div className={cn('contents')}>
            {getCoursesOrderedBy(order.name, newRoads)
              .slice(offset, offset + LIMIT)
              .map(road => (
                <CourseItem course={road} name={road.crsKorNm} />
              ))}
          </div>
          {/* TODO url 페이지 파라미터 받아와서 처리 */}
          <Paging
            total={newRoads.length}
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
