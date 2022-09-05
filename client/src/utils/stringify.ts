import { Age, Gender } from './../types/common';
import { CourseDifficulty } from 'types/course';
import { MeetupPathDifficulty } from 'types/meetup';
import { RidingSkill } from 'types/common';

export function stringifyGender(gender: Gender) {
  switch (gender) {
    case 'm':
      return '남성';
    case 'f':
      return '여성';
    default:
      throw new Error();
  }
}

export function stringifyAge(age: Age) {
  switch (age) {
    case 1:
      return '10대';
    case 2:
      return '20대';
    case 3:
      return '30대';
    case 4:
      return '40대';
    case 5:
      return '50대';
    default:
      throw new Error();
  }
}

export function stringifyCourseDifficulty(difficulty: CourseDifficulty) {
  switch (difficulty) {
    case '1':
      return '하';
    case '2':
      return '중';
    case '3':
      return '상';
    default:
      throw new Error();
  }
}

export function stringifyDifficulty(
  difficulty: CourseDifficulty | MeetupPathDifficulty
) {
  switch (difficulty) {
    case 1:
      return '하';
    case 2:
      return '중';
    case 3:
      return '상';
    default:
      throw new Error();
  }
}

export function stringifyCourseHours(minutes: number) {
  if (minutes < 60) {
    return `${minutes}분`;
  } else if (minutes % 60 == 0) {
    return `${Math.floor(minutes / 60)}시간`;
  } else {
    return `${Math.floor(minutes / 60)}시간 ${minutes % 60}분`;
  }
}

export function stringifyRidingSkill(skill: RidingSkill) {
  switch (skill) {
    case 1:
      return '초급';
    case 2:
      return '중급';
    case 3:
      return '고급';
    default:
      throw new Error();
  }
}

interface IncludeOption {
  year: boolean;
  month: boolean;
  day: boolean;
}
export function stringifyDate(date: Date, option?: IncludeOption) {
  const arr = [];
  const year = option ? option.year : true;
  const month = option ? option.month : true;
  const day = option ? option.day : true;

  if (year) {
    arr.push(`${date.getFullYear()}년`);
  }
  if (month) {
    arr.push(`${date.getMonth() + 1}월`);
  }
  if (day) {
    arr.push(`${date.getDate()}일`);
  }

  return arr.join(' ');
}
