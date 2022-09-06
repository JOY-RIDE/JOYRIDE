// const BASE_URL = 'http://localhost:3000';
const BASE_URL = `https://apis.data.go.kr/B551011/Durunubi/courseList?MobileOS=ETC&MobileApp=joyride&ServiceKey=${process.env.REACT_APP_TOUR_API_KEY}&brdDiv=DNBW`;

function getTotalCount() {
  return fetch(`${BASE_URL}&_type=json`)
    .then(response => response.json())
    .then(json => json.response.body.totalCount)
    .then(data => console.log(data));
}

export function fetchCourses() {
  return fetch(`${BASE_URL}&numOfRows=114&_type=json`)
    .then(response => response.json())
    .then(json => json.response.body.items.item);
}

export function fetchCourseInfo(courseNm: string | undefined) {
  return fetch(`${BASE_URL}&crsKorNm=${courseNm}&_type=json`)
    .then(response => response.json())
    .then(json => json.response.body.items.item[0]);
  //   return fetch(`${BASE_URL}/course:${id}`).then(response => response.json());
}
