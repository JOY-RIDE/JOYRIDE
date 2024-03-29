import { CourseDifficulty } from 'types/course';
import {
  stringifyMeetupPathDifficulty,
  stringifyGender,
} from 'utils/stringify';
import {
  MeetupGender,
  MeetupOrderState,
  MeetupPathDifficulty,
} from 'types/meetup';
import {
  Age,
  BicycleType,
  Gender,
  Location,
  Option,
  RidingSkill,
} from 'types/common';
import { CourseOrderState } from 'types/course';
import { stringifyRidingSkill } from './stringify';
import { range } from 'lodash';

export const MAIN_COLOR = '#22b573';

export const GENDERS: Gender[] = ['m', 'f'];
// TODO
export const GENDER_OPTIONS: Option<Gender>[] = [
  { value: 'm', content: stringifyGender('m') },
  { value: 'f', content: stringifyGender('f') },
];
export const MEETUP_GENDER_OPTIONS: Option<MeetupGender>[] = [
  { value: 'mixed', content: stringifyGender('mixed') },
  ...GENDER_OPTIONS,
];

export const BIRTH_YEAR_OPTIONS: Option<number>[] = range(
  new Date().getFullYear(),
  1919,
  -1
).map(year => ({ value: year, content: `${year}` }));
export const AGES: Age[] = [1, 2, 3, 4, 5];

export const BICYCLE_TYPES: BicycleType[] = [
  '따릉이',
  'MTB',
  '로드바이크',
  '그래블',
  '하이브리드',
  '미니벨로',
  '기타',
];
export const BICYCLE_TYPE_OPTIONS: Option<BicycleType>[] = [
  { value: '따릉이', content: '따릉이' },
  { value: 'MTB', content: 'MTB' },
  { value: '로드바이크', content: '로드바이크' },
  { value: '그래블', content: '그래블' },
  { value: '하이브리드', content: '하이브리드' },
  { value: '미니벨로', content: '미니벨로' },
  { value: '기타', content: '기타' },
];

export const RIDING_SKILL_OPTIONS: Option<RidingSkill>[] = [
  { value: 1, content: stringifyRidingSkill(1) },
  { value: 2, content: stringifyRidingSkill(2) },
  { value: 3, content: stringifyRidingSkill(3) },
  { value: 4, content: stringifyRidingSkill(4) },
  { value: 5, content: stringifyRidingSkill(5) },
];

export const LOCATIONS: Location[] = [
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '세종',
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

export const MEETUP_PATH_DIFFICULTY_OPTIONS: Option<MeetupPathDifficulty>[] = [
  { value: 1, content: stringifyMeetupPathDifficulty(1) },
  { value: 2, content: stringifyMeetupPathDifficulty(2) },
  { value: 3, content: stringifyMeetupPathDifficulty(3) },
];

export const COURSE_DIFFICULTY: CourseDifficulty[] = [1, 2, 3];

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

interface CourseOrderOption extends CourseOrderState {
  sign?: string;
}
export const COURSE_ORDER_OPTIONS: CourseOrderOption[] = [
  { name: 'crsKorNm', content: '가나다순' },
  { name: 'required_at', content: '짧은 시간순', sign: '△' },
  { name: '-required_at', content: '긴 시간순', sign: '▽' },
  { name: 'crsDstnc', content: '짧은 거리순', sign: '△' },
  { name: '-crsDstnc', content: '긴 거리순', sign: '▽' },
  { name: 'likeCount', content: '좋아요순', sign: '▽' },
  { name: 'totalRate', content: '평점순', sign: '▽' },
];
