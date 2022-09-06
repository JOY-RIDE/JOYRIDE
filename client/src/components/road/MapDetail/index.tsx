import { useState, useEffect, forwardRef, ReactElement, Ref } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import MapCheckOption from '../MapCheckOption';
import styles from './MapDetail.module.scss';
import classNames from 'classnames/bind';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

/* global kako */

declare global {
  interface Window {
    kakao: any;
  }
}

const cn = classNames.bind(styles);

const MapDetail = () => {
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);
  }, []);

  const navigate = useNavigate();
  const onClickGoBack = () => {
    navigate(-1);
  };
  const { roadId } = useParams();

  return (
    <div className={styles.container}>
      <div className={cn('header')}>
        <button onClick={onClickGoBack}>
          <MdOutlineArrowBackIosNew />
        </button>
        <span>{roadId}</span>
      </div>
      <nav className={cn('select-items')}>
        <MapCheckOption />
      </nav>
      <div
        id="myMap"
        className={cn('map')}
        style={{
          width: '97vw',
          height: '100vh',
        }}
      ></div>
      {/* <button onClick={handleMapClose}>close</button> */}
    </div>
  );
};

export default MapDetail;
