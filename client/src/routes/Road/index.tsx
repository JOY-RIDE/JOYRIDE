import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { fetchCourseInfo, fetchCourseFromServer } from '../../apis/CrsAPI';
import styles from './Road.module.scss';
import classNames from 'classnames/bind';
import Loading from 'components/common/Loading';
import Button from 'components/common/Button';
import PageTitle from 'components/common/PageTitle';
import Like from 'components/common/Like';
import MapOverview from 'components/road/MapOverview';
import CrsDesc from 'components/road/CrsDesc';
import CrsInfo from 'components/road/CrsInfo';
import ReviewWriter from 'components/road/ReviewWriter';
import ReviewItem from 'components/road/ReviewItem';
import ReviewFilter from 'components/road/ReviewFilter';
import { IRoad, ServerIRoad } from 'types/course';
import { userIdState } from 'states/auth';
// import _ from 'lodash';

const cn = classNames.bind(styles);

interface RouteState {
  state: {
    id: number;
    name: string;
  };
}

const Road = () => {
  const { state } = useLocation() as RouteState;
  const crsNm = state.name;

  const { isLoading: isDurunubiLoading, data: durunubiData } = useQuery<IRoad>(
    ['info', crsNm],
    () => fetchCourseInfo(crsNm)
  );

  //   const [loggedInUser, setLoggedInUser] = useRecoilState(userIdState);
  //   const { isLoading: isServerLoading, data: serverData } =
  //     useQuery<ServerIRoad>(['serverCrs', crsNm, loggedInUser], () =>
  //       fetchCourseFromServer(crsNm, loggedInUser)
  //     );
  //   console.log(serverData);

  return (
    <section className={styles.road}>
      {isDurunubiLoading ? (
        <Loading />
      ) : (
        <div>
          <div className={cn('head')}>
            <div className={cn('left')}>
              <PageTitle size="md">
                <span className={cn('title-sigun')}>
                  {durunubiData?.sigun}{' '}
                </span>
                {crsNm}
              </PageTitle>

              <div className={cn('info-top')}>
                <CrsInfo
                  label="길이"
                  content={`${durunubiData?.crsDstnc}km`}
                ></CrsInfo>
                <span className={cn('disc')}>·</span>
                <CrsInfo
                  label="소요 시간"
                  content={
                    durunubiData?.crsTotlRqrmHour! < 60
                      ? `${durunubiData?.crsTotlRqrmHour}분`
                      : durunubiData?.crsTotlRqrmHour! % 60 == 0
                      ? `${Math.floor(durunubiData?.crsTotlRqrmHour! / 60)}시간`
                      : `${Math.floor(
                          durunubiData?.crsTotlRqrmHour! / 60
                        )}시간 ${durunubiData?.crsTotlRqrmHour! % 60}분`
                  }
                ></CrsInfo>
                <span className={cn('disc')}>·</span>
                <CrsInfo
                  label="난이도"
                  content={
                    durunubiData?.crsLevel == '1'
                      ? '하'
                      : durunubiData?.crsLevel == '2'
                      ? '중'
                      : '상'
                  }
                ></CrsInfo>
              </div>
              <div className={cn('info-bottom')}>
                <CrsInfo label="좋아요" content="12"></CrsInfo>
                <span className={cn('disc')}>·</span>
                <CrsInfo label="평점" content="4.5"></CrsInfo>
              </div>
            </div>
            <div className={cn('right')}>
              <Like />
            </div>
          </div>
          <MapOverview />
          <PageTitle size="sm">코스 소개</PageTitle>
          <div className={cn('desc')}>
            <CrsDesc
              name={crsNm}
              label="코스 개요"
              contents={durunubiData?.crsContents}
            ></CrsDesc>
            <CrsDesc
              name={crsNm}
              label="코스 설명"
              contents={durunubiData?.crsSummary}
            ></CrsDesc>
            <CrsDesc
              name={crsNm}
              label="관광 포인트"
              contents={durunubiData?.crsTourInfo}
            ></CrsDesc>
          </div>
          <PageTitle size="sm">코스 사진</PageTitle>
          <div className={cn('review-title')}>
            <PageTitle size="sm">코스 후기</PageTitle>
            <span className={cn('cnt')}>12</span>
          </div>
          <ReviewWriter />
          <div className={cn('review-summary')}>
            <span>전체평점</span>
            <span className={cn('rating-summary')}>4.5</span>
            <span>/5</span>
          </div>
          <ReviewFilter />
          <div className={cn('review-container')}>
            {[1, 2].map(idx => (
              <ReviewItem key={idx} />
            ))}
          </div>
          <PageTitle size="sm">관련 모임</PageTitle>
        </div>
      )}
    </section>
  );
};

export default Road;
