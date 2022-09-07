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
  const [isToiletChecked, setIsToiletChecked] = useState(true);
  const [isCafeChecked, setIsCafeChecked] = useState(true);
  const [isRepairChecked, setIsRepairChecked] = useState(true);
  const [isRentalChecked, setIsRentalChecked] = useState(true);

  useEffect(() => {
    var infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    const container = document.getElementById('myMap');
    const options = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);

    var zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    var ps = new window.kakao.maps.services.Places();

    ps.keywordSearch('화장실', toiletSearchCB, {
      radius: 2000,
      location: new window.kakao.maps.LatLng(37.566826, 126.9786567),
    });
    ps.keywordSearch('맛집', restaurantSearchCB, {
      radius: 2000,
      location: new window.kakao.maps.LatLng(37.566826, 126.9786567),
    });
    ps.keywordSearch('자전거수리', repairSearchCB, {
      radius: 2000,
      location: new window.kakao.maps.LatLng(37.566826, 126.9786567),
    });
    ps.keywordSearch('자전거대여', rentalSearchCB, {
      radius: 5000,
      location: new window.kakao.maps.LatLng(37.566826, 126.9786567),
    });

    function toiletSearchCB(data: any, status: any, pagination: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        var bounds = new window.kakao.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
          displayToiletMarker(data[i]);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayToiletMarker(place: string | any) {
      var imageSrc = '/icons/wc_marker.svg',
        imageSize = new window.kakao.maps.Size(30, 39),
        imageOption = { offset: new window.kakao.maps.Point(27, 50) };

      var markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      var marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
        image: markerImage,
      });

      window.kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            '</div>'
        );
        infowindow.open(map, marker);
      });
    }

    function restaurantSearchCB(data: any, status: any, pagination: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        var bounds = new window.kakao.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
          displayRestaurantMarker(data[i]);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayRestaurantMarker(place: string | any) {
      var imageSrc = '/icons/restaurant_marker.svg',
        imageSize = new window.kakao.maps.Size(30, 39),
        imageOption = { offset: new window.kakao.maps.Point(27, 69) };

      var markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      var marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
        image: markerImage,
      });

      window.kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            '</div>'
        );
        infowindow.open(map, marker);
      });
    }

    function repairSearchCB(data: any, status: any, pagination: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        var bounds = new window.kakao.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
          displayRepairMarker(data[i]);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayRepairMarker(place: string | any) {
      var imageSrc = '/icons/spanner_marker.svg',
        imageSize = new window.kakao.maps.Size(30, 39),
        imageOption = { offset: new window.kakao.maps.Point(27, 69) };

      var markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      var marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
        image: markerImage,
      });

      window.kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            '</div>'
        );
        infowindow.open(map, marker);
      });
    }

    function rentalSearchCB(data: any, status: any, pagination: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        var bounds = new window.kakao.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
          displayRentalMarker(data[i]);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayRentalMarker(place: string | any) {
      var imageSrc = '/icons/pedal_bike_marker.svg',
        imageSize = new window.kakao.maps.Size(30, 39),
        imageOption = { offset: new window.kakao.maps.Point(27, 69) };

      var markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      var marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
        image: markerImage,
      });

      window.kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            '</div>'
        );
        infowindow.open(map, marker);
      });
    }
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
        <MapCheckOption
          setIsToiletChecked={setIsToiletChecked}
          setIsCafeChecked={setIsCafeChecked}
          setIsRepairChecked={setIsRepairChecked}
          setIsRentalChecked={setIsRentalChecked}
        />
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
