import { useRef, useEffect } from 'react';
import { MeetupPath } from 'types/meetup';
import {
  ARRIVE_MARKER_IMAGE,
  START_MARKER_IMAGE,
  USER_DEFAULT_IMAGE,
} from 'utils/urls';
import styles from './MeetupPathMap.module.scss';

const FLAG_IMAGE_SIZE = new window.kakao.maps.Size(50, 45);
const CIRCLE_IMAGE_SIZE = new window.kakao.maps.Size(20, 20);

const MAP_OPTION = {
  center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
  // level: 3,
};

interface MeetupPathMapProp {
  path: MeetupPath;
}

const MeetupPathMap = ({ path }: MeetupPathMapProp) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = new window.kakao.maps.Map(mapContainerRef.current, MAP_OPTION);
    const mapTypeControl = new window.kakao.maps.MapTypeControl();
    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    const placeSearcher = new window.kakao.maps.services.Places();
    const newBounds = new window.kakao.maps.LatLngBounds();

    path.forEach((stop, stopIndex) =>
      // TODO: 비동기
      placeSearcher.keywordSearch(
        stop,
        (data: any, status: any) => {
          if (!status === window.kakao.maps.services.Status.OK) return;

          const place = data[0];
          newBounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
          map.setBounds(newBounds, 0, 0);
          attachMarker(place, stop, stopIndex);
        },
        { size: 1 }
      )
    );

    function attachMarker(place: any, stop: string, stopIndex: number) {
      // const infoWindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
      const markerImage = getMarkerImage(
        stopIndex === path.length - 1 ? -1 : stopIndex
      );
      new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
        image: markerImage,
      });
      // infoWindow.setContent(`<span>${stopIndex + 1}: ${stop}</span>`);
      // infoWindow.open(map, marker);
    }

    function getMarkerImage(stopIndex: number) {
      switch (stopIndex) {
        case 0:
          return getMarkerImageObj(START_MARKER_IMAGE, FLAG_IMAGE_SIZE);
        case -1:
          return path[0] === path[path.length - 1]
            ? getMarkerImageObj(ARRIVE_MARKER_IMAGE, FLAG_IMAGE_SIZE, {
                offset: new window.kakao.maps.Point(15, 45),
              })
            : getMarkerImageObj(ARRIVE_MARKER_IMAGE, FLAG_IMAGE_SIZE);
        default:
          return getMarkerImageObj(USER_DEFAULT_IMAGE, CIRCLE_IMAGE_SIZE); // TODO
      }
    }

    function getMarkerImageObj(imgSRC: string, sizeObj?: any, options?: any) {
      return new window.kakao.maps.MarkerImage(imgSRC, sizeObj, options);
    }
  }, []);

  return <section className={styles.container} ref={mapContainerRef} />;
};

export default MeetupPathMap;
