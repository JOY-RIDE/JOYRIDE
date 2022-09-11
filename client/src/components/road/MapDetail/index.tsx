import { useState, useEffect, forwardRef, ReactElement, Ref } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styles from './MapDetail.module.scss';
import classNames from 'classnames/bind';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import { on } from 'process';

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

const MapDetail = ({ lat, lng }: mapProps) => {
  useEffect(() => {
    var infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    const container = document.getElementById('myMap');
    const options = {
      center: new window.kakao.maps.LatLng(lat, lng),
      level: 6,
    };
    const map = new window.kakao.maps.Map(container, options);

    var zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    var ps = new window.kakao.maps.services.Places();

    var toilet = document.getElementById('toilet');
    toilet?.addEventListener('click', function () {
      ps.keywordSearch('화장실', toiletSearchCB, {
        radius: 10000,
        location: new window.kakao.maps.LatLng(lat, lng),
      });
    });

    var cafe = document.getElementById('cafe');
    cafe?.addEventListener('click', function () {
      ps.keywordSearch('맛집', restaurantSearchCB, {
        radius: 10000,
        location: new window.kakao.maps.LatLng(lat, lng),
      });
    });

    var repair = document.getElementById('repair');
    repair?.addEventListener('click', function () {
      ps.keywordSearch('자전거수리', repairSearchCB, {
        radius: 10000,
        location: new window.kakao.maps.LatLng(lat, lng),
      });
    });

    var rental = document.getElementById('rental');
    rental?.addEventListener('click', function () {
      ps.keywordSearch('자전거대여', rentalSearchCB, {
        radius: 10000,
        location: new window.kakao.maps.LatLng(lat, lng),
      });
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
          '<div class="placeinfo" style="padding:5px;font-size:12px;" >' +
            '   <a class="title" style="width:100%;" href="' +
            place.place_url +
            '" target="_blank" title="' +
            place.place_name +
            '">' +
            place.place_name +
            '</a>'
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
          '<div class="placeinfo" style="padding:5px;font-size:12px;" >' +
            '   <a class="title" style="width:100%;" href="' +
            place.place_url +
            '" target="_blank" title="' +
            place.place_name +
            '">' +
            place.place_name +
            '</a>'
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
          '<div class="placeinfo" style="padding:5px;font-size:12px;" >' +
            '   <a class="title" style="width:100%;" href="' +
            place.place_url +
            '" target="_blank" title="' +
            place.place_name +
            '">' +
            place.place_name +
            '</a>'
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
          '<div class="placeinfo" style="padding:5px;font-size:12px;" >' +
            '   <a class="title" style="width:100%;" href="' +
            place.place_url +
            '" target="_blank" title="' +
            place.place_name +
            '">' +
            place.place_name +
            '</a>'
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

      <div
        className={cn('map-wrap')}
        style={{
          width: '97vw',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          id="myMap"
          className={cn('map')}
          style={{
            width: '97vw',
            height: '100vh',
          }}
        ></div>
        <nav className={cn('select-items')}>
          <ul className={cn('options')}>
            <li className={cn('option')} id="toilet">
              <i>
                <img src="/icons/wc_icon.svg" alt="" />
              </i>
              <span>화장실</span>
            </li>
            <li className={cn('option')} id="cafe">
              <i>
                <img src="/icons/restaurant_icon.svg" alt="" />
              </i>
              <span>식당 · 카페</span>
            </li>
            <li className={cn('option')} id="repair">
              <i>
                <img src="/icons/spanner_icon.svg" alt="" />
              </i>
              <span>자전거 수리점</span>
            </li>
            <li className={cn('option')} id="rental">
              <i>
                <img src="/icons/pedal_bike_icon.svg" alt="" />
              </i>
              <span>자전거 대여소</span>
            </li>
          </ul>
        </nav>
      </div>
      {/* <button onClick={handleMapClose}>close</button> */}
    </div>
  );
};

export default MapDetail;
