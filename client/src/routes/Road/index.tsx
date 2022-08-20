import {
  useLocation,
  useParams,
  useMatch,
  Outlet,
  Link,
} from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCourseInfo } from '../../apis/CrsAPI';
import styles from './Road.module.scss';
import classNames from 'classnames/bind';
import Loading from 'components/common/Loading';
import Button from 'components/common/Button';
import PageTitle from 'components/common/PageTitle';
import Like from 'components/common/Like';
import CrsDesc from 'components/road/CrsDesc';
import CrsInfo from 'components/road/crsInfo';
// import _ from 'lodash';

const cn = classNames.bind(styles);

interface RouteState {
  state: {
    id: number;
  };
}

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
  crsTotlRqrmHour: number | undefined;
  crsTourInfo: string;
  gpxpath: string;
  modifiedtime: number;
  routeIdx: string;
  sigun: string;
  travelerinfo: number;
}

const Road = () => {
  const { state } = useLocation() as RouteState;
  const crsId = state.id;

  const { isLoading, data } = useQuery<IRoad>(['info', crsId], () =>
    fetchCourseInfo(crsId)
  );
  console.log(data);

  return (
    <section className={styles.road}>
      {isLoading ? (
        <Loading />
      ) : (
        <div>Success!</div>
        // <div>
        //   <div className={cn('head')}>
        //     <div className={cn('left')}>
        //       <PageTitle size="md">
        //         <span className={cn('title-sigun')}>{data?.sigun} </span>
        //         {crsNm}
        //       </PageTitle>

        //       <div className={cn('info-top')}>
        //         <CrsInfo label="길이" content={`${data?.crsDstnc}km`}></CrsInfo>
        //         <span className={cn('disc')}>·</span>
        //         <CrsInfo
        //           label="소요 시간"
        //           content={
        //             data?.crsTotlRqrmHour! < 60
        //               ? `${data?.crsTotlRqrmHour}분`
        //               : data?.crsTotlRqrmHour! % 60 == 0
        //               ? `${Math.floor(data?.crsTotlRqrmHour! / 60)}시간`
        //               : `${Math.floor(data?.crsTotlRqrmHour! / 60)}시간 ${
        //                   data?.crsTotlRqrmHour! % 60
        //                 }분`
        //           }
        //         ></CrsInfo>
        //         <span className={cn('disc')}>·</span>
        //         <CrsInfo
        //           label="난이도"
        //           content={
        //             data?.crsLevel == 1
        //               ? '하'
        //               : data?.crsLevel == 2
        //               ? '중'
        //               : '상'
        //           }
        //         ></CrsInfo>
        //       </div>
        //       <div className={cn('info-bottom')}>
        //         <CrsInfo label="좋아요" content="12"></CrsInfo>
        //         <span className={cn('disc')}>·</span>
        //         <CrsInfo label="평점" content="4.5"></CrsInfo>
        //       </div>
        //     </div>
        //     <div className={cn('right')}>
        //       <Like />
        //       <span className={cn('likecnt')}>12</span>
        //     </div>
        //   </div>

        //   <PageTitle size="sm">코스 소개</PageTitle>
        //   <div className={cn('desc')}>
        //     <CrsDesc label="코스 개요" contents={data?.crsContents}></CrsDesc>
        //     <CrsDesc label="코스 설명" contents={data?.crsSummary}></CrsDesc>
        //     <CrsDesc label="관광 포인트" contents={data?.crsTourInfo}></CrsDesc>
        //   </div>
        //   {/* <PageTitle size="sm">코스 사진</PageTitle> */}
        //   <PageTitle size="sm">코스 후기</PageTitle>
        //   <Button color="whiteMain" size="lg" text="후기 쓰기"></Button>
        //   <PageTitle size="sm">관련 모임</PageTitle>
        // </div>
      )}
    </section>
  );
};

export default Road;
