import {
  MeetupBicycleType,
  MeetupOrderState,
  MeetupPathDifficulty,
} from 'types/meetup';
import { Age, Gender, Location, Option, RidingSkill } from 'types/common';
import { stringifyRidingSkill } from './stringify';

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
export const RIDING_SKILLS: Option<RidingSkill>[] = [
  { value: 1, content: stringifyRidingSkill(1) },
  { value: 2, content: stringifyRidingSkill(2) },
  { value: 3, content: stringifyRidingSkill(3) },
];

export const MEETUP_PATH_DIFFICULTIES: MeetupPathDifficulty[] = [1, 2, 3];

interface MeetupOrderOption extends MeetupOrderState {
  sign?: string;
}
export const MEETUP_ORDER_OPTIONS: MeetupOrderOption[] = [
  { name: '-createdAt', content: '최근 등록순' },
  { name: 'meetingDate', content: '모임 빠른순' },
  { name: 'pathDifficulty', content: '난이도 낮은순', sign: '△' },
  { name: '-pathDifficulty', content: '난이도 높은순', sign: '▽' },
  { name: 'ridingSkill', content: '실력 낮은순', sign: '△' },
  { name: '-ridingSkill', content: '실력 높은순', sign: '▽' },
  { name: 'maxNumOfParticipants', content: '인원 적은순', sign: '△' },
  { name: '-maxNumOfParticipants', content: '인원 많은순', sign: '▽' },
  { name: 'participationFee', content: '참가비 적은순' },
];
