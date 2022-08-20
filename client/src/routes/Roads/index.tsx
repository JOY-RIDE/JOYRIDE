import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { fetchCourses } from '../../apis/CrsAPI';
import queryString from 'query-string';
import styles from './Roads.module.scss';
import classNames from 'classnames/bind';
import PageTitle from 'components/common/PageTitle';
import Loading from 'components/common/Loading';
import Paging from 'components/common/Paging';
import Sort from 'components/roads/Sort';
import Filter from 'components/roads/Filter';
import _ from 'lodash';

const cn = classNames.bind(styles);

interface IRoad {
  id: number;
  crsContents: string;
  crsDstnc: number;
  crsKorNm: string;
  crsLevel: number;
  crsSummary: string;
  crsTotlRqrmHour: number;
  crsTourInfo: string;
  sigun: string;
  image: null;
  travelerinfo: number;
  created_at: string;
  updated_at: string;
  required_at: number;
}

const Roads = () => {
  const { isLoading, data } = useQuery<IRoad[]>('allCourses', fetchCourses);
  //   const { isLoading, data } = useQuery<IRoad[]>('allCourses', async () => {
  //     const { data } = await axios.get('/courses');
  //     return data;
  //   });
  const RoadsData = _.uniqBy(data, 'crsKorNm');
  //   console.log(RoadsData);

  const sortOptionData = [
    { name: 'abc', value: '가나다순' },
    { name: 'shortHour', value: '짧은시간순' },
    { name: 'longHour', value: '긴시간순' },
    { name: 'shorDstnc', value: '짧은길이순' },
    { name: 'longDstnc', value: '긴길이순' },
    { name: 'likes', value: '좋아요순' },
    { name: 'ratings', value: '평점순' },
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
            <Filter />
            <Sort
              sortOptionData={sortOptionData}
              setCurrentSort={setCurrentSort}
              currentSort={currentSort}
            />
          </div>
          <ul className={cn('contents')}>
            {RoadsData?.slice(offset, offset + LIMIT).map(road => (
              <li className={cn('content')} key={road.id}>
                <Link to={`${road.id}`} state={{ id: road.id }}>
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
                        {road.required_at < 60
                          ? `${road.required_at}분`
                          : road.required_at % 60 == 0
                          ? `${Math.floor(road.required_at / 60)}시간`
                          : `${Math.floor(road.required_at / 60)}시간 ${
                              road.required_at % 60
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
