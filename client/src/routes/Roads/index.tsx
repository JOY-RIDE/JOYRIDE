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
import useClientFilter from 'hooks/useClientFilter';

const cn = classNames.bind(styles);

const Roads = () => {
  //   const { isLoading: isDurunubiLoading, data: durunubiData } = useQuery<
  //     ServerIRoads[]
  //   >(['allCourses'], fetchCourses);
  //   const RoadsData = _.uniqBy(durunubiData, 'crsKorNm');

  //   let newRoads = [...RoadsData];
  //   newRoads.sort((a, b) => (a.crsKorNm < b.crsKorNm ? -1 : 1));

  const { isLoading: isServerLoading, data: serverData } = useQuery<
    ServerIRoads[]
  >(['serverCourses'], fetchCoursesFromServer);
  const serverRoads = _.uniqBy(serverData, 'crsKorNm');

  let tmp = [...serverRoads];
  tmp.sort((a, b) => (a.crsKorNm < b.crsKorNm ? -1 : 1));

  const { filters: boardFilters } = useClientFilter(
    courseBoardFiltersState,
    // @ts-ignore
    COURSE_FILTERS_DISPATCHES
  );
  //   console.log(boardFilters);

  const filterLocation = boardFilters?.location?.value;
  const filterLevel = boardFilters?.pathDifficulty?.value;

  //   const { data: filteredData } = useQuery<ServerIRoads[]>(
  //     ['filteredCourses', filterLevel, filterLocation],
  //     () => fetchFilteredCourses(filterLevel, filterLocation)
  //   );
  //   console.log(filteredData);

  const order = useRecoilValue(courseOrderState);
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
              {getCoursesOrderedBy(order.name, tmp)
                .slice(offset, offset + LIMIT)
                .map(road => (
                  <CourseItem course={road} />
                ))}
              {/* </>
            )} */}
            </div>
            <Paging
              total={tmp.length}
              limit={LIMIT}
              page={page}
              setPage={setPage}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Roads;
