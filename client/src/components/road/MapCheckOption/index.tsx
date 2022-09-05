import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import styles from './MapCheckOption.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const MapCheckOption = () => {
  const handleChange = () => {
    console.log('checked');
  };
  return (
    <>
      <div className={cn('options')}>
        <div className={cn('option', 'top')}>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: '#e0e0e0',
                  '&.Mui-checked': {
                    color: '#bdbdbd',
                  },
                }}
              />
            }
            label="화장실"
          />
          <i>
            <img src="/icons/wc_icon.svg" alt="" />
          </i>
        </div>
        <div className={cn('option', 'top')}>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: '#e0e0e0',
                  '&.Mui-checked': {
                    color: '#bdbdbd',
                  },
                }}
              />
            }
            label="식당 · 카페"
          />
          <i>
            <img src="/icons/restaurant_icon.svg" alt="" />
          </i>
        </div>
      </div>
      <div className={cn('options')}>
        <div className={cn('option', 'bottom')}>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: '#e0e0e0',
                  '&.Mui-checked': {
                    color: '#bdbdbd',
                  },
                }}
              />
            }
            label="자전거 수리점"
          />
          <i>
            <img src="/icons/spanner_icon.svg" alt="" />
          </i>
        </div>
        <div className={cn('option', 'bottom')}>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: '#e0e0e0',
                  '&.Mui-checked': {
                    color: '#bdbdbd',
                  },
                }}
              />
            }
            label="자전거 대여소"
          />
          <i>
            <img src="/icons/pedal_bike_icon.svg" alt="" />
          </i>
        </div>
      </div>
    </>
  );
};

export default MapCheckOption;
