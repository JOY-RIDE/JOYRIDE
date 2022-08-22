import { CourseDifficulty } from 'types/course';
import { MeetupPathDifficulty } from 'types/meetup';
import { RidingSkill } from 'types/common';

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

export function stringifyRidingSkill(level: RidingSkill) {
  switch (level) {
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

interface IncludedDateOptions {
  year: boolean;
  month: boolean;
  day: boolean;
}
export function stringifyDate(date: Date, options?: IncludedDateOptions) {
  const arr = [];
  const year = options ? options.year : true;
  const month = options ? options.month : true;
  const day = options ? options.day : true;

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
