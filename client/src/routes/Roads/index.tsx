import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import {
  fetchCourses,
  fetchCoursesFromServer,
  fetchFilteredCourses,
} from '../../apis/coursesAPI';
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
  courseFiltersState,
  courseOrderState,
  courseBoardFiltersState,
} from 'states/course';
import { getCoursesOrderedBy } from 'utils/order';
import { COURSE_FILTERS_DISPATCHES } from 'utils/filter';
import { IRoad, ServerIRoads } from 'types/course';
import useFilter from 'hooks/common/useFilter';
import NoResults from 'components/common/NoResults';

const cn = classNames.bind(styles);

const Roads = () => {
  //   const { isLoading: isDurunubiLoading, data: durunubiData } = useQuery<
  //     ServerIRoads[]
  //   >(['allCourses'], fetchCourses);
  //   const RoadsData = _.uniqBy(durunubiData, 'crsKorNm');

  //   let newRoads = [...RoadsData];
  //   newRoads.sort((a, b) => (a.crsKorNm < b.crsKorNm ? -1 : 1));

  const filters = useRecoilValue(courseFiltersState);
  const order = useRecoilValue(courseOrderState);

  const { isLoading: isServerLoading, data: roads } = useQuery<ServerIRoads[]>(
    ['serverCourses', filters],
    () => fetchCoursesFromServer(filters),
    {
      select: data => {
        const roads = [..._.uniqBy(data, 'crsKorNm')];
        roads.sort((a, b) => (a.crsKorNm < b.crsKorNm ? -1 : 1));
        return getCoursesOrderedBy(order.name, roads);
      },
    }
  );

  // const serverRoads = _.uniqBy(serverData, 'crsKorNm');
  // let tmp = [...serverRoads];
  // tmp.sort((a, b) => (a.crsKorNm < b.crsKorNm ? -1 : 1));

  // const filterLocation = filters?.location?.value;
  // const filterLevel = filters?.pathDifficulty?.value;
  // const { data: filteredData } = useQuery<ServerIRoads[]>(
  //   ['filteredCourses', filterLevel, filterLocation],
  //   () => fetchFilteredCourses(filterLevel, filterLocation)
  // );
  // console.log(filteredData);

  const resetFilters = useResetRecoilState(courseFiltersState);
  const resetOrder = useResetRecoilState(courseOrderState);
  useEffect(() => resetFilters, []);
  useEffect(() => resetOrder, []);
  //   console.log(order.name);

  useEffect(() => {
    window.scrollY && window.scrollTo({ top: 0 });
  }, []);

  const LIMIT = 5;
  const [page, setPage] = useState(
    Number(useSearchParams()[0].get('page')) || 1
  );
  const offset = (page - 1) * LIMIT;

  useEffect(() => setPage(1), [filters, order.name]);

  return (
    <section className={styles.roads}>
      <div className={cn('container')}>
        <PageTitle size="md">자전거 코스</PageTitle>
        <div className={cn('filter-order')}>
          {/* @ts-ignore */}
          {/* <ContentToggleButton title="필터" Content={<CourseFilterBoard />} /> */}
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
        {/* <CourseFilterChoices /> */}
        {isServerLoading ? (
          <Loading />
        ) : (
          <>
            <div className={cn('contents')}>
              {/* {boardFilters ? (
                <>
                  {filteredData?.slice(offset, offset + LIMIT).map(road => (
                    <CourseItem course={road} />
                  ))}
                </>
              ) : (
                <> */}

              {roads?.length ? (
                roads
                  .slice(offset, offset + LIMIT)
                  .map((road: ServerIRoads) => (
                    <CourseItem key={road.id} course={road} />
                  ))
              ) : (
                <NoResults />
              )}
            </div>

            {!!roads?.length && (
              <Paging
                total={roads.length}
                limit={LIMIT}
                page={page}
                setPage={setPage}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Roads;
