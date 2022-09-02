import { useRecoilState } from 'recoil';
import Script from 'react-load-script';
import styles from './MapDetail.module.scss';
import classNames from 'classnames/bind';
import { isMapOpenedState } from 'states/course';

/* global kako */

declare global {
  interface Window {
    kakao: any;
  }
}

const cn = classNames.bind(styles);

const MapDetail = () => {
  const [isMapOpened, setIsMapOpened] = useRecoilState(isMapOpenedState);
  const handleMapClose = () => setIsMapOpened(false);
  const handleScriptLoad = () => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('myMap');
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);
    });
  };

  return (
    <div className={styles.container}>
      <div
        id="myMap"
        className={cn('map')}
        style={{
          width: '99vw',
          height: '39rem',
        }}
      ></div>
      <button onClick={handleMapClose}>close</button>
      <Script
        url="//dapi.kakao.com/v2/maps/sdk.js?appkey=%REACT_APP_MAP_API_KEY%&libraries=services,clusterer,drawing&autoload=false"
        onLoad={handleScriptLoad}
      />
    </div>
  );
};

export default MapDetail;
