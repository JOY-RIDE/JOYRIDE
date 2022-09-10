import { useRef, useEffect } from 'react';
import { MeetupGatheringPlace, MeetupPath } from 'types/meetup';
import { MAIN_COLOR } from 'utils/constants';
import { FINISH_MARKER_IMAGE, START_MARKER_IMAGE } from 'utils/urls';
import meetup_stop from 'assets/icons/meetup_stop.svg';
import meetup_gatheringPlace from 'assets/icons/meetup_gatheringPlace.svg';
import styles from './MeetupPathMap.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

function getLatLngsOrderedByIndex(latLngs: any[]) {
  return [...latLngs]
    .sort((a, b) => a.index - b.index)
    .map(latLng => latLng.latLng);
}

const FLAG_IMAGE_SIZE = new window.kakao.maps.Size(45, 40);
const DEFAULT_IMAGE_SIZE = new window.kakao.maps.Size(32, 32);

const MAP_OPTION = {
  center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
};

interface MeetupPathMapProp {
  gatheringPlace: MeetupGatheringPlace;
  path: MeetupPath;
}

const MeetupPathMap = ({ gatheringPlace, path }: MeetupPathMapProp) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = new window.kakao.maps.Map(mapContainerRef.current, MAP_OPTION);
    const mapTypeControl = new window.kakao.maps.MapTypeControl();
    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    const placeSearcher = new window.kakao.maps.services.Places();
    const newBounds = new window.kakao.maps.LatLngBounds();
    const latLngs: any[] = [];
    let line: any;

    placeSearcher.keywordSearch(
      gatheringPlace,
      (data: any, status: any) => {
        try {
          if (!status === window.kakao.maps.services.Status.OK) return;
          const place = data[0];
          const latLng = new window.kakao.maps.LatLng(place.y, place.x);
          newBounds.extend(latLng);

          attachMarker(
            latLng,
            getMarkerImageObj(meetup_gatheringPlace, DEFAULT_IMAGE_SIZE, {
              alt: '집결지',
            }),
            2
          );
          attachOverlay(latLng, gatheringPlace);
        } catch (e) {
          if (e instanceof TypeError) return;
          else throw new Error(); // TODO
        }
      },
      { size: 1 }
    );

    path.forEach((stop, stopOriginalIndex) =>
      placeSearcher.keywordSearch(
        stop,
        (data: any, status: any) => {
          try {
            if (!status === window.kakao.maps.services.Status.OK) return;
            const stopNewIndex =
              stopOriginalIndex === path.length - 1 ? -1 : stopOriginalIndex;

            const place = data[0];
            const latLng = new window.kakao.maps.LatLng(place.y, place.x);
            newBounds.extend(latLng);
            map.setBounds(newBounds, 0, 0);
            latLngs.push({ index: stopOriginalIndex, latLng });

            attachMarker(latLng, getDifferentMarkerImageObj(stopNewIndex), 3);
            attachOverlay(latLng, stop);

            if (latLngs.length < 2) return;
            removeExistingLine();
            drawLine(getLatLngsOrderedByIndex(latLngs));
          } catch (e) {
            if (e instanceof TypeError) return;
            else throw new Error();
          }
        },
        { size: 1 }
      )
    );

    // Callbacks

    function attachMarker(latLng: any, imageObj: any, zIndex: number) {
      new window.kakao.maps.Marker({
        map,
        position: latLng,
        image: imageObj,
        zIndex,
      });
    }

    function getDifferentMarkerImageObj(stopNewIndex: number) {
      switch (stopNewIndex) {
        case 0:
          return getMarkerImageObj(START_MARKER_IMAGE, FLAG_IMAGE_SIZE, {
            alt: '출발지',
          });

        case -1:
          return path[0] === path[path.length - 1]
            ? getMarkerImageObj(FINISH_MARKER_IMAGE, FLAG_IMAGE_SIZE, {
                offset: new window.kakao.maps.Point(10, 40),
                alt: '종료지',
              })
            : getMarkerImageObj(FINISH_MARKER_IMAGE, FLAG_IMAGE_SIZE, {
                alt: '종료지',
              });

        default:
          return getMarkerImageObj(meetup_stop, DEFAULT_IMAGE_SIZE, {
            alt: '경유지',
          });
      }
    }

    function getMarkerImageObj(imgSRC: string, sizeObj: any, options?: any) {
      return new window.kakao.maps.MarkerImage(imgSRC, sizeObj, options);
    }

    function attachOverlay(latLng: any, content: string) {
      const overlay = `<span class="${cn('overlay', {
        gather: content === gatheringPlace,
        start: content === path[0],
        arrive: content === path[path.length - 1],
      })}"
      }>${content}</span>`;

      new window.kakao.maps.CustomOverlay({
        map,
        position: latLng,
        content: overlay,
        zIndex: 4,
        yAnchor: 0,
      });
    }

    function drawLine(latLngs: any[]) {
      line = new window.kakao.maps.Polyline({
        path: latLngs,
        strokeWeight: 5,
        strokeColor: MAIN_COLOR,
        strokeOpacity: 1,
      });
      line.setMap(map);
    }

    function removeExistingLine() {
      if (!line) return;
      line.setMap(null);
    }
  }, []);

  return <div className={cn('container')} ref={mapContainerRef} />;
};

export default MeetupPathMap;
