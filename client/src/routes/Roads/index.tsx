import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { fetchCourses } from '../../api';
import styles from './Roads.module.scss';
import classNames from 'classnames/bind';
import PageTitle from 'components/common/PageTitle';
import Loading from 'components/common/Loading';
import { AiFillHeart } from 'react-icons/ai';
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
  return (
    <section className={styles.roads}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={cn('container')}>
          <PageTitle size="md">자전거 코스</PageTitle>
          <ul className={cn('contents')}>
            {RoadsData?.map(road => (
              <li className={cn('content')} key={road.crsKorNm}>
                <Link to={`${road.crsKorNm}`} state={{ name: road.crsKorNm }}>
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
                      <span className={cn('value')}>4.5</span>
                    </span>
                    ·
                    <span className={cn('likes')}>
                      <span className={cn('type')}>♥</span>{' '}
                      <span className={cn('value')}>12</span>
                    </span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Roads;
