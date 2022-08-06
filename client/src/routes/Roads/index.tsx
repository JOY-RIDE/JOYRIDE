import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { fetchCourses } from '../../api';
import styles from './Roads.module.scss';
import classNames from 'classnames/bind';
import PageTitle from 'components/common/PageTitle';
import Loading from 'components/common/Loading';

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
  //   console.log(data);
  return (
    <div>
      {isLoading ? <Loading /> : <PageTitle size="md">자전거 코스</PageTitle>}
    </div>
  );
};

export default Roads;
