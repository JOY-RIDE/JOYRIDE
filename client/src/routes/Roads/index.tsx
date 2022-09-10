import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useMatch } from 'react-router-dom';
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
} from 'states/course';
import { getCoursesOrderedBy } from 'utils/order';
import { IRoad, ServerIRoads } from 'types/course';

const cn = classNames.bind(styles);

const Roads = () => {
  const { isLoading: isDurunubiLoading, data: durunubiData } = useQuery<
    ServerIRoads[]
  >('allCourses', fetchCourses);
  const RoadsData = _.uniqBy(durunubiData, 'crsKorNm');

  let newRoads = [...RoadsData];
  newRoads.sort((a, b) => (a.crsKorNm < b.crsKorNm ? -1 : 1));

  const { data: serverData } = useQuery<ServerIRoads[]>(
    'serverCourses',
    fetchCoursesFromServer
  );
  console.log(serverData);

  const order = useRecoilValue(courseOrderState);
  const [roads, setRoads] = useState(newRoads);
  useEffect(
    () => setRoads(roads => getCoursesOrderedBy(order.name, roads)),
    [order.name]
  );
  const resetFilters = useResetRecoilState(courseFiltersState);
  const resetOrder = useResetRecoilState(courseOrderState);
  useEffect(() => resetFilters, []);
  useEffect(() => resetOrder, []);
  console.log(order.name);

  const url = window.location.search;
  const query = queryString.parse(url);
  console.log(query.page);

  const LIMIT = 5;
  const [page, setPage] = useRecoilState(CoursePageState);
  const offset = (page - 1) * LIMIT;

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
            {roads?.slice(offset, offset + LIMIT).map(road => (
              <CourseItem course={road} name={road.crsKorNm} />
            ))}
          </div>
          {/* TODO url 페이지 파라미터 받아와서 처리 */}
          <Paging
            total={roads.length}
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
