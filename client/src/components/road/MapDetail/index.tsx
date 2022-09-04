import { useState, useEffect, forwardRef, ReactElement, Ref } from 'react';
import { useRecoilState } from 'recoil';
import styles from './MapDetail.module.scss';
import classNames from 'classnames/bind';
import { isMapOpenedState } from 'states/course';
import { useTheme } from '@emotion/react';
import { Slide, Dialog, useMediaQuery } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { BsArrowsAngleExpand } from 'react-icons/bs';

/* global kako */

declare global {
  interface Window {
    kakao: any;
  }
}

const cn = classNames.bind(styles);

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const MapDetail = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isMapOpened, setIsMapOpened] = useRecoilState(isMapOpenedState);
  const handleMapClose = () => setIsMapOpened(false);
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
      ></div>
      <button onClick={handleMapClose}>close</button>
    </div>
  );
};

export default MapDetail;
