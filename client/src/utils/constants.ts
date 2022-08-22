import { BicycleType } from 'types/common';

export const MAIN_COLOR = '#22b573';

export const REGEX = {
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /[0-9]/,
};

export const BICYCLE_TYPES: BicycleType[] = [
  '따릉이',
  'MTB',
  '로드바이크',
  '하이브리드',
];
