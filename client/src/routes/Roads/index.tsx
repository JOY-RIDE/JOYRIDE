import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { fetchCourses } from '../../api';
import queryString from 'query-string';
import styles from './Roads.module.scss';
import classNames from 'classnames/bind';
import PageTitle from 'components/common/PageTitle';
import Loading from 'components/common/Loading';
import Paging from 'components/common/Paging';
import Sort from 'components/common/Sort';
import _ from 'lodash';

const cn = classNames.bind(styles);

interface IRoad {
  brdDiv: string;
  createdtime: number;
  crsContents: string;
  crsCycle: string;
  crsDstnc: number;
  crsIdx: string;
  crsKorNm: string;
  crsLevel: number;
  crsSummary: string;
  crsTotlRqrmHour: number;
  crsTourInfo: string;
  gpxpath: string;
  modifiedtime: number;
  routeIdx: string;
  sigun: string;
  travelerinfo: number;
}

const Roads = () => {
  const { isLoading, data } = useQuery<IRoad[]>('allCourses', fetchCourses);
  const RoadsData = _.uniqBy(data, 'crsIdx');
  //   console.log(data);

  const sortOptionData = [
    '가나다순',
    '짧은시간순',
    '긴시간순',
    '짧은길이순',
    '긴길이순',
    '좋아요순',
    '평점순',
  ];

  const [currentSort, setCurrentSort] = useState('가나다순');

  const LIMIT = 5;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * LIMIT;

  return (
    <section className={styles.roads}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={cn('container')}>
          <PageTitle size="md">자전거 코스</PageTitle>
          <div className={cn('func')}>
            <div>필터</div>
            <Sort
              sortOptionData={sortOptionData}
              setCurrentSort={setCurrentSort}
              currentSort={currentSort}
            />
          </div>
          <ul className={cn('contents')}>
            {RoadsData?.slice(offset, offset + LIMIT).map(road => (
              <li className={cn('content')} key={road.crsKorNm}>
                <Link to={`${road.crsKorNm}`} state={{ name: road.crsKorNm }}>
                  <div className={cn('top')}>
                    <img
                      className={cn('image')}
                      src="https://images.unsplash.com/photo-1559235270-2df4dcfb4eca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
                      alt="cycling"
                    />
                  </div>
                  <div className={cn('bottom')}>
                    <p className={cn('title')}>
                      <span className={cn('sigun')}>{road.sigun}</span>{' '}
                      <span className={cn('name')}>{road.crsKorNm}</span>
                    </p>
                    <p className={cn('info')}>
                      <span className={cn('dstnc')}>{road.crsDstnc}km </span>
                      <span className={cn('hour')}>
                        {road.crsTotlRqrmHour < 60
                          ? `${road.crsTotlRqrmHour}분`
                          : road.crsTotlRqrmHour % 60 == 0
                          ? `${Math.floor(road.crsTotlRqrmHour / 60)}시간`
                          : `${Math.floor(road.crsTotlRqrmHour / 60)}시간 ${
                              road.crsTotlRqrmHour % 60
                            }분`}
                      </span>
                    </p>
                    <p className={cn('info2')}>
                      <span className={cn('level')}>
                        <span className={cn('type')}>난이도</span>{' '}
                        <span className={cn('value')}>
                          {road.crsLevel == 1
                            ? '하'
                            : road.crsLevel == 2
                            ? '중'
                            : '상'}
                        </span>
                      </span>
                      ·
                      <span className={cn('rate')}>
                        <span className={cn('type')}>평점</span>{' '}
                        {/* TODO 코스 평점(없으면 - 로 표시) */}
                        <span className={cn('value')}>4.5</span>
                      </span>
                      ·
                      <span className={cn('likes')}>
                        <span className={cn('type')}>♥</span>{' '}
                        {/* TODO 코스 좋아요 수 */}
                        <span className={cn('value')}>12</span>
                      </span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          {/* TODO 페이지 이동시 url에 값 전달 */}
          <Paging
            total={RoadsData.length}
            limit={LIMIT}
            page={page}
            handlePageChange={setPage}
          />
        </div>
      )}
    </section>
  );
};

export default Roads;
