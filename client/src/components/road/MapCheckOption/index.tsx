import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import styles from './MapCheckOption.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface checkboxProps {
  setIsToiletChecked: (isChecked: boolean) => void;
  setIsCafeChecked: (isChecked: boolean) => void;
  setIsRepairChecked: (isChecked: boolean) => void;
  setIsRentalChecked: (isChecked: boolean) => void;
}

const MapCheckOption = (props: checkboxProps) => {
  const [isToiletChecked, setIsToiletChecked] = useState(true);
  const [isCafeChecked, setIsCafeChecked] = useState(true);
  const [isRepairChecked, setIsRepairChecked] = useState(true);
  const [isRentalChecked, setIsRentalChecked] = useState(true);

  const handleToiletChange = () => {
    props.setIsToiletChecked(!isToiletChecked);
  };
  const handleCafeChange = () => {
    props.setIsCafeChecked(!isCafeChecked);
  };
  const handleRepairChange = () => {
    props.setIsRepairChecked(!isRepairChecked);
  };
  const handleRentalChange = () => {
    props.setIsRentalChecked(!isRentalChecked);
  };

  return (
    <>
      <div className={cn('options')}>
        <div className={cn('option', 'top')}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleToiletChange}
                value={'toilet'}
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
                onChange={handleCafeChange}
                value={'cafe'}
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
                onChange={handleRepairChange}
                value={'repair'}
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
                onChange={handleRentalChange}
                value={'rental'}
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
