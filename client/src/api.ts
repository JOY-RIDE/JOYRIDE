const BASE_URL = `https://api.visitkorea.or.kr/openapi/service/rest/Durunubi/courseList?pageNo=1&numOfRows=3004&MobileOS=ETC&MobileApp=joyride`;

export function fetchCourses() {
  return fetch(
    `${BASE_URL}&ServiceKey=${process.env.REACT_APP_TOUR_API_KEY}&_type=json`
  )
    .then(response => response.json())
    .then(json => json.response.body.items.item);
}
