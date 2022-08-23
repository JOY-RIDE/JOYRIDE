import { MeetupBicycleType, MeetupPathDifficulty } from 'types/meetup';
import { Age, Gender, Location, RidingSkill } from 'types/common';

export const MAIN_COLOR = '#22b573';
export const REGEX = {
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /[0-9]/,
};

export const GENDERS: Gender[] = ['m', 'f'];
export const AGES: Age[] = [1, 2, 3, 4, 5];

export const LOCATIONS: Location[] = [
  '서울',
  '인천',
  '경기',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
];
export const BICYCLE_TYPES: MeetupBicycleType[] = [
  '따릉이',
  'MTB',
  '로드바이크',
  '하이브리드',
  '미니벨로',
  '기타',
];
export const RIDING_SKILLS: RidingSkill[] = [1, 2, 3];

export const MEETUP_PATH_DIFFICULTIES: MeetupPathDifficulty[] = [1, 2, 3];
