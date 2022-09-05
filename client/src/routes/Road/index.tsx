import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { fetchCourseInfo } from '../../apis/CrsAPI';
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
import { IRoad } from 'types/course';
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

  const { isLoading, data } = useQuery<IRoad>(['info', crsNm], () =>
    fetchCourseInfo(crsNm)
  );

  return (
    <section className={styles.road}>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className={cn('head')}>
            <div className={cn('left')}>
              <PageTitle size="md">
                <span className={cn('title-sigun')}>{data?.sigun} </span>
                {crsNm}
              </PageTitle>

              <div className={cn('info-top')}>
                <CrsInfo label="길이" content={`${data?.crsDstnc}km`}></CrsInfo>
                <span className={cn('disc')}>·</span>
                <CrsInfo
                  label="소요 시간"
                  content={
                    data?.crsTotlRqrmHour! < 60
                      ? `${data?.crsTotlRqrmHour}분`
                      : data?.crsTotlRqrmHour! % 60 == 0
                      ? `${Math.floor(data?.crsTotlRqrmHour! / 60)}시간`
                      : `${Math.floor(data?.crsTotlRqrmHour! / 60)}시간 ${
                          data?.crsTotlRqrmHour! % 60
                        }분`
                  }
                ></CrsInfo>
                <span className={cn('disc')}>·</span>
                <CrsInfo
                  label="난이도"
                  content={
                    data?.crsLevel == '1'
                      ? '하'
                      : data?.crsLevel == '2'
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
              contents={data?.crsContents}
            ></CrsDesc>
            <CrsDesc
              name={crsNm}
              label="코스 설명"
              contents={data?.crsSummary}
            ></CrsDesc>
            <CrsDesc
              name={crsNm}
              label="관광 포인트"
              contents={data?.crsTourInfo}
            ></CrsDesc>
          </div>
          <PageTitle size="sm">코스 사진</PageTitle>
          <div className={cn('review-title')}>
            <PageTitle size="sm">코스 후기</PageTitle>
            <span className={cn('cnt')}>12</span>
          </div>
          <ReviewWriter />
          <PageTitle size="sm">관련 모임</PageTitle>
        </div>
      )}
    </section>
  );
};

export default Road;
