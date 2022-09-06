import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './MapOverview.module.scss';
import classNames from 'classnames/bind';
import { BsArrowsAngleExpand } from 'react-icons/bs';

/* global kako */

declare global {
  interface Window {
    kakao: any;
  }
}

const cn = classNames.bind(styles);

const MapOverview = () => {
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
          width: '98.5vw',
          height: '39rem',
        }}
      >
        {/* <MapDetail /> */}
        <Link to={`map`}>
          <button className={cn('icon')}>
            <BsArrowsAngleExpand />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MapOverview;
