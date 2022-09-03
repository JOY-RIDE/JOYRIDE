import { stringifyDifficulty, stringifyGender } from 'utils/stringify';
import { MeetupGender, MeetupOrderState } from 'types/meetup';
import {
  Age,
  BicycleType,
  Gender,
  Location,
  Option,
  RidingSkill,
} from 'types/common';
import { stringifyRidingSkill } from './stringify';
import { range } from 'lodash';

export const MAIN_COLOR = '#22b573';
export const REGEX = {
  number: /[0-9]+/,
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /[0-9]/,
};

export const GENDERS: Gender[] = ['m', 'f']; // TODO: 삭제
export const GENDER_OPTIONS: Option<Gender>[] = [
  { value: 'm', content: stringifyGender('m') },
  { value: 'f', content: stringifyGender('f') },
];
export const MEETUP_GENDER_OPTIONS: Option<MeetupGender>[] = [
  { value: 'mixed', content: '무관' },
  ...GENDER_OPTIONS,
];
export const BIRTH_YEAR_OPTIONS: Option<number>[] = range(
  new Date().getFullYear(),
  1919,
  -1
).map(year => ({ value: year, content: `${year}` }));
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

export const MEETUP_PATH_DIFFICULTY_OPTIONS: Option<RidingSkill>[] = [
  { value: 1, content: stringifyDifficulty(1) },
  { value: 2, content: stringifyDifficulty(2) },
  { value: 3, content: stringifyDifficulty(3) },
];
export const BICYCLE_TYPE_OPTIONS: Option<BicycleType>[] = [
  { value: '따릉이', content: '따릉이' },
  { value: 'MTB', content: 'MTB' },
  { value: '로드바이크', content: '로드바이크' },
  { value: '하이브리드', content: '하이브리드' },
  { value: '미니벨로', content: '미니벨로' },
  { value: '기타', content: '기타' },
];
export const RIDING_SKILL_OPTIONS: Option<RidingSkill>[] = [
  { value: 1, content: stringifyRidingSkill(1) },
  { value: 2, content: stringifyRidingSkill(2) },
  { value: 3, content: stringifyRidingSkill(3) },
];

interface MeetupOrderOption extends MeetupOrderState {
  sign?: string;
}
export const MEETUP_ORDER_OPTIONS: MeetupOrderOption[] = [
  { name: '-createdAt', content: '최근 등록순' },
  { name: 'meetingDate', content: '모임 빠른순' },
  { name: 'pathDifficulty', content: '코스 난이도 낮은순', sign: '△' },
  { name: '-pathDifficulty', content: '코스 난이도 높은순', sign: '▽' },
  { name: 'ridingSkill', content: '라이딩 실력 낮은순', sign: '△' },
  { name: '-ridingSkill', content: '라이딩 실력 높은순', sign: '▽' },
  { name: 'maxNumOfParticipants', content: '모집 인원 적은순', sign: '△' },
  { name: '-maxNumOfParticipants', content: '모집 인원 많은순', sign: '▽' },
  { name: 'participationFee', content: '참가비 적은순' },
];
