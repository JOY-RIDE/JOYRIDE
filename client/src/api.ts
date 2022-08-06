const BASE_URL = `https://api.visitkorea.or.kr/openapi/service/rest/Durunubi/courseList?MobileOS=ETC&MobileApp=joyride&ServiceKey=${process.env.REACT_APP_TOUR_API_KEY}`;

export function fetchCourses() {
  return fetch(`${BASE_URL}&pageNo=1&numOfRows=3004&_type=json`)
    .then(response => response.json())
    .then(json => json.response.body.items.item);
}

export function fetchCourseInfo(courseNm: string | undefined) {
  return fetch(`${BASE_URL}&crsKorNm=${courseNm}&_type=json`)
    .then(response => response.json())
    .then(json => json.response.body.items.item);
}
