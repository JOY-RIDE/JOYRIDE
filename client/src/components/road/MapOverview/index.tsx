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

interface mapProps {
  lat: number | undefined;
  lng: number | undefined;
}

const cn = classNames.bind(styles);

const MapOverview = ({ lat, lng }: mapProps) => {
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new window.kakao.maps.LatLng(lat, lng),
      level: 6,
    };
    const map = new window.kakao.maps.Map(container, options);
    map.relayout();
    map.setCenter(new window.kakao.maps.LatLng(lat, lng));
  }, []);

  return (
    <div className={styles.container}>
      <div
        id="myMap"
        className={cn('map')}
        style={{
          width: '98.5vw',
          height: '65vh',
        }}
      >
        {/* <MapDetail /> */}
        <Link to={`map`} state={{ lat: lat, lng: lng }}>
          <button className={cn('icon')}>
            <BsArrowsAngleExpand />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MapOverview;
