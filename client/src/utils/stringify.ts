export function stringifyCourseLevel(level: number) {
  switch (level) {
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

export function stringifyRidingLevel(level: number) {
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
