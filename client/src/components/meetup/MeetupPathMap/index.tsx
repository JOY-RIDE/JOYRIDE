import { useRef, useEffect } from 'react';
import { MeetupPath } from 'types/meetup';
import styles from './MeetupPathMap.module.scss';

interface MeetupPathMapProp {
  path: MeetupPath;
}

const MeetupPathMap = ({ path }: MeetupPathMapProp) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const MAP_OPTION = {
    center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
    level: 3,
  };
  const placeSearcher = new window.kakao.maps.services.Places();

  useEffect(() => {
    const map = new window.kakao.maps.Map(mapContainerRef.current, MAP_OPTION);
    const newBounds = new window.kakao.maps.LatLngBounds();

    path.forEach((stop, stopIndex) =>
      // 비동기
      placeSearcher.keywordSearch(
        stop,
        // @ts-ignore
        (data, status) => {
          if (!status === window.kakao.maps.services.Status.OK) return;
          const place = data[0];
          newBounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
          map.setBounds(newBounds, 0, 0);
          displayMarker(place, stop, stopIndex);
        },
        { size: 1 }
      )
    );

    // @ts-ignore
    function displayMarker(place, stop, stopIndex) {
      const infoWindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
      const marker = new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });
      infoWindow.setContent(`<span>${stopIndex + 1}: ${stop}</span>`);
      infoWindow.open(map, marker);
    }
  }, []);

  return <section className={styles.container} ref={mapContainerRef} />;
};

export default MeetupPathMap;
