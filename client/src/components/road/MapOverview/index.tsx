import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import styles from './MapOverview.module.scss';
import classNames from 'classnames/bind';
import MapDetail from '../MapDetail';
import { BsArrowsAngleExpand } from 'react-icons/bs';
import { isMapOpenedState } from 'states/course';

/* global kako */

declare global {
  interface Window {
    kakao: any;
  }
}

const cn = classNames.bind(styles);

const MapOverview = () => {
  const [isMapOpened, setIsMapOpened] = useRecoilState(isMapOpenedState);
  const handleMapOpen = () => setIsMapOpened(true);
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);
  }, []);

  return (
    <div className={styles.container}>
      <div
        id="myMap"
        className={cn('map')}
        style={{
          width: '99vw',
          height: '39rem',
        }}
      >
        {/* <MapDetail /> */}
        <button className={cn('icon')} onClick={handleMapOpen}>
          <BsArrowsAngleExpand />
        </button>
      </div>
    </div>
  );
};

export default MapOverview;
