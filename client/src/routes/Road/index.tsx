import {
  useLocation,
  useParams,
  useMatch,
  Outlet,
  Link,
} from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCourseInfo } from '../../api';
import styles from './Road.module.scss';
import classNames from 'classnames/bind';
import PageTitle from 'components/common/PageTitle';
import _ from 'lodash';

interface RouteState {
  state: {
    name: string;
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
  crsTotlRqrmHour: number;
  crsTourInfo: string;
  gpxpath: string;
  modifiedtime: number;
  routeIdx: string;
  sigun: string;
  travelerinfo: number;
}

const Road = () => {
  const { courseNm } = useParams<{ courseNm: string }>();
  const { state } = useLocation() as RouteState;

  const { data } = useQuery<IRoad>(['info', courseNm], () =>
    fetchCourseInfo(courseNm)
  );

  return (
    <section className={styles.road}>
      <PageTitle size="md">
        {state?.name}
        {courseNm}
      </PageTitle>
    </section>
  );
};

export default Road;
